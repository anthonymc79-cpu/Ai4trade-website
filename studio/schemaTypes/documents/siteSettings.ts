import {defineArrayMember, defineField, defineType} from 'sanity'

// One-off document: the header and footer shown on every page.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'navigation',
      title: 'Menu',
      type: 'array',
      group: 'header',
      description:
        'Each item is either a single link, or a dropdown (give it dropdown links and leave its own link empty).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Leave empty if this item opens a dropdown.',
            }),
            defineField({
              name: 'children',
              title: 'Dropdown links',
              type: 'array',
              of: [defineArrayMember({type: 'link'})],
            }),
          ],
          validation: (rule) =>
            rule.custom((item) => {
              const value = item as {href?: string; children?: unknown[]} | undefined
              if (!value?.href && !value?.children?.length) {
                return 'Add either a link or at least one dropdown link.'
              }
              return true
            }),
          preview: {
            select: {title: 'label', href: 'href', children: 'children'},
            prepare: ({title, href, children}) => ({
              title,
              subtitle: children?.length ? `Dropdown · ${children.length} links` : href,
            }),
          },
        }),
      ],
      validation: (rule) => rule.max(6).warning('More than 6 menu items may not fit on smaller laptops.'),
    }),
    defineField({
      name: 'headerButton',
      title: 'Header button',
      type: 'cta',
      group: 'header',
      description: 'The highlighted button on the right. ("Log in" is fixed, as it links to the app.)',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Text under the logo',
      type: 'text',
      rows: 3,
      group: 'footer',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Link columns',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({name: 'heading', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'links', type: 'array', of: [defineArrayMember({type: 'link'})]}),
          ],
          preview: {
            select: {title: 'heading', links: 'links'},
            prepare: ({title, links}) => ({title, subtitle: `${links?.length ?? 0} links`}),
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'copyrightName',
      title: 'Copyright name',
      type: 'string',
      group: 'footer',
      description: 'Shown as "© [current year] [this]".',
      initialValue: 'Ai4Trade Ltd.',
    }),
    defineField({
      name: 'footerSlogan',
      title: 'Bottom-right slogan',
      type: 'string',
      group: 'footer',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
