import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Page title (browser tab and Google)',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Google cuts titles off after about 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep this under 160 characters.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Social share image',
      type: 'imageWithAlt',
    }),
  ],
})
