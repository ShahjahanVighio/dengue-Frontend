'use client'

import { Bug } from 'lucide-react'

interface AwarenessHubProps {
  language: 'en' | 'ur'
  onStart: () => void
}

export function AwarenessHub({ language, onStart }: AwarenessHubProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Main Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center border border-blue-200">
          <Bug className="w-12 h-12 mx-auto text-[#2980b9] mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {language === 'en' ? 'Dengue Awareness' : 'ڈینگی کی آگاہی'}
          </h2>
          <p className="text-gray-700 text-lg mb-2 leading-relaxed">
            {language === 'en'
              ? 'Dengue is a viral infection transmitted by Aedes mosquitoes.'
              : 'ڈینگی ایک وائرل انفیکشن ہے جو عیدیس مچھروں کے ذریعے منتقل ہوتا ہے۔'}
          </p>
        </div>

        {/* Biology Section */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Biology of Dengue' : 'ڈینگی کی حیاتیات'}
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#2980b9] text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {language === 'en' ? 'Aedes Mosquito' : 'عیدیس مچھر'}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {language === 'en'
                    ? 'Small mosquitoes with white stripes on their legs, active during daytime.'
                    : 'چھوٹے مچھر جن کی ٹانگوں پر سفید پٹیاں ہیں، دن کے وقت فعال رہتے ہیں۔'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#2980b9] text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {language === 'en' ? 'Virus Transmission' : 'وائرس کی منتقلی'}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {language === 'en'
                    ? 'When an infected mosquito bites a person, the dengue virus enters their bloodstream.'
                    : 'جب متاثرہ مچھر کسی شخص کو کاٹتا ہے تو ڈینگی وائرس ان کے خون میں داخل ہوتا ہے۔'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#2980b9] text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {language === 'en' ? 'Symptoms Appear' : 'علامات ظاہر ہوتی ہیں'}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {language === 'en'
                    ? 'Symptoms typically appear 4-7 days after infection. Early detection is crucial.'
                    : 'علامات عام طور پر انفیکشن کے 4-7 دن بعد ظاہر ہوتی ہیں۔ جلد شناخت اہم ہے۔'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
          <p className="text-sm text-amber-800">
            {language === 'en'
              ? '⚠️ This is for informational purposes only. Always consult a healthcare professional for diagnosis and treatment.'
              : '⚠️ یہ صرف معلوماتی مقاصد کے لیے ہے۔ ہمیشہ تشخیص اور علاج کے لیے صحت کے ماہر سے رابطہ کریں۔'}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full bg-[#2980b9] hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md"
        >
          {language === 'en' ? 'Start Assessment' : 'تشخیص شروع کریں'}
        </button>
      </div>
    </div>
  )
}
