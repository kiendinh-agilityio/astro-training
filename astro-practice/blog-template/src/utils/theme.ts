import { fetchThemeSettings } from '@/services/theme';

export type Theme = 'dark' | 'light' | 'christmas';

export const DEFAULT_THEME: Theme = 'dark';

let themeSettingsCache: { globalTheme: Theme } | null = null;

export const getCachedThemeSettings = async (): Promise<{
  globalTheme: Theme;
}> => {
  if (import.meta.env.DEV || !themeSettingsCache) {
    const settings = await fetchThemeSettings();
    themeSettingsCache = { globalTheme: settings.globalTheme };
  }

  return themeSettingsCache;
};

export const invalidateThemeSettingsCache = () => (themeSettingsCache = null);

/**
 * Determine final theme: page theme overrides global theme
 * @param globalTheme - Theme from Sanity Theme Settings
 * @param pageTheme - Theme from blog post (can be empty string for global use)
 */
export function getFinalTheme(
  globalTheme: Theme,
  pageTheme?: string | null,
): Theme {
  // If page has a specific theme (not empty), use it
  if (pageTheme && pageTheme.trim() !== '') {
    if (['dark', 'light', 'christmas'].includes(pageTheme)) {
      return pageTheme as Theme;
    }
  }
  // Otherwise use global theme
  return globalTheme;
}
