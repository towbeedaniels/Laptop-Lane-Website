import { create } from 'zustand';
import type { Language } from '@/i18n/translations';
import { translations } from '@/i18n/translations';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en',
  setLanguage: (lang: Language) => set({ language: lang, t: translations[lang] }),
  t: translations.en,
}));
