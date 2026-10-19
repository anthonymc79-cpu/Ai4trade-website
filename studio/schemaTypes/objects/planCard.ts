import {defineField, defineType} from 'sanity'

export const planCard = defineType({
  name: 'planCard',
  title: 'Plan card',
  type: 'object',
  description: 'The price and sign-up link are set in code, so they always match what the app charges.',
  fields: [
    defineField({name: 'label', title: 'Small label (e.g. "TIER · STARTER")', type: 'string'}),
    defineField({name: 'name', title: 'Plan name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 4}),
    defineField({name: 'buttonLabel', title: 'Button text', type: 'string', initialValue: 'Get started →'}),
  ],
})
