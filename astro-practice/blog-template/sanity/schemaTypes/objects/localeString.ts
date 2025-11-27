import { defineField, defineType } from 'sanity';

import { SANITY_LANGUAGES } from '../constants/languages';

export default defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: SANITY_LANGUAGES.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type: 'string',
      validation: id === 'en' ? (rule) => rule.required() : undefined,
    }),
  ),
});
