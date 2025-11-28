import { QUERY_MAIN_NAVIGATION, QUERY_SITE_SETTINGS } from '@/queries/site';
import {
  DEFAULT_LANGUAGE,
  type LocalizedField,
  type NavbarItem,
  SUPPORTED_LANGUAGES,
  type SanityFaviconAsset,
  type SanityMainNavigation,
  type SanityMainNavigationItem,
  type SanitySiteSettings,
  type SiteSettings,
  type SupportedLanguage,
} from '@/types';

import { sanityClient } from './sanityClient';

const DEFAULT_SETTINGS: Pick<
  SiteSettings,
  'title' | 'description' | 'image' | 'language'
> = {
  title: 'Blog Template',
  description:
    'A Foodie’s Guide to Europe: Best Culinary Experiences by Country',
  image: '/banner.webp',
  language: DEFAULT_LANGUAGE,
};

const mapFavicon = (favicon?: SanityFaviconAsset | null) =>
  favicon?.url
    ? {
        url: favicon.url,
        type: favicon.mimeType ?? undefined,
      }
    : undefined;

const resolveLocalizedString = (
  field: LocalizedField<string> | undefined,
  language: SupportedLanguage,
): string | undefined => {
  const localeOrder = [
    language,
    ...SUPPORTED_LANGUAGES.filter((locale) => locale !== language),
  ];

  for (const locale of localeOrder) {
    const value = field?.[locale];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
};

export const fetchSiteSettings = async (
  language?: SupportedLanguage,
): Promise<SiteSettings> => {
  const settings = await sanityClient.fetch<SanitySiteSettings | null>(
    QUERY_SITE_SETTINGS,
  );

  const activeLanguage = language ?? settings?.language ?? DEFAULT_LANGUAGE;

  return {
    title: settings?.title ?? DEFAULT_SETTINGS.title,
    description: settings?.description ?? DEFAULT_SETTINGS.description,
    image: settings?.image ?? DEFAULT_SETTINGS.image,
    favicon: mapFavicon(settings?.favicon ?? null),
    language: settings?.language ?? DEFAULT_SETTINGS.language,
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
