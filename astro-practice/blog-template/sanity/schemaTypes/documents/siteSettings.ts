import { defineField, defineType } from 'sanity';

const faviconDescription =
  'Upload the favicon.svg file that should be used across the site.';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Default Share Image',
      type: 'image',
      description:
        'Used for Open Graph and Twitter sharing cards when a page does not provide a custom image.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon (SVG)',
      type: 'file',
      description: faviconDescription,
      options: { accept: '.svg' },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
