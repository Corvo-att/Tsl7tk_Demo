import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';

const savedLang = (typeof window !== 'undefined' && localStorage.getItem('tsl7tk_lang')) || 'en';

export function applyDocumentDirection(lang: string) {
  if (typeof document !== 'undefined') {
    const clean = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = clean;
    document.documentElement.dir = clean === 'ar' ? 'rtl' : 'ltr';
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

applyDocumentDirection(savedLang);

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tsl7tk_lang', lng);
  }
  applyDocumentDirection(lng);
});

export default i18n;

