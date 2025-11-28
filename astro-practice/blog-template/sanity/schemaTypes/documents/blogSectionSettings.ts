import { defineField, defineType } from 'sanity';

type LocaleString = {
  en?: string;
  vi?: string;
};

export default defineType({
  name: 'blogSectionSettings',
  title: 'Blog Section Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'trendingPostTitle',
      title: 'Trending Blog Post Title',
      type: 'localeString',
      description: 'Title for the Trending Blog Post on the homepage.',
      validation: (rule) =>
        rule.custom((value: LocaleString) => {
          if (!value?.en) {
            return 'English title is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'trendingPostDescription',
      title: 'Trending Blog Post Description',
      type: 'localeText',
      description:
        'Description/subtitle for the Trending Blog Post (optional).',
    }),
  ],
  preview: {
    select: {
      titleEn: 'trendingPostTitle.en',
      titleVi: 'trendingPostTitle.vi',
    },
    prepare({ titleEn, titleVi }) {
      return {
        title: 'Blog Section Settings',
        subtitle: titleEn || titleVi || 'Not configured',
      };
    },
  },
});
