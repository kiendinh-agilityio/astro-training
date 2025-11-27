import { QUERY_MAIN_NAVIGATION, QUERY_SITE_SETTINGS } from '@/queries/site';
import type {
  NavbarItem,
  SanityFaviconAsset,
  SanityMainNavigation,
  SanityMainNavigationItem,
  SanitySiteSettings,
  SiteSettings,
} from '@/types';

import { sanityClient } from './sanityClient';

const DEFAULT_SETTINGS: Pick<SiteSettings, 'title' | 'description' | 'image'> =
  {
    title: 'Blog Template',
    description:
      'A Foodie’s Guide to Europe: Best Culinary Experiences by Country',
    image: '/banner.webp',
  };

const mapFavicon = (favicon?: SanityFaviconAsset | null) =>
  favicon?.url
    ? {
        url: favicon.url,
        type: favicon.mimeType ?? undefined,
      }
    : undefined;

export const fetchSiteSettings = async (): Promise<SiteSettings> => {
  const settings = await sanityClient.fetch<SanitySiteSettings | null>(
    QUERY_SITE_SETTINGS,
  );

  return {
    title: settings?.title ?? DEFAULT_SETTINGS.title,
    description: settings?.description ?? DEFAULT_SETTINGS.description,
    image: settings?.image ?? DEFAULT_SETTINGS.image,
    favicon: mapFavicon(settings?.favicon ?? null),
  };
};

const mapNavigationItem = (
  item: SanityMainNavigationItem,
): NavbarItem | null => {
  if (!item.label || !item.href || !item.ariaLabel) {
    return null;
  }

  return {
    label: item.label,
    href: item.href,
    ariaLabel: item.ariaLabel,
    isExternal: item.isExternal ?? false,
    disabled: item.disabled ?? false,
  };
};

export const fetchMainNavigation = async (): Promise<NavbarItem[]> => {
  const navigation = await sanityClient.fetch<SanityMainNavigation | null>(
    QUERY_MAIN_NAVIGATION,
  );

  const parsedItems =
    navigation?.items?.map(mapNavigationItem).filter(Boolean) ?? [];

  return parsedItems as NavbarItem[];
};
