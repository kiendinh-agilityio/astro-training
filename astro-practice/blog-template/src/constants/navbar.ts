import type { NavbarItem } from '@/types';

import { ROUTER } from './router';

export const NAVBAR_ITEMS: NavbarItem[] = [
  {
    label: 'Home',
    href: ROUTER.HOME,
    ariaLabel: 'Navigate to home page',
  },
  {
    label: 'Blog',
    href: ROUTER.BLOG,
    ariaLabel: 'Navigate to blog page',
  },
  {
    label: 'Single Post',
    href: ROUTER.SINGLE_POST,
    ariaLabel: 'Navigate to single post page',
    disabled: true,
  },
];
