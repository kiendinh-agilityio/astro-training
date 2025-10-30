export interface NavbarItem {
  label: string;
  href: string;
  ariaLabel: string;
  isExternal?: boolean;
}

export interface SocialItem {
  href: string;
  ariaLabel: string;
  icon: SocialIconKey;
}

export type SocialIconKey =
  | 'Instagram'
  | 'Twitter'
  | 'Linkedin'
  | 'Facebook'
  | 'Youtube';
