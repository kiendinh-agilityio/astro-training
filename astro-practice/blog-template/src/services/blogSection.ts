import { QUERY_BLOG_SECTION_SETTINGS } from '@/queries/blogSection';
import type {
  BlogSectionSettings,
  LocalizedField,
  SanityBlogSectionSettings,
  SupportedLanguage,
} from '@/types';
import { SUPPORTED_LANGUAGES } from '@/types';

import { sanityClient } from './sanityClient';

const resolveLocalizedString = (
  field: LocalizedField<string> | undefined,
  language: SupportedLanguage,
): string | undefined => {
  const localeOrder = [
    language,
    ...SUPPORTED_LANGUAGES.filter((locale) => locale !== language),
  ];

  for (const locale of localeOrder) {
    const value = field?.[locale];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
};

export const fetchBlogSectionSettings = async (
  language: SupportedLanguage,
): Promise<BlogSectionSettings> => {
  const settings = await sanityClient.fetch<SanityBlogSectionSettings | null>(
    QUERY_BLOG_SECTION_SETTINGS,
  );

  return {
    trendingPostTitle: resolveLocalizedString(
      settings?.trendingPostTitle,
      language,
    ),
    trendingPostDescription: resolveLocalizedString(
      settings?.trendingPostDescription,
      language,
    ),
  };
};
