import { fetchBlogPostBySlug, fetchBlogPosts } from '@/services/blog';
import type { BlogPost, SupportedLanguage } from '@/types';

import { getActiveSiteLanguage } from './site';

type BlogCache = Partial<Record<SupportedLanguage, BlogPost[]>>;

let blogCache: BlogCache = {};

const resolveLanguage = async (
  language?: SupportedLanguage,
  cookies?: { get: (name: string) => { value: string } | undefined },
): Promise<SupportedLanguage> => {
  if (language) return language;
  return getActiveSiteLanguage(cookies);
};

const loadBlogPosts = async (
  language: SupportedLanguage,
): Promise<BlogPost[]> => {
  if (import.meta.env.DEV || !blogCache[language]) {
    blogCache[language] = await fetchBlogPosts(language);
  }

  return blogCache[language] ?? [];
};

export const getCachedBlogPosts = async (
  language?: SupportedLanguage,
  cookies?: { get: (name: string) => { value: string } | undefined },
): Promise<BlogPost[]> => {
  const resolvedLang = await resolveLanguage(language, cookies);
  return loadBlogPosts(resolvedLang);
};

export const getBlogPostBySlug = async (
  slug: string,
  language?: SupportedLanguage,
  cookies?: { get: (name: string) => { value: string } | undefined },
): Promise<BlogPost | null> => {
  if (!slug) return null;

  const resolvedLang = await resolveLanguage(language, cookies);
  const posts = await loadBlogPosts(resolvedLang);
  const cached = posts.find((post) => post.slug === slug);
  if (cached) return cached;

  return fetchBlogPostBySlug(slug, resolvedLang);
};

export const invalidateBlogCache = () => {
  blogCache = {};
};
