import {defineField, defineType} from 'sanity'
import {pageSections} from '../objects/sections'

// Web addresses already used by pages built in code. A Sanity page with one
// of these addresses would never be shown, so the editor blocks them.
// Add to this list if you add a new folder to the website's app/ directory.
const RESERVED = [
  'pricing',
  'homeowners',
  'tutorials',
  'signup',
  'login',
  'logout',
  'api',
  'auth',
  'account',
  'dashboard',
  'studio',
  'admin',
  'videos',
  'thumbnails',
]

// Any marketing page. /for-electricians and /services are pages like this;
// any new one you create goes live at its own web address, e.g. /landlords.
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
      description:
        'The page appears at ai4trade.co.uk/[this]. Click "Generate" to make one from the page name. Changing it later breaks any links to the old address.',
      options: {source: 'title', maxLength: 64},
      validation: (rule) =>
        rule.required().custom((slug) => {
          const current = (slug as {current?: string} | undefined)?.current ?? ''
          if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(current)) {
            return 'Use lowercase letters, numbers and single dashes only, e.g. "landlords" or "eicr-for-landlords".'
          }
          if (RESERVED.includes(current)) {
            return `"/${current}" is already used by another part of the site. Please choose a different address.`
          }
          return true
        }),
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
