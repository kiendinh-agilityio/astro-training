import groq from 'groq';

export const QUERY_SITE_SETTINGS = groq`
*[_type == "siteSettings"][0]{
  title,
  description,
  language,
  "image": image.asset->url,
  "favicon": {
    "url": favicon.asset->url,
    "mimeType": favicon.asset->mimeType
  }
}
`;

export const QUERY_MAIN_NAVIGATION = groq`
*[_type == "mainNavigation"][0]{
  items[]{
    label,
    href,
    ariaLabel,
    isExternal,
    disabled
  }
}
`;
