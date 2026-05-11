'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  language: 'en' | 'ur'
}

const stepLabels = {
  en: ['Awareness', 'Symptoms', 'Results', 'Prevention'],
  ur: ['آگاہی', 'علامات', 'نتائج', 'احتیاط']
}

export function ProgressBar({ currentStep, totalSteps, language }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100

  return (
    <div className="w-full bg-white px-4 py-6 border-b border-gray-100">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            {language === 'en' 
              ? `Step ${currentStep} of ${totalSteps}` 
              : `مرحلہ ${currentStep} سے ${totalSteps}`}
          </span>
          <span className="text-sm font-medium text-[#2980b9]">
            {stepLabels[language][currentStep - 1]}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#2980b9] h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
