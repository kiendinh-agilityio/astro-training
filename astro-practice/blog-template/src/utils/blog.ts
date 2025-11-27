import { fetchBlogPostBySlug, fetchBlogPosts } from '@/services/blog';
import type { BlogPost, SupportedLanguage } from '@/types';

import { getActiveSiteLanguage } from './site';

type BlogCache = Partial<Record<SupportedLanguage, BlogPost[]>>;

let blogCache: BlogCache = {};

const resolveLanguage = async (
  language?: SupportedLanguage,
): Promise<SupportedLanguage> => {
  if (language) return language;
  return getActiveSiteLanguage();
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
): Promise<BlogPost[]> => {
  const resolvedLang = await resolveLanguage(language);
  return loadBlogPosts(resolvedLang);
};

export const getBlogPostBySlug = async (
  slug: string,
  language?: SupportedLanguage,
): Promise<BlogPost | null> => {
  if (!slug) return null;

  const resolvedLang = await resolveLanguage(language);
  const posts = await loadBlogPosts(resolvedLang);
  const cached = posts.find((post) => post.slug === slug);
  if (cached) return cached;

  return fetchBlogPostBySlug(slug, resolvedLang);
};

export const invalidateBlogCache = () => {
  blogCache = {};
};
