'use client'

import { Thermometer, Brain, Zap, Droplet } from 'lucide-react'

interface SymptomCheckerProps {
  language: 'en' | 'ur'
  selectedSymptoms: boolean[]
  onSymptomToggle: (index: number) => void
  onSubmit: () => void
  loading: boolean // <--- Ye add kar diya
}

const symptoms = {
  en: [
    { label: 'High Fever (>39°C)', icon: Thermometer },
    { label: 'Severe Headache', icon: Brain },
    { label: 'Joint/Muscle Pain', icon: Zap },
    { label: 'Bleeding (Gums/Nose)', icon: Droplet },
  ],
  ur: [
    { label: 'تیز بخار (>39°C)', icon: Thermometer },
    { label: 'سر میں شدید درد', icon: Brain },
    { label: 'جوڑوں کا درد', icon: Zap },
    { label: 'خون بہنا', icon: Droplet },
  ],
}

export function SymptomChecker({
  language,
  selectedSymptoms,
  onSymptomToggle,
  onSubmit,
  loading, // <--- Yahan destructure kiya
}: SymptomCheckerProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Check Your Symptoms' : 'اپنی علامات کو چیک کریں'}
          </h2>
          <p className="text-gray-600">
            {language === 'en'
              ? 'Select any symptoms you are currently experiencing.'
              : 'آپ جو علامات محسوس کر رہے ہیں ان کو منتخب کریں۔'}
          </p>
        </div>

        <div className="space-y-3">
          {symptoms[language].map((symptom, index) => {
            const Icon = symptom.icon
            const isSelected = selectedSymptoms[index]

            return (
              <button
                key={index}
                type="button"
                onClick={() => onSymptomToggle(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-[#e74c3c] bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#e74c3c] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-grow">
                  <p className={`font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                    {symptom.label}
                  </p>
                </div>

                <div
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#e74c3c] border-[#e74c3c]'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && <div className="text-white font-bold text-sm">✓</div>}
                </div>
              </button>
            )
          })}
        </div>

        <div className="bg-blue-50 border-l-4 border-[#2980b9] rounded p-4">
          <p className="text-sm text-blue-900">
            {language === 'en'
              ? 'ℹ️ You have selected ' + selectedSymptoms.filter(Boolean).length + ' symptom(s)'
              : 'ℹ️ آپ نے ' + selectedSymptoms.filter(Boolean).length + ' علامت(وں) کو منتخب کیا ہے'}
          </p>
        </div>

        <button
          onClick={onSubmit}
          disabled={selectedSymptoms.filter(Boolean).length === 0 || loading}
          className="w-full bg-[#2980b9] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md"
        >
          {loading 
            ? (language === 'en' ? 'Processing...' : 'پروسیسنگ...') 
            : (language === 'en' ? 'Get Assessment' : 'تشخیص حاصل کریں')}
        </button>
      </div>
    </div>
  )
}