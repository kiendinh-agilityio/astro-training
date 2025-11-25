import groq from 'groq';

export const BLOG_POST_FIELDS = groq`{
  _id,
  title,
  'slug': slug.current,
  readTime,
  featured,
  introduction,
  subtitle,
  conclusion,
  'publishedDate': coalesce(publishedAt, _createdAt),
  'mainImage': mainImage,
  'image': thumbnail,
  'author': author->{name, role, avatar},
  'content': content{
    sections[]{
      country,
      listCountry
    }
  }
}`;

export const QUERY_ALL_POSTS = groq`
*[_type == "blogPost" && defined(slug.current)]
| order(coalesce(publishedAt, _createdAt) desc)
${BLOG_POST_FIELDS}
`;

export const QUERY_POST_BY_SLUG = groq`
*[_type == "blogPost" && slug.current == $slug][0]
${BLOG_POST_FIELDS}
`;

export const QUERY_ALL_SLUGS = groq`
*[_type == "blogPost" && defined(slug.current)].slug.current
`;
