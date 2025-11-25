import { fetchSiteSettings } from '@/services/site';
import type { SiteSettings } from '@/types';

let siteSettingsCache: SiteSettings | null = null;

export const getCachedSiteSettings = async (): Promise<SiteSettings> => {
  if (import.meta.env.DEV || !siteSettingsCache) {
    siteSettingsCache = await fetchSiteSettings();
  }

  return siteSettingsCache;
};

export const invalidateSiteSettingsCache = () => (siteSettingsCache = null);
