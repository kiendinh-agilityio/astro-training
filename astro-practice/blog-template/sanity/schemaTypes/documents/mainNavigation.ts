import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'mainNavigation',
  title: 'Main Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      description:
        'Configure the links that appear in the main navigation of the site.',
      of: [
        defineArrayMember({
          name: 'navigationItem',
          title: 'Navigation Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Visible text for the navigation link.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              description: 'Absolute or relative URL for this link.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'ariaLabel',
              title: 'Aria Label',
              type: 'string',
              description: 'Assistive text read by screen readers.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'isExternal',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'disabled',
              title: 'Disabled',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Main Navigation',
      subtitle: 'Manage the navigation links for the site header',
    }),
  },
});
