import {
  QUERY_ALL_POSTS,
  QUERY_ALL_SLUGS,
  QUERY_POST_BY_SLUG,
} from '@/queries/blog';
import type { BlogPost, SanityBlogPost } from '@/types';
import { transformSanityBlogPost } from '@/utils';

import { sanityClient } from './sanityClient';

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await sanityClient.fetch<SanityBlogPost[]>(QUERY_ALL_POSTS);

  return posts.map(transformSanityBlogPost);
};

export const fetchBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  if (!slug) return null;

  const post = await sanityClient.fetch<SanityBlogPost | null>(
    QUERY_POST_BY_SLUG,
    { slug },
  );

  return post ? transformSanityBlogPost(post) : null;
};

export const fetchBlogSlugs = async (): Promise<string[]> => {
  const slugs = await sanityClient.fetch<string[]>(QUERY_ALL_SLUGS);

  return slugs.filter(Boolean);
};
