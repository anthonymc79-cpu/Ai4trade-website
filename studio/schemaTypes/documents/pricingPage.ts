import {defineField, defineType} from 'sanity'

// One-off document for /pricing. The prices themselves live in code,
// kept in sync with the app, so the website can never show a different
// price from the one customers are charged.
export const pricingPage = defineType({
  name: 'pricingPage',
  title: 'Pricing page',
  type: 'document',
  fields: [
    defineField({name: 'hero', type: 'hero'}),
    defineField({name: 'pro', title: 'Pro plan', type: 'planCard'}),
    defineField({
      name: 'monthlyLabel',
      title: 'Monthly toggle text',
      type: 'string',
      initialValue: 'Monthly',
    }),
    defineField({
      name: 'annualLabel',
      title: 'Annual toggle text',
      type: 'string',
      description: 'The "(save ~15%)" part is worked out from the prices automatically.',
      initialValue: 'Annual',
    }),
    defineField({
      name: 'trialNote',
      title: 'Free trial line',
      type: 'object',
      fields: [
        defineField({name: 'before', title: 'Text before the link', type: 'string'}),
        defineField({name: 'linkText', title: 'Link text', type: 'string'}),
        defineField({name: 'after', title: 'Text after the link', type: 'string'}),
      ],
    }),
    defineField({name: 'footnote', title: 'Small print at the bottom', type: 'text', rows: 2}),
    defineField({
      name: 'seo',
      type: 'seo',
      description: 'If the description mentions prices, update it whenever the prices change.',
    }),
  ],
  preview: {prepare: () => ({title: 'Pricing page'})},
})
