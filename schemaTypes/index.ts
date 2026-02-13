import { authorType } from './author'
import { blogType } from './blog'
import { calloutType } from './callout'
import { coloredSectionType } from './coloredSection'
import { dienstType } from './dienst'
import { faqType, faqBlockType } from './faq'
import { homepageType } from './homepage'
import { magazinePageType } from './magazinePage'
import { pageType } from './page'
import { pageSettingsType } from './pageSettings'
import { productCategoryType } from './productCategory'
import { productType } from './product'
import { redirectType } from './redirect'
import { remedieType } from './remedie'
import { siteSettingsType } from './siteSettings'
import { tarievenPageType } from './tarievenPage'
import { testimonialType } from './testimonial'

export const schemaTypes = [
  // Personen
  authorType,
  // Content types
  productCategoryType,
  productType,
  remedieType,
  blogType,
  dienstType,
  faqType,
  faqBlockType,
  homepageType,
  magazinePageType,
  pageType,
  pageSettingsType,
  redirectType,
  testimonialType,
  siteSettingsType,
  tarievenPageType,
  // Object types (voor rich text)
  calloutType,
  coloredSectionType,
]
