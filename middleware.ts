import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Blog post slugs die moeten worden doorverwezen naar /nieuws/
// Deze lijst is gegenereerd vanuit de WordPress import
const blogSlugs = new Set([
  '4-mei-2014-prana-beauty-health-te-gast-bij-meerradio',
  '19-9-2013-in-zwolle-lezing-over-spirituele-bloesemremedie-reis-naar-alaska',
  '23-maart-earth-hour-doe-je-mee',
  '29-10-2013-lezing-over-bloesemremedie-reis-naar-alaska',
  '5-feiten-over-hoe-kinderen-leren-en-hoe-jij-ze-kunt-helpen-focussen',
  '5-praktische-voorbeelden-van-de-toepassing-van-bloesemremedies',
  '5-tips-gebruik-etherische-olien',
  'blog-5-reden-om-jezelf-niet-met-anderen-te-vergelijken',
  '8-tips-voor-meer-tijd-voor-jezelf',
  'back-to-school-tips-gebruik-bloesemremedies',
  'bekijk-de-compilatie-van-het-groene-loper-festival',
  'beter-slapen-met-celzouten-en-bloesemremedies',
  'bloesemedelsteenremedie-travel-ease-bij-vliegreizen',
  'bloesemremedies-bij-zwangerschap',
  'bloesemremedies-en-celzouten-ook-voor-je-huisdier',
  'bloesemremedies-gebruiken-in-ruimtes',
  'bloesemremedies-kiezen-met-de-alaskan-essences-flower-energy-cards',
  'bloesemremedies-die-helpen-bij-het-omgaan-met-boosheid',
  'bloesemremedies-voor-deze-onrustige-tijd',
  'bloesemremedies-voor-kinderen',
  'ontdek-de-kracht-van-bloesemremedies-een-interview-met-sandy',
  'cadeautip-edelsteenhart-rozenkwarts',
  'celzout-nr-7-magnesium-phosphoricum-de-hete-7',
  'celzouten-bij-examenstress',
  'puistjes-pukkeltjes-en-meeeters-seborive-creme',
  'creatief-met-extern-gebruik-van-remedies',
  'dandelion-meer-dan-alleen-een-onkruid',
  'de-kracht-van-bloesemremedies-mijn-persoonlijke-ervaring',
  'de-werking-van-bloesemremedies-bij-angst',
  'blog-do-it-anyway',
  'celzoutenmengsel-voor-energie',
  'eerst-jij-waarom-echte-rust-begint-bij-je-zenuwstelsel',
  'essentiele-olien-in-de-keuken',
  'essentiele-olien-voor-onderweg',
  'fun-flyer-no-impact-week-2013',
  'filmpje-walvis-op-hawai',
  'blog-geven-en-ontvangen',
  'groene-lintje-voor-sandy-hof-van-prana-beauty-health',
  'groene-loper-festival-zondag-29-juni-2014-hoofddorp',
  'heerlijke-primavera-geurmengsels-voor-kerstmis',
  'het-gebruik-van-bloesemremedies-in-het-voorjaar',
  'nieuw-aromavernevelaar-feel-happy-primavera',
  'hooikoorts-en-allergieen-verlicht-je-klachten-op-natuurlijke-manier-met-celzouten',
  'help-je-huisdier-ontspannen-tijdens-oud-nieuw',
  'hulp-bij-de-winterdip',
  'loving-memory-steve-johnson',
  'blog-bent-mooi-bent-lief-bent-geweldig',
  'ben-je-uitgeput-of-moe-hoe-is-je-bescherming',
  'kom-naar-gratis-filmvertoning-no-impact-man-op-7-maart-in-nieuw-vennep',
  'lees-mijn-verhaal-bloesemremedies-van-burn-out-naar-bloei',
  'lente-voorjaarsschoonmaak-met-remedies',
  'lezing-bloesemremedie-reis-alaska-8-januari-2014-zwolle',
  '4520-2',
  'ondersteun-je-darmen-met-celzouten-en-bloesemremedies',
  'maandag-26-8-2013-lezing-spirituele-bloesemremedie-reis-naar-alaska',
  'maart-tijd-om-je-energie-te-herstellen',
  'met-gekleurde-kralen-lukte-het-wel',
  'mijn-favoriet-clean-air-airspray',
  'minerale-olien-en-plantaardige-olien',
  'naar-alaska',
  'natuurlijke-helpers-bij-pms-klachten',
  'nieuw-in-assortiment-lovea-bio-zoncosmetica',
  'nieuw-sonnenmineral-mengsel-verkrijgbaar-sportmengsel',
  'nieuw-bij-prana-beauty-health-alaska-omgevingsremedies',
  'nieuw-bij-prana-beauty-health-alaska-edelsteenremedies',
  'nieuw-alaskan-essences-sprays-go-create-en-beyond-words',
  'nieuwe-remedie-gemaakt-op-hawaii-regenbooglicht',
  'nieuwe-remedie-op-8-8-8-liefde',
  'nieuwe-remedie-gemaakt-stroming',
  'nu-verkrijgbaar-primavera-airsprays-100-natuurlijk',
  'ondersteuning-fireweed-combo-in-tijden-van-verandering-transformatie-en-vernieuwing',
  'ondersteuning-bij-stressvolle-momenten',
  'celzouten-mengsel-studeren-en-school',
  'ondersteuning-van-bloesemremedies-om-te-doen-wat-je-echt-wilt',
  'ontdek-de-kracht-van-je-menstruatiecyclus-gratis-cycluskaarten',
  'oproep-vrijwilligers-gezocht-voor-de-rolstoel4daagse-hoofddorp',
  'optimale-ondersteuning-bij-je-eindexamen',
  'prana-ambassadeur-no-impact-week-10-tm-17-maart-2013',
  'prana-beauty-health-zamelt-telefoons-in-voor-goede-doel',
  'primavera-airspray-goed-humeur',
  'uitgelicht-primavera-biologische-zaadolien',
  'reizen-zonder-vliegangst-en-jetlag-dit-helpt',
  'calling-all-angels-combinatie-remedie-bij-slaap-problemen',
  'slimmer-leren-minder-stress-tijdens-de-toetsweken',
  'nieuw-sonnenmineral-mengsel-voor-pollen',
  'eerste-hulp-bij-stress-soul-support',
  'stress-of-traumatische-situatie-soul-support-eerste-hulp-remedie',
  'succesvolle-lezing-amsterdam-bloesemremedie-reis-alaska',
  'te-gast-bij-meerradio-op-9-10-2014-dag-van-de-duurzaamheid',
  'terug-naar-school-met-focus-vertrouwen-en-rust',
  'telepathy-tapes-een-podcast-die-je-kijk-op-waarnemen-verandert',
  'beauty-tip-drink-voldoende-water',
  'tip-easy-learning-remedie-spray-voor-het-nieuwe-schooljaar',
  'mijn-favoriet-travel-ease-reisremedie',
  'uitgelicht-combinatie-remedie-go-create',
  'uitwendig-gebruik-bloesemremedies-muurverf',
  'sting-away-celzouten-creme-bij-insectenbeet-kwallenbeet',
  'vakantie-zonder-stress-bloesemremedies-celzouten-voor-een-ontspannen-reis',
  'vanaf-hier-wordt-het-weer-lichter',
  'veelgestelde-vragen-over-bloesemremedies',
  'veelgestelde-vragen-over-remedies-en-celzouten',
  'vergroot-de-eigenwaarde-van-je-kind-met-remedies',
  'vermoeid-overweldigd-en-somber-ondersteuning-van-lighten-up-remedie',
  'vermoeidheid-de-baas-praktische-tips-voor-meer-energie',
  '12-me-lezing-schussler-celzouten-noordwijk',
  'waarom-zijn-edelsteenremedies-belangrijk',
  'waarom-zijn-edelsteenremedies-belangrijk-2',
  'wat-zijn-bloesemremedies-en-hoe-kunnen-ze-jou-en-je-kind-helpen',
  'wonderen-bestaan',
  'workshop-van-steve-johnson',
  'zondag-28-juni-groene-loper-festival-hoofddorp',
])

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verwijder leading slash voor vergelijking
  const slug = pathname.slice(1)

  // Check of dit een blog post slug is die redirect nodig heeft
  if (blogSlugs.has(slug)) {
    const url = request.nextUrl.clone()
    url.pathname = `/nieuws/${slug}`
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

// Configureer welke paden de middleware moet checken
export const config = {
  matcher: [
    // Match alle paden behalve:
    // - API routes
    // - Static files
    // - _next internals
    // - Bekende routes (/, /nieuws, /remedies, /producten, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|studio|nieuws|remedies|producten|contact|over-mij|ervaringen|tarieven|gratis-magazine|privacy-en-disclaimer).*)',
  ],
}
