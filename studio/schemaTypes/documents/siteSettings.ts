import {defineArrayMember, defineField, defineType} from 'sanity'

// One-off document: things shown on every page.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'siteName', type: 'string', initialValue: 'Ai4Trade'}),
    defineField({name: 'logo', type: 'imageWithAlt'}),
    defineField({
      name: 'navigation',
      title: 'Header menu links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', title: 'Link', type: 'string', validation: (rule) => rule.required()}),
          ],
        }),
      ],
    }),
    defineField({name: 'headerButton', title: 'Header button', type: 'cta'}),
    defineField({name: 'contactEmail', type: 'string', validation: (rule) => rule.email()}),
    defineField({name: 'footerText', type: 'text', rows: 2}),
    defineField({name: 'defaultSeo', title: 'Default SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
