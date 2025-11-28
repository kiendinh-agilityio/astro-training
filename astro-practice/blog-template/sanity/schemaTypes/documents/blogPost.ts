import { defineField, defineType } from 'sanity';

import type { SanityDocument } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: SanityDocument) => (doc as any)?.title?.en ?? 'post',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readTime',
      type: 'localeString',
    }),
    defineField({
      name: 'introduction',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'conclusion',
      type: 'localeText',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'blogContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Page Theme (Override)',
      type: 'string',
      description:
        'Theme specific to this blog site. Leave blank to use the Global Theme from Site Settings.',
      options: {
        list: [
          { title: 'Use Global Theme', value: '' },
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
          { title: 'Christmas', value: 'christmas' },
        ],
      },
      initialValue: '',
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleVi: 'title.vi',
      media: 'thumbnail',
    },
    prepare({ titleEn, titleVi, media }) {
      return {
        title: titleEn || titleVi || 'Untitled',
        subtitle: titleVi && titleEn ? titleVi : undefined,
        media,
      };
    },
  },
});
