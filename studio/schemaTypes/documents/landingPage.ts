import {defineField, defineType} from 'sanity'
import {pageSections} from '../objects/sections'

// Used for /for-electricians and /services (and any future marketing page).
export const landingPage = defineType({
  name: 'landingPage',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page name (internal)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'For example "for-electricians" or "services". Changing this changes the page URL.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'hero', type: 'hero'}),
    pageSections,
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current'},
    prepare: ({title, slug}) => ({title, subtitle: slug ? `/${slug}` : 'No web address yet'}),
  },
})
