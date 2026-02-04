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
    `*[_type == "remedie"] | order(title asc) [0...${limit}] {
    _id, title, "slug": slug.current, kernkwaliteit, werking,
    "imageUrl": image.asset->url
  }`,

  /** Alle gepubliceerde remedies */
  remedies: `*[_type == "remedie"] | order(title asc) {
    _id, title, "slug": slug.current, kernkwaliteit, werking, mantra,
    image, "imageUrl": image.asset->url,
    ontstaan, ingredienten, edelstenen
  }`,

  /** Eén remedie op slug */
  remedieBySlug: (slug: string) =>
    `*[_type == "remedie" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, kernkwaliteit, werking, mantra,
      image, "imageUrl": image.asset->url,
      ontstaan, ingredienten, edelstenen
    }`,

  /** Eén remedie op _id */
  remedieById: (id: string) =>
    `*[_type == "remedie" && _id == $id][0]{
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
    `*[_type == "blog" && slug.current == $slug][0]{
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
    `*[_type == "dienst" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, description, icon, mainImage, content,
      duration, price, seo
    }`,

  /** Testimonials / Ervaringen */
  testimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id, name, initials, quote, context, featured
  }`,

  /** Site-instellingen (singleton) */
  siteSettings: `*[_type == "siteSettings"][0]{
    title, description, contactInfo, socialMedia, openingHours
  }`,

  /** Pagina's */
  pages: `*[_type == "page"]{ _id, title, slug, sections }`,

  /** Eén pagina op slug */
  pageBySlug: (slug: string) =>
    `*[_type == "page" && slug.current == $slug][0]{
      _id, title, slug, sections
    }`,
}
