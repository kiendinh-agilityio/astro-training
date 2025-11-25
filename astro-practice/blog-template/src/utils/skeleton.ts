import { SHOW_HOME_SKELETON_FLAG } from '@/constants';

/**
 * Safe helpers for sessionStorage
 */
export const getSkeletonFlag = (): boolean =>
  globalThis.sessionStorage?.getItem(SHOW_HOME_SKELETON_FLAG) === 'true' ||
  false;

export const clearSkeletonFlag = (): void =>
  globalThis.sessionStorage?.removeItem(SHOW_HOME_SKELETON_FLAG);
