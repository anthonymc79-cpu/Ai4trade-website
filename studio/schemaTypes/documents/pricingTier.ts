import {defineArrayMember, defineField, defineType} from 'sanity'

export const pricingTier = defineType({
  name: 'pricingTier',
  title: 'Pricing tier',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'planKey',
      title: 'Stripe plan',
      type: 'string',
      description:
        'Which Stripe price this tier checks out with. The real price IDs stay in your environment variables (STRIPE_PRICE_STARTER / STRIPE_PRICE_TEAM).',
      options: {
        list: [
          {title: 'Starter', value: 'starter'},
          {title: 'Team', value: 'team'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'tagline', type: 'string'}),
    defineField({
      name: 'prices',
      title: 'Displayed prices',
      type: 'array',
      description:
        'Display only. The amount actually charged is set in Stripe, so update both together. One entry per currency your site shows.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'price',
          fields: [
            defineField({
              name: 'currency',
              type: 'string',
              options: {list: ['GBP', 'EUR', 'USD']},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'amount',
              type: 'number',
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: 'interval',
              type: 'string',
              options: {list: ['month', 'year'], layout: 'radio'},
              initialValue: 'month',
            }),
          ],
          preview: {
            select: {currency: 'currency', amount: 'amount', interval: 'interval'},
            prepare: ({currency, amount, interval}) => ({title: `${currency} ${amount} / ${interval}`}),
          },
        }),
      ],
    }),
    defineField({
      name: 'features',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'buttonLabel', type: 'string', initialValue: 'Start subscription'}),
    defineField({name: 'highlighted', title: 'Highlight as "most popular"', type: 'boolean', initialValue: false}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 1}),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'tagline'}},
})
