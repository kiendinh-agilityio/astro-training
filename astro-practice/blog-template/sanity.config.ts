import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { SANITY_CONFIG, schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: SANITY_CONFIG.NAME,
  title: SANITY_CONFIG.TITLE,
  projectId: SANITY_CONFIG.PROJECT_ID,
  dataset: SANITY_CONFIG.DATASET,
  basePath: SANITY_CONFIG.BASE_PATH,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
