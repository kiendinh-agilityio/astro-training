import groq from 'groq';

export const QUERY_BLOG_SECTION_SETTINGS = groq`
*[_type == "blogSectionSettings"][0]{
  trendingPostTitle,
  trendingPostDescription
}
`;
