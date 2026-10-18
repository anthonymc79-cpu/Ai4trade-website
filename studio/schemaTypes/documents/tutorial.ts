import {defineField, defineType} from 'sanity'

// Replaces the mock array in lib/tutorials.js.
// Subscriptions and who-can-watch-what stay in Supabase and middleware.js.
export const tutorial = defineType({
  name: 'tutorial',
  title: 'Tutorial',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'audience',
      title: 'Who is it for',
      type: 'string',
      description: 'Decides which tutorials page it appears on. Left blank, it counts as Electricians.',
      options: {
        list: [
          {title: 'Electricians (/tutorials)', value: 'electricians'},
          {title: 'Homeowners (/tutorials/homeowners)', value: 'homeowners'},
        ],
        layout: 'radio',
      },
      initialValue: 'electricians',
    }),
    defineField({
      name: 'tier',
      title: 'Who can watch it',
      type: 'string',
      options: {
        list: [
          {title: 'Free – anyone', value: 'free'},
          {title: 'Pro – subscribed businesses only', value: 'pro'},
        ],
        layout: 'radio',
      },
      initialValue: 'free',
      validation: (rule) =>
        rule.required().custom((tier, context) => {
          const audience = (context.document as {audience?: string} | undefined)?.audience
          if (audience === 'homeowners' && tier === 'pro') {
            return 'Homeowner tutorials are always free. Choose "Free – anyone".'
          }
          return true
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Pro tutorials must start with "advanced-" (e.g. advanced-quoting-rules).',
      options: {source: 'title', maxLength: 96},
      // middleware.js locks /tutorials/advanced-*, so the address must match the tier.
      validation: (rule) =>
        rule.required().custom((slug, context) => {
          const tier = (context.document as {tier?: string} | undefined)?.tier
          const current = (slug as {current?: string} | undefined)?.current ?? ''
          if (tier === 'pro' && !current.startsWith('advanced-')) {
            return 'Pro tutorials must have a web address starting with "advanced-" so the subscriber lock applies.'
          }
          if (current === 'homeowners') {
            return '"homeowners" is used by the homeowner tutorials page. Please choose a different address.'
          }
          if (tier !== 'pro' && current.startsWith('advanced-')) {
            return 'Only Pro tutorials should start with "advanced-", or they will be locked to subscribers.'
          }
          return true
        }),
    }),
    defineField({
      name: 'category',
      type: 'string',
      description: 'Shown above the title, e.g. "Onboarding", "Certification".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Length',
      type: 'string',
      description: 'Minutes:seconds, e.g. 4:12',
      validation: (rule) =>
        rule.required().regex(/^\d{1,3}:[0-5]\d$/, {name: 'minutes:seconds, e.g. 4:12'}),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200).warning('Keep it short; it also appears on Google.'),
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'The ID the video player uses (e.g. the Cloudflare Stream video ID).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', tier: 'tier', category: 'category', duration: 'duration', audience: 'audience'},
    prepare: ({title, tier, category, duration, audience}) => ({
      title,
      subtitle: [
        audience === 'homeowners' ? 'Homeowners' : 'Electricians',
        category,
        duration,
        tier === 'pro' ? 'Pro' : null,
      ]
        .filter(Boolean)
        .join(', '),
    }),
  },
})
