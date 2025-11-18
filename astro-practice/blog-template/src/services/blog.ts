import groq from 'groq';

import type { BlogPost } from '@/types';

import { sanityClient } from './sanityClient';

import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

type SanityBlogSection = {
  country?: string;
  listCountry?: string[];
};

type SanityBlogPost = {
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

const BLOG_POST_FIELDS = groq`{
  _id,
  title,
  'slug': slug.current,
  readTime,
  featured,
  introduction,
  subtitle,
  conclusion,
  'publishedDate': coalesce(publishedAt, _createdAt),
  'mainImage': mainImage,
  'image': thumbnail,
  'author': author->{name, role, avatar},
  'content': content{
    sections[]{
      country,
      listCountry
    }
  }
}`;

const formatDate = (value?: string) => {
  if (!value) return '';

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const mapSections = (sections?: SanityBlogSection[]) =>
  Array.isArray(sections)
    ? sections
        .filter((section) => section?.country)
        .map((section) => ({
          country: section.country ?? '',
          listCountry: section.listCountry?.filter(Boolean) ?? [],
        }))
    : [];

const mapSanityBlogPost = (doc: SanityBlogPost): BlogPost => ({
  id: doc._id,
  slug: doc.slug ?? '',
  title: doc.title ?? 'Untitled',
  readTime: doc.readTime ?? '',
  date: formatDate(doc.publishedDate),
  introduction: doc.introduction ?? '',
  mainImage: doc.mainImage ?? doc.image ?? null,
  subtitle: doc.subtitle ?? '',
  content: {
    type: 'countries',
    sections: mapSections(doc.content?.sections),
  },
  conclusion: doc.conclusion ?? '',
  author: {
    name: doc.author?.name ?? 'Unknown Author',
    avatar: doc.author?.avatar ?? null,
    role: doc.author?.role ?? 'Author',
  },
  image: doc.image ?? doc.mainImage ?? null,
  featured: Boolean(doc.featured),
});

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await sanityClient.fetch<SanityBlogPost[]>(
    groq`*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) ${BLOG_POST_FIELDS}`,
  );

  return posts.map(mapSanityBlogPost);
};

export const fetchBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  if (!slug) return null;

  const post = await sanityClient.fetch<SanityBlogPost | null>(
    groq`*[_type == "blogPost" && slug.current == $slug][0] ${BLOG_POST_FIELDS}`,
    { slug },
  );

  return post ? mapSanityBlogPost(post) : null;
};

export const fetchBlogSlugs = async (): Promise<string[]> => {
  const slugs = await sanityClient.fetch<string[]>(
    groq`*[_type == "blogPost" && defined(slug.current)].slug.current`,
  );

  return slugs.filter(Boolean);
};
