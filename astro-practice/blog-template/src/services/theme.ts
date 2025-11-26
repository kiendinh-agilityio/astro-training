import { QUERY_THEME_SETTINGS } from '@/queries/theme';

import { sanityClient } from './sanityClient';

export type ThemeSettings = {
  globalTheme: 'dark' | 'light' | 'christmas';
};

const DEFAULT_THEME: ThemeSettings = {
  globalTheme: 'dark',
};

export const fetchThemeSettings = async (): Promise<ThemeSettings> => {
  const settings = await sanityClient.fetch<ThemeSettings | null>(
    QUERY_THEME_SETTINGS,
  );

  return {
    globalTheme: settings?.globalTheme ?? DEFAULT_THEME.globalTheme,
  };
};
