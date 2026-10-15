import {defineArrayMember, defineField, defineType} from 'sanity'

// Building blocks editors can stack in any order on a page.

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature grid',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Small text above heading', type: 'string'}),
    defineField({name: 'heading', type: 'string'}),
    defineField({name: 'intro', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({name: 'label', title: 'Small label (e.g. "01 · QUOTING")', type: 'string'}),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 3}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {heading: 'heading', eyebrow: 'eyebrow'},
    prepare: ({heading, eyebrow}) => ({title: heading || eyebrow || 'Feature grid', subtitle: 'Feature grid'}),
  },
})

export const textWithImage = defineType({
  name: 'textWithImage',
  title: 'Text with image',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({
      name: 'body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({name: 'image', type: 'imageWithAlt'}),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: {list: ['left', 'right'], layout: 'radio'},
      initialValue: 'right',
    }),
    defineField({name: 'button', type: 'cta'}),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare: ({title, media}) => ({title: title || 'Text with image', subtitle: 'Text with image', media}),
  },
})

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string', initialValue: 'Frequently asked questions'}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'answer', type: 'text', rows: 4, validation: (rule) => rule.required()}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: title || 'FAQ', subtitle: 'FAQ'}),
  },
})

export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'Call-to-action banner',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', type: 'text', rows: 2}),
    defineField({name: 'button', type: 'cta'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title, subtitle: 'Call-to-action banner'}),
  },
})

// Reusable "sections" field for any page type.
export const pageSections = defineField({
  name: 'sections',
  title: 'Page sections',
  type: 'array',
  of: [
    defineArrayMember({type: 'featureGrid'}),
    defineArrayMember({type: 'textWithImage'}),
    defineArrayMember({type: 'faqSection'}),
    defineArrayMember({type: 'ctaBanner'}),
  ],
})
