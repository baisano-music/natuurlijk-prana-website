import { authorType } from './author'
import { blogType } from './blog'
import { calloutType } from './callout'
import { dienstType } from './dienst'
import { faqType, faqBlockType } from './faq'
import { homepageType } from './homepage'
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
  pageType,
  pageSettingsType,
  redirectType,
  testimonialType,
  siteSettingsType,
  tarievenPageType,
  // Object types (voor rich text)
  calloutType,
]
