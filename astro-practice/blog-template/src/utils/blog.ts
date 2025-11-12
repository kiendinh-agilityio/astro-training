import { blogPosts } from '@/mockData/blog';
import type { BlogPost } from '@/types';

const findPostsSource = (posts?: BlogPost[]) =>
  Array.isArray(posts) && posts.length ? posts : blogPosts;

// Helper function to get blog post by slug
export const getBlogPostBySlug = (
  slug: string,
  posts?: BlogPost[],
): BlogPost | undefined =>
  findPostsSource(posts).find((post) => post.slug === slug);

// Helper function to get all blog posts
export const getAllBlogPosts = (posts?: BlogPost[]): BlogPost[] =>
  findPostsSource(posts);
