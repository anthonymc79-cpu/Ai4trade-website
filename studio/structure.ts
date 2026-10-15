import type {StructureResolver} from 'sanity/structure'

// Documents there should only ever be one of.
export const SINGLETON_TYPES = new Set(['siteSettings', 'homePage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('landingPage').title('Pages'),
      S.documentTypeListItem('pricingTier').title('Pricing tiers'),
      S.documentTypeListItem('tutorial').title('Tutorials'),
    ])
