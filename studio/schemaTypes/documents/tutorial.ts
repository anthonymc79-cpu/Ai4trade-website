import {defineArrayMember, defineField, defineType} from 'sanity'

// Replaces the mock array in lib/tutorials.js.
// Subscriptions and progress tracking stay in Supabase.
export const tutorial = defineType({
  name: 'tutorial',
  title: 'Tutorial',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced (subscribers only)', value: 'advanced'},
        ],
        layout: 'radio',
      },
      initialValue: 'beginner',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      // middleware.js locks /tutorials/advanced-*, so the address must match the level.
      validation: (rule) =>
        rule.required().custom((slug, context) => {
          const level = (context.document as {level?: string} | undefined)?.level
          const current = (slug as {current?: string} | undefined)?.current ?? ''
          if (level === 'advanced' && !current.startsWith('advanced-')) {
            return 'Advanced tutorials must have a web address starting with "advanced-" so the subscriber lock applies.'
          }
          if (level !== 'advanced' && current.startsWith('advanced-')) {
            return 'Only advanced tutorials should start with "advanced-", or they will be locked to subscribers.'
          }
          return true
        }),
    }),
    defineField({name: 'summary', type: 'text', rows: 3}),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'The Cloudflare Stream video ID (or the file name in /videos for now).',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'thumbnail', type: 'imageWithAlt'}),
    defineField({name: 'durationMinutes', title: 'Length (minutes)', type: 'number'}),
    defineField({
      name: 'notes',
      title: 'Written notes under the video',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({name: 'order', title: 'Display order', type: 'number'}),
    defineField({name: 'publishedAt', type: 'datetime'}),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Newest first', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', level: 'level', media: 'thumbnail'},
    prepare: ({title, level, media}) => ({title, subtitle: level, media}),
  },
})
