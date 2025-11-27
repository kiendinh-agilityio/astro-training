import type { SupportedLanguage } from './common';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type LocalizedField<T = string> = Partial<
  Record<SupportedLanguage, T | null | undefined>
>;

export type SanityBlogSection = {
  country?: LocalizedField<string>;
  listCountry?: LocalizedField<string>[];
};

export type SanityBlogPost = {
  _id: string;
  title?: LocalizedField<string>;
  slug?: string;
  readTime?: LocalizedField<string>;
  featured?: boolean;
  introduction?: LocalizedField<string>;
  subtitle?: LocalizedField<string>;
  conclusion?: LocalizedField<string>;
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
  theme?: string | null;
};

export type SanityFaviconAsset = {
  url?: string;
  mimeType?: string;
};

export type SanitySiteSettings = {
  title?: string;
  description?: string;
  image?: string | null;
  favicon?: SanityFaviconAsset;
  language?: SupportedLanguage;
};

export type SanityMainNavigationItem = {
  label?: string;
  href?: string;
  ariaLabel?: string;
  isExternal?: boolean;
  disabled?: boolean;
};

export type SanityMainNavigation = {
  items?: SanityMainNavigationItem[];
};

export type SiteFaviconAsset = {
  url: string;
  type?: string;
};

export type SiteSettings = {
  title: string;
  description: string;
  image?: string;
  favicon?: SiteFaviconAsset;
  language: SupportedLanguage;
};
