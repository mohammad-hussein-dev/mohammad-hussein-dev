import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationDictionary } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  languageTransitionFlash: boolean;
  t: TranslationDictionary;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_portfolio_lang') as Language;
      if (saved === 'en' || saved === 'fa') return saved;
      // Default to Persian if browser language is fa or persian
      const browserLang = navigator.language || '';
      if (browserLang.toLowerCase().includes('fa')) return 'fa';
    }
    return 'en';
  });

  const [languageTransitionFlash, setLanguageTransitionFlash] = useState(false);

  const triggerLanguageSwitch = (newLang: Language) => {
    setLanguageTransitionFlash(true);
    setTimeout(() => setLanguageTransitionFlash(false), 900);

    const applyChange = () => {
      setLanguageState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mh_portfolio_lang', newLang);
      }
    };

    if ('startViewTransition' in document && typeof (document as any).startViewTransition === 'function') {
      (document as any).startViewTransition(() => {
        applyChange();
      });
    } else {
      applyChange();
    }
  };

  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      triggerLanguageSwitch(lang);
    }
  };

  const toggleLanguage = () => {
    triggerLanguageSwitch(language === 'en' ? 'fa' : 'en');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
      if (language === 'fa') {
        document.documentElement.classList.add('font-persian');
      } else {
        document.documentElement.classList.remove('font-persian');
      }
    }
  }, [language]);

  const isRtl = language === 'fa';
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, languageTransitionFlash, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

