import { defineField, defineType } from 'sanity';

const faviconDescription =
  'Upload the favicon files generated from the Sanity guide (SVG, ICO, PNG and Apple touch).';

const fileField = (name: string, title: string, accept: string) =>
  defineField({
    name,
    title,
    type: 'file',
    options: { accept },
    description: `${title} (${accept.replace(/\./g, '').toUpperCase()})`,
  });

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
      name: 'favicons',
      title: 'Favicons',
      type: 'object',
      description: faviconDescription,
      options: { collapsible: true, collapsed: false },
      fields: [
        fileField('svg', 'favicon.svg', '.svg'),
        fileField('ico', 'favicon.ico', '.ico'),
        fileField('png192', 'favicon-192.png', '.png'),
        fileField('png512', 'favicon-512.png', '.png'),
        fileField('appleTouch', 'apple-touch-icon.png', '.png'),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
