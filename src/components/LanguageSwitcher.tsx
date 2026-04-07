'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { languageNames, translations } from '@/i18n/translations';
import type { Language } from '@/i18n/translations';
import { Globe, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
  }, [setLanguage]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setIsOpen(false);
  };

  const flags: Record<Language, string> = {
    en: '🇬🇧',
    fr: '🇫🇷',
    de: '🇩🇪',
    es: '🇪🇸',
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        aria-label="Change language"
      >
        <Globe className="h-5 w-5" />
        <span className="text-sm font-medium hidden sm:inline">{flags[language]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {(Object.keys(languageNames) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                language === lang
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{flags[lang]}</span>
                <span>{languageNames[lang]}</span>
              </span>
              {language === lang && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
