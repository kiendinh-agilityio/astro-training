import { blogPosts } from '@/mockData/blog';
import type { BlogPost } from '@/types';

// Helper function to get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

// Helper function to get all blog posts
export const getAllBlogPosts = (): BlogPost[] => blogPosts;
