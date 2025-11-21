/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_API_VERSION: string;
  readonly PUBLIC_SANITY_READ_TOKEN: string;
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  type Session = {
    token: string;
    expiresAt: number;
  };

  type User = import('@/types').User;

  type CookiePayload = {
    token: string;
    expiresAt: number;
    user: User;
  };

  interface Locals {
    session?: Session;
    user?: User;
  }
}
