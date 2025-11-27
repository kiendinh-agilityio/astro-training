import groq from 'groq';

export const QUERY_THEME_SETTINGS = groq`
*[_type == "themeSettings"][0]{
  globalTheme
}
`;
