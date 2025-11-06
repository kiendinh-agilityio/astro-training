import type { ImageMetadata } from 'astro';

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
  avatar: ImageMetadata;
  role: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: ImageMetadata;
  author: BlogAuthor;
  date: string;
  readTime: string;
  introduction: string;
  mainImage: ImageMetadata;
  subtitle?: string;
  content: {
    type: 'countries';
    sections: Array<{
      country: string;
      listCountry: string[];
    }>;
  };
  conclusion: string;
}

export type BlogContent = BlogPost['content']['sections'][number];
