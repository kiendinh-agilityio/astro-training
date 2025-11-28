import { LANGUAGE_COOKIE_NAME } from '@/constants';
import { fetchMainNavigation, fetchSiteSettings } from '@/services/site';
import type { NavbarItem, SiteSettings, SupportedLanguage } from '@/types';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/types';

type SiteSettingsCache = Partial<Record<SupportedLanguage, SiteSettings>>;
let siteSettingsCache: SiteSettingsCache = {};
let navigationCache: NavbarItem[] | null = null;
let defaultLanguageCache: SupportedLanguage | null = null;

export const getCachedSiteSettings = async (
  language?: SupportedLanguage,
): Promise<SiteSettings> => {
  const activeLanguage = language ?? (await getActiveSiteLanguage());

  if (import.meta.env.DEV || !siteSettingsCache[activeLanguage]) {
    siteSettingsCache[activeLanguage] = await fetchSiteSettings(activeLanguage);
  }

  return siteSettingsCache[activeLanguage]!;
};

export const invalidateSiteSettingsCache = () => (siteSettingsCache = {});

export const getCachedMainNavigation = async (): Promise<NavbarItem[]> => {
  if (import.meta.env.DEV || !navigationCache) {
    navigationCache = await fetchMainNavigation();
  }

  return navigationCache;
};

export const invalidateMainNavigationCache = () => (navigationCache = null);

/**
 * Get active language from cookie (if available) or fallback to Site Settings
 * @param cookies - Optional cookies object from Astro context
 */
export const getActiveSiteLanguage = async (cookies?: {
  get: (name: string) => { value: string } | undefined;
}): Promise<SupportedLanguage> => {
  // Try to get language from cookie first (user preference)
  if (cookies) {
    const cookieLang = cookies.get(LANGUAGE_COOKIE_NAME)?.value;
    if (
      cookieLang &&
      SUPPORTED_LANGUAGES.includes(cookieLang as SupportedLanguage)
    ) {
      return cookieLang as SupportedLanguage;
    }
  }

  // Fallback to Site Settings from Sanity (fetch raw, no language param to avoid circular dependency)
  if (import.meta.env.DEV || defaultLanguageCache === null) {
    const settings = await fetchSiteSettings();
    defaultLanguageCache = settings.language;
  }

  return defaultLanguageCache ?? DEFAULT_LANGUAGE;
};
