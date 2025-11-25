import groq from 'groq';

export const QUERY_SITE_SETTINGS = groq`
*[_type == "siteSettings"][0]{
  title,
  description,
  "favicon": {
    "url": favicon.asset->url,
    "mimeType": favicon.asset->mimeType
  }
}
`;
