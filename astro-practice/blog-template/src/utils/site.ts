import { fetchMainNavigation, fetchSiteSettings } from '@/services/site';
import type { NavbarItem, SiteSettings } from '@/types';

let siteSettingsCache: SiteSettings | null = null;
let navigationCache: NavbarItem[] | null = null;

export const getCachedSiteSettings = async (): Promise<SiteSettings> => {
  if (import.meta.env.DEV || !siteSettingsCache) {
    siteSettingsCache = await fetchSiteSettings();
  }

  return siteSettingsCache;
};

export const invalidateSiteSettingsCache = () => (siteSettingsCache = null);

export const getCachedMainNavigation = async (): Promise<NavbarItem[]> => {
  if (import.meta.env.DEV || !navigationCache) {
    navigationCache = await fetchMainNavigation();
  }

  return navigationCache;
};

export const invalidateMainNavigationCache = () => (navigationCache = null);
