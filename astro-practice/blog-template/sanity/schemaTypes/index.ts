import author from './documents/author';
import blogPost from './documents/blogPost';
import blogContent from './objects/blogContent';
import countrySection from './objects/countrySection';

export { SANITY_CONFIG } from './constants/config';
export const schemaTypes = [author, blogPost, blogContent, countrySection];
