import { fetchBlogPostBySlug, fetchBlogPosts } from '@/services/blog';
import type { BlogPost } from '@/types';

let blogCache: BlogPost[] | null = null;

export const getCachedBlogPosts = async (): Promise<BlogPost[]> => {
  if (!blogCache) {
    blogCache = await fetchBlogPosts();
  }

  return blogCache;
};

export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  if (!slug) return null;

  if (blogCache) {
    const cached = blogCache.find((post) => post.slug === slug);
    if (cached) return cached;
  }

  return fetchBlogPostBySlug(slug);
};

export const invalidateBlogCache = () => {
  blogCache = null;
};
