import { defineCliConfig } from 'sanity/cli';

const getEnvValue = (...keys: string[]) => {
  const importEnv =
    typeof import.meta !== 'undefined'
      ? ((import.meta as Record<string, any>).env ?? {})
      : {};
  const processEnv =
    typeof process !== 'undefined'
      ? ((process.env as Record<string, string | undefined>) ?? {})
      : {};

  for (const key of keys) {
    if (importEnv[key]) return importEnv[key];
    if (processEnv[key]) return processEnv[key];
  }

  return undefined;
};

export default defineCliConfig({
  api: {
    projectId:
      getEnvValue(
        'SANITY_STUDIO_PROJECT_ID',
        'SANITY_PROJECT_ID',
        'PUBLIC_SANITY_PROJECT_ID',
      ) ?? 'yourProjectId',
    dataset:
      getEnvValue(
        'SANITY_STUDIO_DATASET',
        'SANITY_DATASET',
        'PUBLIC_SANITY_DATASET',
      ) ?? 'production',
  },
});
