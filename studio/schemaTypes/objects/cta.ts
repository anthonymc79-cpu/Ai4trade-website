import {defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'A page on this site (e.g. /pricing) or a full web address (https://...).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})
