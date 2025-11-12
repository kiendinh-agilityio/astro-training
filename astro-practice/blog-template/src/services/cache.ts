import type { BlogPost } from '@/types';
import { getAllBlogPosts } from '@/utils';

export type CachedData = {
  blogPosts: BlogPost[];
};

const cacheStore = new Map<string, CachedData>();

export const getInitialCachedData = (): CachedData => ({
  blogPosts: getAllBlogPosts(),
});

export const setCacheForToken = (token: string, data: CachedData) => {
  cacheStore.set(token, data);
};

export const getCacheForToken = (token: string) => cacheStore.get(token);

export const deleteCacheForToken = (token: string) => {
  cacheStore.delete(token);
};
