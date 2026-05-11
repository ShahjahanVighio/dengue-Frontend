'use client'

import { Globe } from 'lucide-react'

interface HeaderProps {
  language: 'en' | 'ur'
  onLanguageToggle: () => void
}

export function Header({ language, onLanguageToggle }: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2980b9] rounded-full flex items-center justify-center text-white font-bold">
            D
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {language === 'en' ? 'DengueAlert' : 'ڈینگی الرٹ'}
            </h1>
            <p className="text-xs text-gray-600">
              {language === 'en' ? 'Pakistan' : 'پاکستان'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onLanguageToggle}
          aria-label="Toggle language"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Globe className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">
            {language === 'en' ? 'اردو' : 'EN'}
          </span>
        </button>
      </div>
    </header>
  )
}
