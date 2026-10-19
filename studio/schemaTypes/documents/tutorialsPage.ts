import {defineField, defineType} from 'sanity'

// One-off document: the wording around the tutorials (the /tutorials
// heading, and the message shown when a Pro tutorial is locked).
export const tutorialsPage = defineType({
  name: 'tutorialsPage',
  title: 'Tutorials page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Electrician tutorials page heading',
      type: 'hero',
      description: 'Any "Pro" in the intro text is highlighted in copper automatically.',
    }),
    defineField({
      name: 'homeownersHero',
      title: 'Homeowner tutorials page heading',
      type: 'hero',
      description: 'The top of /tutorials/homeowners.',
    }),
    defineField({
      name: 'lockedMessage',
      title: 'Locked Pro tutorial message',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Small label', type: 'string'}),
        defineField({name: 'heading', type: 'string'}),
        defineField({name: 'text', type: 'text', rows: 3}),
        defineField({name: 'buttonLabel', title: 'Button text', type: 'string'}),
      ],
    }),
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Tutorials page'})},
})
