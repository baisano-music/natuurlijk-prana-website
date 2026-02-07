/**
 * Sanity client voor het ophalen van content op de website.
 * Importeer `client` voor queries, of gebruik de helper-functies hieronder.
 */
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0xp96ddy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

/** GROQ queries voor hergebruik */
export const queries = {
  /** Eerste N remedies (voor homepage uitgelicht) */
  remediesFeatured: (limit: number) =>
    `*[_type == "remedie"] | order(coalesce(order, 999) asc, title asc) [0...${limit}] {
    _id, title, "slug": slug.current, kernkwaliteit, werking,
    "imageUrl": image.asset->url
  }`,

  /** Alle gepubliceerde remedies */
  remedies: `*[_type == "remedie"] | order(coalesce(order, 999) asc, title asc) {
    _id, title, "slug": slug.current, kernkwaliteit, werking, mantra,
    image, "imageUrl": image.asset->url,
    ontstaan, ingredienten, edelstenen
  }`,

  /** Eén remedie op slug */
  remedieBySlug: (slug: string) =>
    `*[_type == "remedie" && slug.current == "${slug}"][0]{
      _id, title, "slug": slug.current, kernkwaliteit, werking, mantra,
      image, "imageUrl": image.asset->url,
      ontstaan, ingredienten, edelstenen,
      content[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url
        }
      }
    }`,

  /** Eén remedie op _id */
  remedieById: (id: string) =>
    `*[_type == "remedie" && _id == "${id}"][0]{
      _id, title, kernkwaliteit, werking, mantra,
      image, "imageUrl": image.asset->url,
      ontstaan, ingredienten, edelstenen
    }`,

  /** Blogposts (alleen gepubliceerd, geen concepten) */
  blogPosts: `*[_type == "blog" && draft != true] | order(publishedAt desc) {
    _id, title, type, "slug": slug.current, publishedAt, excerpt, categories,
    "mainImageUrl": mainImage.asset->url
  }`,

  /** Blogposts met paginatie */
  blogPostsPaginated: (start: number, end: number) =>
    `*[_type == "blog" && draft != true] | order(publishedAt desc) [${start}...${end}] {
    _id, title, type, "slug": slug.current, publishedAt, excerpt, categories,
    "mainImageUrl": mainImage.asset->url
  }`,

  /** Totaal aantal blogposts (voor paginatie) */
  blogPostsCount: `count(*[_type == "blog" && draft != true])`,

  /** Eén blogpost op slug */
  blogPostBySlug: (slug: string) =>
    `*[_type == "blog" && slug.current == "${slug}"][0]{
      _id, title, type, "slug": slug.current, content, publishedAt, excerpt, categories,
      "mainImageUrl": mainImage.asset->url
    }`,

  /** Diensten, gesorteerd op volgorde */
  diensten: `*[_type == "dienst"] | order(order asc) {
    _id, title, "slug": slug.current, description, icon, mainImage,
    duration, price, featured, seo
  }`,

  /** Eén dienst op slug */
  dienstBySlug: (slug: string) =>
    `*[_type == "dienst" && slug.current == "${slug}"][0]{
      _id, title, "slug": slug.current, description, icon, mainImage, content,
      duration, price, seo
    }`,

  /** Testimonials / Ervaringen */
  testimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id, name, initials, quote, context, featured
  }`,

  /** Uitgelichte testimonials (voor homepage) */
  testimonialsFeatured: `*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...3] {
    _id, name, initials, quote, context
  }`,

  /** Site-instellingen (singleton) */
  siteSettings: `*[_type == "siteSettings"][0]{
    title, description, contactInfo, socialMedia, openingHours, parkingInfo,
    footerNavigation, footerBottomLinks, googleAnalyticsId, googleTagManagerId
  }`,

  /** Pagina-instellingen per type */
  pageSettings: (pageType: string) =>
    `*[_type == "pageSettings" && pageType == "${pageType}"][0]{
      title, subtitle, introContent, ctaTitle, ctaText, ctaButton
    }`,

  /** Homepage (singleton) */
  homepage: `*[_type == "homepage"][0]{
    heroTitle, heroSubtitle, heroDescription,
    heroImage, "heroImageUrl": heroImage.asset->url,
    heroVideo, "heroVideoUrl": heroVideo.asset->url,
    heroPrimaryButton, heroSecondaryButton,
    showMagazineBanner, magazineBannerTitle, magazineBannerSubtitle, magazineBannerButton,
    welcomeLabel, welcomeTitle, welcomeText, welcomeLink,
    welcomeImage, "welcomeImageUrl": welcomeImage.asset->url,
    remediesLabel, remediesTitle, remediesSubtitle, remediesCount, remediesButton,
    testimonialsLabel, testimonialsTitle, testimonialsSubtitle, showTestimonials, testimonialsLink,
    ctaTitle, ctaText, ctaButton,
    ctaImage, "ctaImageUrl": ctaImage.asset->url
  }`,

  /** Pagina's */
  pages: `*[_type == "page"]{ _id, title, slug, sections }`,

  /** Eén pagina op slug */
  pageBySlug: (slug: string) =>
    `*[_type == "page" && slug.current == "${slug}"][0]{
      _id, title, "slug": slug.current, subtitle,
      mainImage, "mainImageUrl": mainImage.asset->url,
      content[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url
        }
      },
      sections,
      seo
    }`,

  /** Productcategorieën - alleen hoofdcategorieën */
  productCategoriesMain: `*[_type == "productCategory" && !defined(parent)] | order(order asc) {
    _id, title, "slug": slug.current, description,
    "imageUrl": image.asset->url
  }`,

  /** Productcategorieën met subcategorieën */
  productCategoriesTree: `*[_type == "productCategory" && !defined(parent)] | order(order asc) {
    _id, title, "slug": slug.current, description,
    "imageUrl": image.asset->url,
    "children": *[_type == "productCategory" && references(^._id)] | order(order asc) {
      _id, title, "slug": slug.current, description,
      "imageUrl": image.asset->url
    }
  }`,

  /** Alle productcategorieën */
  productCategories: `*[_type == "productCategory"] | order(order asc) {
    _id, title, "slug": slug.current, description,
    parent->{_id, title, "slug": slug.current},
    "imageUrl": image.asset->url
  }`,

  /** Eén categorie op slug */
  productCategoryBySlug: (slug: string) =>
    `*[_type == "productCategory" && slug.current == "${slug}"][0]{
      _id, title, "slug": slug.current, description,
      "imageUrl": image.asset->url,
      parent->{_id, title, "slug": slug.current},
      content[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url
        }
      }
    }`,

  /** Producten per categorie */
  productsByCategory: (categoryId: string) =>
    `*[_type == "remedie" && category._ref == "${categoryId}"] | order(coalesce(order, 999) asc, title asc) {
      _id, title, "slug": slug.current, kernkwaliteit, werking,
      "imageUrl": image.asset->url, shortDescription
    }`,

  /** Producten per categorie slug */
  productsByCategorySlug: (slug: string) =>
    `*[_type == "remedie" && category->slug.current == "${slug}"] | order(coalesce(order, 999) asc, title asc) {
      _id, title, "slug": slug.current, kernkwaliteit, werking,
      "imageUrl": image.asset->url, shortDescription
    }`,

  /** Pagina's per productcategorie */
  pagesByCategory: (categorySlug: string) =>
    `*[_type == "page" && productCategory->slug.current == "${categorySlug}" && showInNavigation == true] | order(order asc) {
      _id, title, "slug": slug.current, subtitle,
      "mainImageUrl": mainImage.asset->url
    }`,

  /** Pagina's met subpagina's */
  pagesWithChildren: (parentSlug: string) =>
    `*[_type == "page" && parentPage->slug.current == "${parentSlug}"] | order(order asc) {
      _id, title, "slug": slug.current, subtitle,
      "mainImageUrl": mainImage.asset->url
    }`,

  /** Uitgebreide pagina query met parent en category info */
  pageBySlugFull: (slug: string) =>
    `*[_type == "page" && slug.current == "${slug}"][0]{
      _id, title, "slug": slug.current, subtitle,
      mainImage, "mainImageUrl": mainImage.asset->url,
      parentPage->{_id, title, "slug": slug.current},
      productCategory->{_id, title, "slug": slug.current},
      content[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url
        }
      },
      sections,
      seo,
      "childPages": *[_type == "page" && parentPage._ref == ^._id] | order(order asc) {
        _id, title, "slug": slug.current
      }
    }`,

  /** Alle actieve redirects */
  redirects: `*[_type == "redirect" && active == true]{
    source, destination, permanent
  }`,
}
