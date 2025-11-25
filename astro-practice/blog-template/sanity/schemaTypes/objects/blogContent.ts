import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blogContent',
  title: 'Blog Content',
  type: 'object',
  fields: [
    defineField({
      name: 'sections',
      type: 'array',
      of: [{ type: 'countrySection' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
