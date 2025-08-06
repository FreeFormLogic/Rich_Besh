import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Languages } from 'lucide-react';

const LanguageSwitcher = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Languages className="w-5 h-5 text-gray-400" />
      <div className="flex bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setLanguage('ru')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'ru'
              ? 'bg-yellow-400 text-black'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          РУ
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-yellow-400 text-black'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;