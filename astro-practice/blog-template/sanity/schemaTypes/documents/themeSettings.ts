import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'themeSettings',
  title: 'Theme Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'globalTheme',
      title: 'Global Theme',
      type: 'string',
      description: 'Default theme for the entire site. Default is Dark.',
      options: {
        list: [
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
          { title: 'Christmas', value: 'christmas' },
        ],
      },
      initialValue: 'dark',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Theme Settings',
      };
    },
  },
});
