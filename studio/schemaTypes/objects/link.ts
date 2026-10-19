import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'A page on this site (/pricing, /services#eicr), a full web address (https://...), or an email (mailto:you@example.com).',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})
