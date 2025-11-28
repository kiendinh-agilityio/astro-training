import { useEffect, useRef, useState } from 'react';

import { FlagIcon, Icons } from '@/components';
import { LANGUAGE_OPTIONS } from '@/constants';
import { useClickOutside } from '@/hooks';
import type { SupportedLanguage } from '@/types';
import { DEFAULT_LANGUAGE } from '@/types';
import { setLanguageCookie } from '@/utils';

import LanguageMenu from './LanguageMenu';

interface LanguageSwitcherProps {
  currentLanguage?: SupportedLanguage;
}

const LanguageSwitcher = ({ currentLanguage }: LanguageSwitcherProps) => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(
    currentLanguage || DEFAULT_LANGUAGE,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Sync language from server */
  useEffect(() => {
    if (currentLanguage && currentLanguage !== currentLang) {
      setCurrentLang(currentLanguage);
    }
  }, [currentLanguage, currentLang]);

  /* Close dropdown when clicking outside */
  useClickOutside(dropdownRef, () => setIsOpen(false));

  /* Toggle dropdown */
  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  /* Handle change language */
  const handleLanguageChange = async (newLang: SupportedLanguage) => {
    if (newLang === currentLang || isChanging) return;
    setIsChanging(true);

    setLanguageCookie(newLang);
    setCurrentLang(newLang);
    setIsOpen(false);

    setTimeout(() => globalThis.location.reload(), 100);
  };

  const currentOption = LANGUAGE_OPTIONS.find((o) => o.code === currentLang)!;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <button
        type="button"
        disabled={isChanging}
        onClick={handleToggleDropdown}
        aria-label={`Select language - Current: ${currentOption.name}`}
        aria-expanded={isOpen}
        className={`flex items-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition-all ${isChanging ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${isOpen ? 'border-red-600 bg-white' : 'border-gray-300 bg-white hover:border-gray-400'} `}
      >
        <FlagIcon code={currentOption.code} />
        <Icons.ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <LanguageMenu
          currentLang={currentLang}
          isChanging={isChanging}
          onSelectLanguage={handleLanguageChange}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;
