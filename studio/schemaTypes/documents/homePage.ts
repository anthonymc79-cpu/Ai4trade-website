import {defineArrayMember, defineField, defineType} from 'sanity'
import {pageSections} from '../objects/sections'

// One-off document for "/". The audience cards are the splitter
// that sends electricians and homeowners to their own pages.
export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({name: 'hero', type: 'hero'}),
    defineField({
      name: 'audienceCards',
      title: 'Audience cards (the "I am a..." splitter)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'audienceCard',
          fields: [
            defineField({name: 'label', title: 'Small label (e.g. "Run a business")', type: 'string'}),
            defineField({name: 'heading', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 3}),
            defineField({name: 'image', type: 'imageWithAlt'}),
            defineField({name: 'button', type: 'cta', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'heading', subtitle: 'button.href'}},
        }),
      ],
      validation: (rule) => rule.length(2).warning('The homepage layout is designed for two cards.'),
    }),
    pageSections,
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Homepage'})},
})
