import { fetchBlogPostBySlug, fetchBlogPosts } from '@/services/blog';
import type { BlogPost } from '@/types';

let blogCache: BlogPost[] | null = null;

const loadBlogPosts = async (): Promise<BlogPost[]> => {
  if (import.meta.env.DEV || !blogCache) {
    blogCache = await fetchBlogPosts();
  }

  return blogCache;
};

export const getCachedBlogPosts = async (): Promise<BlogPost[]> =>
  loadBlogPosts();

export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  if (!slug) return null;

  const posts = await loadBlogPosts();
  const cached = posts.find((post) => post.slug === slug);
  if (cached) return cached;

  return fetchBlogPostBySlug(slug);
};

export const invalidateBlogCache = () => {
  blogCache = null;
};
