'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/DengueAlert/Header'
import { ProgressBar } from '@/components/DengueAlert/ProgressBar'
import { AwarenessHub } from '@/components/DengueAlert/AwarenessHub'
import { SymptomChecker } from '@/components/DengueAlert/SymptomChecker'
import { PredictionResult } from '@/components/DengueAlert/PredictionResult'
import { Prevention } from '@/components/DengueAlert/Prevention'

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'ur'>('en')
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSymptoms, setSelectedSymptoms] = useState<boolean[]>([false, false, false, false])
  const [loading, setLoading] = useState(false)
  
  // New state to store actual AI result
  const [prediction, setPrediction] = useState<number | null>(null)

  // Set document direction based on language
  useEffect(() => {
    const htmlElement = document.documentElement
    if (language === 'ur') {
      htmlElement.setAttribute('dir', 'rtl')
      htmlElement.classList.add('rtl')
    } else {
      htmlElement.setAttribute('dir', 'ltr')
      htmlElement.classList.remove('rtl')
    }
  }, [language])

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'ur' : 'en')
  }

  const handleStartAssessment = () => {
    setCurrentStep(2)
  }

  const handleSymptomToggle = (index: number) => {
    const newSymptoms = [...selectedSymptoms]
    newSymptoms[index] = !newSymptoms[index]
    setSelectedSymptoms(newSymptoms)
  }

  // --- CONNECTED TO RAILWAY BACKEND ---
  const handleGetAssessment = async () => {
    setLoading(true)
    
    // Mapping symptoms to match Python model: [Fever, Headache, JointPain, Bleeding]
    const symptomData = {
      fever: selectedSymptoms[0] ? 1 : 0,
      headache: selectedSymptoms[1] ? 1 : 0,
      joint_pain: selectedSymptoms[2] ? 1 : 0,
      bleeding: selectedSymptoms[3] ? 1 : 0
    }

    try {
      // APKA NAYA RAILWAY LINK YAHAN HAI
      const response = await fetch('https://dengue-backend-production.up.railway.app/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(symptomData),
      })

      if (!response.ok) throw new Error('Backend not responding')
      
      const data = await response.json()
      setPrediction(data.dengue) // 1 for Dengue, 0 for Safe
      setCurrentStep(3)
    } catch (error) {
      console.error("Connection Error:", error)
      alert("Error: Connection to AI model failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleContinueToPreventions = () => {
    setCurrentStep(4)
  }

  const handleRestartAssessment = () => {
    setCurrentStep(1)
    setSelectedSymptoms([false, false, false, false])
    setPrediction(null)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageToggle={handleLanguageToggle} />
      <ProgressBar currentStep={currentStep} totalSteps={4} language={language} />

      <main>
        {currentStep === 1 && (
          <AwarenessHub language={language} onStart={handleStartAssessment} />
        )}

        {currentStep === 2 && (
          <SymptomChecker
            language={language}
            selectedSymptoms={selectedSymptoms}
            onSymptomToggle={handleSymptomToggle}
            onSubmit={handleGetAssessment}
            loading={loading} 
          />
        )}

        {currentStep === 3 && (
          <PredictionResult
            language={language}
            isDengue={prediction === 1} 
            loading={loading}
            onNext={handleContinueToPreventions}
            onRestart={handleRestartAssessment}
          />
        )}

        {currentStep === 4 && (
          <Prevention language={language} onRestart={handleRestartAssessment} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="max-w-2xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            {language === 'en'
              ? 'DengueAlert PK © 2026 - A public health awareness initiative'
              : 'ڈینگی الرٹ پی کے © 2026 - عوامی صحت کی آگاہی کی پہل'}
          </p>
        </div>
      </footer>
    </div>
  )
}