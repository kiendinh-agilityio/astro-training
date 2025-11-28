import { defineField, defineType } from 'sanity';

import { SANITY_LANGUAGES } from '../constants/languages';

export default defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: SANITY_LANGUAGES.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type: 'text',
      rows: 3,
      validation: id === 'en' ? (rule) => rule.required() : undefined,
    }),
  ),
});
