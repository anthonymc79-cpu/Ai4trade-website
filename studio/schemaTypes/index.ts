import {cta} from './objects/cta'
import {link} from './objects/link'
import {hero} from './objects/hero'
import {imageWithAlt} from './objects/imageWithAlt'
import {seo} from './objects/seo'
import {calloutPanel, ctaBanner, faqSection, featureGrid, textBlock, textWithImage} from './objects/sections'
import {homePage} from './documents/homePage'
import {landingPage} from './documents/landingPage'
import {pricingPage} from './documents/pricingPage'
import {planCard} from './objects/planCard'
import {siteSettings} from './documents/siteSettings'
import {tutorial} from './documents/tutorial'

export const schemaTypes = [
  // Documents
  siteSettings,
  homePage,
  landingPage,
  pricingPage,
  tutorial,
  // Building blocks
  imageWithAlt,
  cta,
  planCard,
  link,
  seo,
  hero,
  featureGrid,
  textBlock,
  textWithImage,
  faqSection,
  calloutPanel,
  ctaBanner,
]
