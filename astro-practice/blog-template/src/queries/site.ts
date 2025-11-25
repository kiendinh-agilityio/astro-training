import groq from 'groq';

export const QUERY_SITE_SETTINGS = groq`
*[_type == "siteSettings"][0]{
  title,
  description,
  "favicons": {
    "svg": {
      "url": favicons.svg.asset->url,
      "mimeType": favicons.svg.asset->mimeType
    },
    "ico": {
      "url": favicons.ico.asset->url,
      "mimeType": favicons.ico.asset->mimeType
    },
    "png192": {
      "url": favicons.png192.asset->url,
      "mimeType": favicons.png192.asset->mimeType
    },
    "png512": {
      "url": favicons.png512.asset->url,
      "mimeType": favicons.png512.asset->mimeType
    },
    "appleTouch": {
      "url": favicons.appleTouch.asset->url,
      "mimeType": favicons.appleTouch.asset->mimeType
    }
  }
}
`;
