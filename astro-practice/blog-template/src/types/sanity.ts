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
