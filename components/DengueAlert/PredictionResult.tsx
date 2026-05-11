'use client'

import { AlertTriangle, CheckCircle, Heart, Droplets, Stethoscope } from 'lucide-react'

interface PredictionResultProps {
  language: 'en' | 'ur'
  isDengue: boolean // اب یہ AI ماڈل کا رزلٹ لے گا
  loading: boolean
  onNext: () => void
  onRestart: () => void
}

export function PredictionResult({
  language,
  isDengue,
  loading,
  onNext,
  onRestart,
}: PredictionResultProps) {
  
  // لاجک اب AI ماڈل کے رزلٹ پر مبنی ہے
  const isHighAlert = isDengue 
  const isLoading = loading

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-96">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#2980b9] rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-gray-700 font-medium">
          {language === 'en' ? 'Analyzing symptoms...' : 'علامات کا تجزیہ جاری ہے...'}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Result Card */}
        <div
          className={`rounded-lg p-8 text-center border-2 ${
            isHighAlert
              ? 'bg-red-50 border-[#e74c3c]'
              : 'bg-green-50 border-[#27ae60]'
          }`}
        >
          {isHighAlert ? (
            <AlertTriangle className="w-16 h-16 text-[#e74c3c] mx-auto mb-4" />
          ) : (
            <CheckCircle className="w-16 h-16 text-[#27ae60] mx-auto mb-4" />
          )}

          <h2 className="text-3xl font-bold mb-2">
            {isHighAlert
              ? language === 'en'
                ? 'High Risk Detected'
                : 'زیادہ خطرہ پایا گیا'
              : language === 'en'
              ? 'Safe'
              : 'محفوظ'}
          </h2>

          <p className={`text-base leading-relaxed ${isHighAlert ? 'text-gray-700' : 'text-gray-700'}`}>
            {isHighAlert
              ? language === 'en'
                ? 'Based on AI analysis of your biological symptoms, there is a significant risk of Dengue. Please consult a doctor.'
                : 'آپ کی علامات کے AI تجزیے کی بنیاد پر، ڈینگی کا نمایاں خطرہ ہے۔ براہ کرم ڈاکٹر سے رجوع کریں۔'
              : language === 'en'
              ? 'Your symptoms do not match the clinical criteria for a high dengue risk.'
              : 'آپ کی علامات ڈینگی کے زیادہ خطرے کے طبی معیار پر پوری نہیں اترتیں۔'}
          </p>
        </div>

        {/* Recommendations - Only show if AI says High Risk */}
        {isHighAlert && (
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Recommended Actions' : 'تجویز کردہ اقدامات'}
            </h3>
            <div className="space-y-3">
               <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                 <Heart className="w-5 h-5 text-[#2980b9] flex-shrink-0 mt-0.5" />
                 <div>
                   <p className="font-semibold text-gray-900">{language === 'en' ? 'Stay Hydrated' : 'پانی کا زیادہ استعمال'}</p>
                   <p className="text-sm text-gray-700">{language === 'en' ? 'Drink plenty of fluids.' : 'بہت سارا مائع پیئیں۔'}</p>
                 </div>
               </div>
               {/* باقی ریکمنڈیشنز بھی اسی طرح رہیں گی */}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
          <p className="text-sm text-amber-800 font-medium text-center">
            {language === 'en'
              ? '⚠️ This is an AI-assisted screening, not a definitive medical diagnosis.'
              : '⚠️ یہ ایک AI کی مدد سے کی گئی اسکریننگ ہے، حتمی طبی تشخیص نہیں ہے۔'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button onClick={onNext} className="flex-grow bg-[#2980b9] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all">
            {language === 'en' ? 'Prevention Tips' : 'بچاؤ کی تدابیر'}
          </button>
          <button onClick={onRestart} className="flex-grow bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all">
            {language === 'en' ? 'Restart' : 'دوبارہ شروع کریں'}
          </button>
        </div>
      </div>
    </div>
  )
}