import type { SupportedLanguage } from '@/types';

const getDateFormatter = (language: SupportedLanguage) => {
  const locale = language === 'vi' ? 'vi-VN' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export const formatDate = (
  value?: string,
  language: SupportedLanguage = 'en',
): string => {
  if (!value) return '';

  try {
    const formatter = getDateFormatter(language);
    return formatter.format(new Date(value));
  } catch {
    return value;
  }
};
