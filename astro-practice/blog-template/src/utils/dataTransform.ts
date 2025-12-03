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

const getLocalizedValue = (
  field: LocalizedField<string> | string | undefined,
  language: SupportedLanguage,
): string | undefined => {
  if (typeof field === 'string' && field.trim()) return field;

  if (field && typeof field === 'object') {
    for (const locale of getLocalePriority(language)) {
      const value = field[locale];
      if (typeof value === 'string' && value.trim()) return value;
    }
  }

  return undefined;
};

// Strict version: only get value for current language, no fallback
const getLocalizedValueStrict = (
  field: LocalizedField<string> | string | undefined,
  language: SupportedLanguage,
): string | undefined => {
  if (typeof field === 'string' && field.trim()) return field;

  if (field && typeof field === 'object') {
    const value = field[language];
    if (typeof value === 'string' && value.trim()) return value;
  }

  return undefined;
};

export const transformBlogSections = (
  sections: SanityBlogSection[] | undefined,
  language: SupportedLanguage,
): BlogPost['content']['sections'] =>
  sections
    ?.map((section) => {
      // Use strict version: only get country for current language, no fallback
      const country = getLocalizedValueStrict(section?.country, language);
      if (!country) return null;

      // Use strict version for listCountry as well
      const listCountry =
        section.listCountry
          ?.map((entry) => getLocalizedValueStrict(entry, language))
          .filter((entry): entry is string => Boolean(entry?.trim())) ?? [];

      return { country, listCountry };
    })
    .filter(
      (section): section is { country: string; listCountry: string[] } =>
        section !== null,
    ) ?? [];

export const transformSanityBlogPost = (
  doc: SanityBlogPost,
  language: SupportedLanguage,
): BlogPost => ({
  id: doc._id,
  slug: doc.slug ?? '',
  title: getLocalizedValue(doc.title, language) ?? 'Untitled',
  readTime: getLocalizedValue(doc.readTime, language),
  date: formatDate(doc.publishedDate, language),
  introduction: getLocalizedValue(doc.introduction, language) ?? '',
  mainImage: doc.mainImage ?? doc.image ?? null,
  subtitle: getLocalizedValue(doc.subtitle, language),
  content: {
    type: 'countries',
    sections: transformBlogSections(doc.content?.sections, language),
  },
  conclusion: getLocalizedValue(doc.conclusion, language),
  author: {
    name: doc.author?.name ?? 'Unknown Author',
    avatar: doc.author?.avatar ?? null,
    role:
      getLocalizedValue(doc.author?.role, language) ??
      (language === 'vi' ? 'Tác giả' : 'Author'),
  },
  image: doc.image ?? doc.mainImage ?? null,
  featured: Boolean(doc.featured),
  theme: doc.theme ?? null,
});
