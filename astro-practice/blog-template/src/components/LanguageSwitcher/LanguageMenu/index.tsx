import { FlagIcon, Icons } from '@/components';
import { LANGUAGE_OPTIONS } from '@/constants';
import type { SupportedLanguage } from '@/types';

interface LanguageMenuProps {
  currentLang: SupportedLanguage;
  isChanging: boolean;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

const LanguageMenu = ({
  currentLang,
  isChanging,
  onSelectLanguage,
}: LanguageMenuProps) => {
  return (
    <div className="absolute top-full right-0 z-50 mt-1 min-w-[180px] rounded-lg border border-gray-200 bg-white shadow-lg">
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = option.code === currentLang;

        const handleClick = () => onSelectLanguage(option.code);

        return (
          <button
            key={option.code}
            type="button"
            onClick={handleClick}
            disabled={isChanging}
            aria-label={`Switch to ${option.name}`}
            className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors ${isChanging ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${isActive ? 'bg-gray-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'} first:rounded-t-lg last:rounded-b-lg`}
          >
            <div className="flex items-center gap-3">
              <FlagIcon code={option.code} />
              <span className={isActive ? 'font-medium' : ''}>
                {option.name}
              </span>
            </div>

            {isActive && <Icons.Checkmark className="h-4 w-4 text-red-600" />}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageMenu;
