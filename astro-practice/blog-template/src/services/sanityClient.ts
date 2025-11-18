import { createClient } from '@sanity/client';

const projectId =
  import.meta.env.SANITY_PROJECT_ID || import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  import.meta.env.SANITY_DATASET || import.meta.env.PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity configuration. Please set SANITY_PROJECT_ID and SANITY_DATASET.',
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: import.meta.env.SANITY_API_VERSION || '2025-01-01',
  token: import.meta.env.SANITY_READ_TOKEN,
  useCdn: import.meta.env.PROD,
  perspective: 'published',
});
