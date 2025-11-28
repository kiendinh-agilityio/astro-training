import { fetchBlogSectionSettings } from '@/services/blogSection';
import type { BlogSectionSettings, SupportedLanguage } from '@/types';

type BlogSectionCache = Partial<Record<SupportedLanguage, BlogSectionSettings>>;

let blogSectionCache: BlogSectionCache = {};

export const getCachedBlogSectionSettings = async (
  language: SupportedLanguage,
): Promise<BlogSectionSettings> => {
  if (import.meta.env.DEV || !blogSectionCache[language]) {
    blogSectionCache[language] = await fetchBlogSectionSettings(language);
  }

  return blogSectionCache[language] ?? {};
};

export const invalidateBlogSectionCache = () => {
  blogSectionCache = {};
};
