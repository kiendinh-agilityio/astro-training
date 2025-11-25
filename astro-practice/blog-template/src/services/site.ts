import { QUERY_SITE_SETTINGS } from '@/queries/site';
import type {
  SanityFaviconAsset,
  SanitySiteSettings,
  SiteSettings,
} from '@/types';

import { sanityClient } from './sanityClient';

const DEFAULT_SETTINGS: Pick<SiteSettings, 'title' | 'description'> = {
  title: 'Blog Template',
  description:
    'A Foodie’s Guide to Europe: Best Culinary Experiences by Country',
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
    favicon: mapFavicon(settings?.favicon ?? null),
  };
};
