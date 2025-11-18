import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'countrySection',
  title: 'Country Section',
  type: 'object',
  fields: [
    defineField({
      name: 'country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'listCountry',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1),
    }),
  ],
});
