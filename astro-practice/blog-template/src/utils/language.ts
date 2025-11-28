import { COOKIE_MAX_AGE, LANGUAGE_COOKIE_NAME } from '@/constants';
import type { SupportedLanguage } from '@/types';

export const setLanguageCookie = (lang: SupportedLanguage) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${LANGUAGE_COOKIE_NAME}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};
