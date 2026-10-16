import {cta} from './objects/cta'
import {hero} from './objects/hero'
import {imageWithAlt} from './objects/imageWithAlt'
import {seo} from './objects/seo'
import {calloutPanel, ctaBanner, faqSection, featureGrid, textBlock, textWithImage} from './objects/sections'
import {homePage} from './documents/homePage'
import {landingPage} from './documents/landingPage'
import {pricingTier} from './documents/pricingTier'
import {siteSettings} from './documents/siteSettings'
import {tutorial} from './documents/tutorial'

export const schemaTypes = [
  // Documents
  siteSettings,
  homePage,
  landingPage,
  pricingTier,
  tutorial,
  // Building blocks
  imageWithAlt,
  cta,
  seo,
  hero,
  featureGrid,
  textBlock,
  textWithImage,
  faqSection,
  calloutPanel,
  ctaBanner,
]
