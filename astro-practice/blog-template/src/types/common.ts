import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ImageMetadata } from 'astro';

export const SUPPORTED_LANGUAGES = ['en', 'vi'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export type SupportedImageSource =
  | ImageMetadata
  | SanityImageSource
  | string
  | null
  | undefined;

export interface NavbarItem {
  label: string;
  href: string;
  ariaLabel: string;
  isExternal?: boolean;
  disabled?: boolean;
}

export interface SocialItem {
  href: string;
  ariaLabel: string;
  icon: SocialIconKey;
}

export type SocialIconKey =
  | 'Instagram'
  | 'Twitter'
  | 'Linkedin'
  | 'Facebook'
  | 'Youtube';

export interface BlogAuthor {
  name: string;
  avatar?: SupportedImageSource;
  role?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image?: SupportedImageSource;
  author: BlogAuthor;
  date: string;
  readTime?: string;
  introduction?: string;
  mainImage?: SupportedImageSource;
  subtitle?: string;
  content: {
    type: 'countries';
    sections: Array<{
      country: string;
      listCountry: string[];
    }>;
  };
  conclusion?: string;
  featured?: boolean;
  theme?: string | null;
}

export type BlogContent = BlogPost['content']['sections'][number];

export type SiteSettings = {
  title: string;
  description: string;
  image?: string;
  favicon?: {
    url: string;
    type?: string;
  };
  language: SupportedLanguage;
};

export type BlogSectionSettings = {
  trendingPostTitle?: string;
  trendingPostDescription?: string;
};
