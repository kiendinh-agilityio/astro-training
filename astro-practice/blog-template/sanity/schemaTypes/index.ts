import author from './documents/author';
import blogPost from './documents/blogPost';
import mainNavigation from './documents/mainNavigation';
import siteSettings from './documents/siteSettings';
import themeSettings from './documents/themeSettings';
import blogContent from './objects/blogContent';
import countrySection from './objects/countrySection';

export { SANITY_CONFIG } from './constants/config';
export const schemaTypes = [
  siteSettings,
  mainNavigation,
  themeSettings,
  author,
  blogPost,
  blogContent,
  countrySection,
];
