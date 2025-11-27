import type {
  BlogPost,
  LocalizedField,
  SanityBlogPost,
  SanityBlogSection,
  SupportedLanguage,
} from '@/types';
import { SUPPORTED_LANGUAGES } from '@/types';
import { formatDate } from '@/utils';

const getLocalePriority = (language: SupportedLanguage) => [
  language,
  ...SUPPORTED_LANGUAGES.filter((locale) => locale !== language),
];

const resolveLocalizedString = (
  field: LocalizedField<string> | undefined,
  language: SupportedLanguage,
) => {
  const localeOrder = getLocalePriority(language);

  for (const locale of localeOrder) {
    const value = field?.[locale];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
};

export const transformBlogSections = (
  sections: SanityBlogSection[] | undefined,
  language: SupportedLanguage,
) =>
  Array.isArray(sections)
    ? sections
        .map((section) => {
          const country = resolveLocalizedString(section?.country, language);
          if (!country) return null;

          const listCountry =
            section.listCountry
              ?.map((entry) => resolveLocalizedString(entry, language))
              .filter((entry): entry is string => Boolean(entry)) ?? [];

          return {
            country,
            listCountry,
          };
        })
        .filter((section): section is BlogPost['content']['sections'][number] =>
          Boolean(section),
        )
    : [];

export const transformSanityBlogPost = (
  doc: SanityBlogPost,
  language: SupportedLanguage,
): BlogPost => ({
  id: doc._id,
  slug: doc.slug ?? '',
  title: resolveLocalizedString(doc.title, language) ?? 'Untitled',
  readTime: resolveLocalizedString(doc.readTime, language) ?? '',
  date: formatDate(doc.publishedDate),
  introduction: resolveLocalizedString(doc.introduction, language) ?? '',
  mainImage: doc.mainImage ?? doc.image ?? null,
  subtitle: resolveLocalizedString(doc.subtitle, language) ?? '',
  content: {
    type: 'countries',
    sections: transformBlogSections(doc.content?.sections, language),
  },
  conclusion: resolveLocalizedString(doc.conclusion, language) ?? '',
  author: {
    name: doc.author?.name ?? 'Unknown Author',
    avatar: doc.author?.avatar ?? null,
    role: doc.author?.role ?? 'Author',
  },
  image: doc.image ?? doc.mainImage ?? null,
  featured: Boolean(doc.featured),
  theme: doc.theme ?? null,
});
