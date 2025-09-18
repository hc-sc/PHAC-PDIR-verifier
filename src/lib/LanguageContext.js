import React, { createContext, useState, useContext } from 'react';
import { languages } from './languages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const t = (key) => languages[currentLanguage][key] || key;

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'fr' : 'en');
  };

  const setLanguage = (language) => {
    if (language === 'en' || language === 'fr') {
      setCurrentLanguage(language);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, t, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 