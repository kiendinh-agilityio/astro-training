import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-01-01';
const token = import.meta.env.PUBLIC_SANITY_READ_TOKEN;

if (!projectId || !dataset) {
  throw new Error('Missing Sanity configuration for client. Check .env.');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  // Disable CDN to get fresh data immediately after publish
  // In-memory cache in utils/blog.ts will still provide performance benefits
  useCdn: false,
  perspective: 'published',
});
