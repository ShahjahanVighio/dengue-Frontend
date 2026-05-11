'use client'

import { Droplet, Shield, Shirt, Trash2 } from 'lucide-react'

interface PreventionProps {
  language: 'en' | 'ur'
  onRestart: () => void
}

const preventionTips = {
  en: [
    {
      title: 'Remove Standing Water',
      description: 'Eliminate stagnant water in flower pots, buckets, and tires where mosquitoes breed.',
      icon: Droplet,
    },
    {
      title: 'Use Mosquito Repellent',
      description: 'Apply approved repellents with DEET or picaridin on exposed skin.',
      icon: Shield,
    },
    {
      title: 'Wear Protective Clothing',
      description: 'Wear full-sleeved shirts and long pants, especially during dawn and dusk.',
      icon: Shirt,
    },
    {
      title: 'Keep Surroundings Clean',
      description: 'Regular cleaning and waste management reduce mosquito breeding sites.',
      icon: Trash2,
    },
  ],
  ur: [
    {
      title: 'کھڑے پانی کو ہٹائیں',
      description: 'پھول کے برتن، بالٹی اور ٹائروں میں جمع شدہ پانی کو ہٹائیں جہاں مچھر پنپتے ہیں۔',
      icon: Droplet,
    },
    {
      title: 'مچھر کو دور کرنے والی دوا استعمال کریں',
      description: 'منظور شدہ کریم استعمال کریں جو DEET یا picaridin والی ہوں۔',
      icon: Shield,
    },
    {
      title: 'حفاظتی لباس پہنیں',
      description: 'خاص طور پر صبح اور شام کے وقت لمبی آستین والی قمیض اور لمبی پتلون پہنیں۔',
      icon: Shirt,
    },
    {
      title: 'اردگرد کو صاف رکھیں',
      description: 'مچھروں کی نسل بڑھانے والی جگہوں کو کم کرنے کے لیے باقاعدہ صفائی کریں۔',
      icon: Trash2,
    },
  ],
}

export function Prevention({ language, onRestart }: PreventionProps) {
  const tips = preventionTips[language]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Prevention Measures' : 'احتیاط کے نکات'}
          </h2>
          <p className="text-gray-600">
            {language === 'en'
              ? 'Bachao ki Tadabeer - Follow these steps to protect yourself and your community.'
              : 'بچاؤ کی تدابیر - اپنے آپ کو اور اپنی کمیونٹی کو محفوظ رکھنے کے لیے یہ اقدامات کریں۔'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#2980b9]" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Tips Section */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Community Responsibility' : 'معاشرتی ذمہ داری'}
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex gap-2">
              <span className="text-[#2980b9] font-bold">•</span>
              <span>
                {language === 'en'
                  ? 'Report cases to local health authorities'
                  : 'معاملات کو مقامی صحت کے اختیارات کو رپورٹ کریں'}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#2980b9] font-bold">•</span>
              <span>
                {language === 'en'
                  ? 'Participate in community health awareness programs'
                  : 'کمیونٹی کے صحت کی آگاہی کے پروگراموں میں حصہ لیں'}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#2980b9] font-bold">•</span>
              <span>
                {language === 'en'
                  ? 'Support mosquito control initiatives in your area'
                  : 'اپنے علاقے میں مچھروں کے کنٹرول کی کوششوں میں مدد دیں'}
              </span>
            </li>
          </ul>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border-2 border-[#e74c3c] rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {language === 'en' ? 'Emergency Support' : 'فوری معاونت'}
          </h3>
          <p className="text-gray-700 mb-3">
            {language === 'en'
              ? 'If symptoms worsen, contact a healthcare provider immediately or visit the nearest hospital.'
              : 'اگر علامات بدتر ہو جائیں تو فوری طور پر صحت کے فراہم کنندہ سے رابطہ کریں یا نزدیک ترین ہسپتال جائیں۔'}
          </p>
          <div className="bg-white rounded p-3 border border-red-200">
            <p className="text-sm font-semibold text-gray-900">
              {language === 'en' ? 'Pakistan: Call 1166 (Dengue Helpline)' : 'پاکستان: 1166 کو کال کریں (ڈینگی ہیلپ لائن)'}
            </p>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
          <p className="text-sm text-amber-800">
            {language === 'en'
              ? '⚠️ This information is for prevention purposes. Always follow advice from healthcare professionals.'
              : '⚠️ یہ معلومات احتیاط کے مقاصد کے لیے ہے۔ ہمیشہ صحت کے ماہرین کی مشورے کی پیروی کریں۔'}
          </p>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="w-full bg-[#2980b9] hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md"
        >
          {language === 'en' ? 'Start New Assessment' : 'نئی تشخیص شروع کریں'}
        </button>
      </div>
    </div>
  )
}
