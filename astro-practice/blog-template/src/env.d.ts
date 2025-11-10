/// <reference types="astro/client" />

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
