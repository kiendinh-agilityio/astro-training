import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type SanityBlogSection = {
  country?: string;
  listCountry?: string[];
};

export type SanityBlogPost = {
  _id: string;
  title: string;
  slug?: string;
  readTime?: string;
  featured?: boolean;
  introduction?: string;
  subtitle?: string;
  conclusion?: string;
  publishedDate?: string;
  mainImage?: SanityImageSource;
  image?: SanityImageSource;
  author?: {
    name?: string;
    role?: string;
    avatar?: SanityImageSource;
  };
  content?: {
    sections?: SanityBlogSection[];
  };
};

export type SanityFaviconAsset = {
  url?: string;
  mimeType?: string;
};

export type SanitySiteFavicons = {
  svg?: SanityFaviconAsset;
  ico?: SanityFaviconAsset;
  png192?: SanityFaviconAsset;
  png512?: SanityFaviconAsset;
  appleTouch?: SanityFaviconAsset;
};

export type SanitySiteSettings = {
  title?: string;
  description?: string;
  favicons?: SanitySiteFavicons;
};

export type SiteFaviconAsset = {
  url: string;
  type?: string;
};

export type SiteFaviconSet = {
  svg?: SiteFaviconAsset;
  ico?: SiteFaviconAsset;
  png192?: SiteFaviconAsset;
  png512?: SiteFaviconAsset;
  appleTouch?: SiteFaviconAsset;
};

export type SiteSettings = {
  title: string;
  description: string;
  favicons: SiteFaviconSet;
};
