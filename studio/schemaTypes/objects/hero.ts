import {defineArrayMember, defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Small text above heading', type: 'string'}),
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Words to show in italics',
      type: 'string',
      description: 'Optional. Copy part of the heading exactly, e.g. "Every certificate."',
      validation: (rule) =>
        rule.custom((value, context) => {
          const heading = (context.parent as {heading?: string} | undefined)?.heading ?? ''
          if (value && !heading.includes(value)) return 'This must match part of the heading exactly.'
          return true
        }),
    }),
    defineField({name: 'subheading', type: 'text', rows: 3}),
    defineField({name: 'image', type: 'imageWithAlt'}),
    defineField({
      name: 'buttons',
      type: 'array',
      of: [defineArrayMember({type: 'cta'})],
      validation: (rule) => rule.max(2),
    }),
  ],
})
