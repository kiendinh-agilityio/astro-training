import type { BlogPost, SanityBlogPost, SanityBlogSection } from '@/types';
import { formatDate } from '@/utils';

export const transformBlogSections = (sections?: SanityBlogSection[]) =>
  Array.isArray(sections)
    ? sections
        .filter((section) => section?.country)
        .map((section) => ({
          country: section.country ?? '',
          listCountry: section.listCountry?.filter(Boolean) ?? [],
        }))
    : [];

export const transformSanityBlogPost = (doc: SanityBlogPost): BlogPost => ({
  id: doc._id,
  slug: doc.slug ?? '',
  title: doc.title ?? 'Untitled',
  readTime: doc.readTime ?? '',
  date: formatDate(doc.publishedDate),
  introduction: doc.introduction ?? '',
  mainImage: doc.mainImage ?? doc.image ?? null,
  subtitle: doc.subtitle ?? '',
  content: {
    type: 'countries',
    sections: transformBlogSections(doc.content?.sections),
  },
  conclusion: doc.conclusion ?? '',
  author: {
    name: doc.author?.name ?? 'Unknown Author',
    avatar: doc.author?.avatar ?? null,
    role: doc.author?.role ?? 'Author',
  },
  image: doc.image ?? doc.mainImage ?? null,
  featured: Boolean(doc.featured),
  theme: doc.theme ?? null,
});
