import type { Lang } from "@/lib/i18n";
type Localized = Record<Lang, string>;
export type Project = {
  slug: string; title: string; location: string; year: string; area: string;
  category: Localized; scope: Localized; excerpt: Localized;
  description: Record<Lang, string[]>; hero: string; gallery: string[];
};
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const image = (level: string, file: string) => `${basePath}/images/projects/as/${level}/${file}.webp`;
function section(level: string, title: string, hero: string, gallery: string[], excerpt: Localized, description: Record<Lang, string[]>): Project {
  return {slug:`as-${level}`,title,location:"Switzerland",year:"",area:"",
    category:{en:"Residential interiors",sq:"Enterier banimi"},scope:{en:"Interior design · Architectural visualization",sq:"Dizajn enterieri · Vizualizim arkitektonik"},
    excerpt,description,hero:image(level,hero),gallery:gallery.map(file=>image(level,file))};
}
// Related level studies from AS_Renderat, not invented separate commissions.
// Country confirmed by the studio; completion date and area remain unspecified.
export const projects: Project[] = [
  section("perdhese","AS — Përdhesë","03",["04","07","09","11","12","14","17","19","21"],{
    en:"An open living space in warm timber and soft neutrals, with quieter rooms unfolding beyond.",
    sq:"Një hapësirë e hapur jetese me dru të ngrohtë dhe tone të buta, e plotësuar nga dhoma më të qeta."}, {
    en:["The ground-floor study brings living, dining and kitchen spaces into one visual sequence. Timber cabinetry, pale surfaces and generous curtains create a consistent backdrop, while sculptural seating and carefully placed lighting give each area its own character.","Bedrooms continue the restrained palette through built-in wardrobes and compact workspaces. Stone-toned bathrooms and a furnished terrace extend the material language into the more private and outdoor spaces. These images present the AS scheme as architectural visualizations."],
    sq:["Studimi i përdhesës lidh qëndrimin, ngrënien dhe kuzhinën në një sekuencë të vetme vizuale. Mobiliet prej druri, sipërfaqet e çelëta dhe perdet e gjera krijojnë një sfond të njëtrajtshëm, ndërsa ulëset skulpturore dhe ndriçimi i vendosur me kujdes i japin karakter secilës zonë.","Dhomat e gjumit vazhdojnë paletën e përmbajtur përmes dollapëve të integruar dhe këndeve kompakte të punës. Banjat me tone guri dhe tarraca e mobiluar e zgjerojnë këtë gjuhë materiale në hapësirat private dhe të jashtme. Imazhet e paraqesin skemën AS përmes vizualizimeve arkitektonike."]}),
  section("suteren","AS — Suteren","04",["01","07","08","09","11","13","14.1","21","25"],{
    en:"Soft daylight, curved furniture and a warm material palette bring a residential level into focus.",
    sq:"Drita e butë, mobiliet e lakuara dhe një paletë e ngrohtë materialesh përcaktojnë këtë nivel banimi."}, {
    en:["The suteren study is organised around a generous living and dining setting. Full-height curtains soften the light, while timber joinery, upholstered seating and a pale kitchen island establish a calm rhythm across the shared spaces.","The same attention continues through bedrooms, dressing areas and bathrooms: integrated storage, rounded mirrors and precise lighting keep the spaces coherent without making every room identical. The terrace offers an outdoor setting within the same AS residential scheme."],
    sq:["Studimi i suterenit përqendrohet në një hapësirë të gjerë qëndrimi dhe ngrënieje. Perdet në lartësi të plotë e zbusin dritën, ndërsa punimet prej druri, ulëset e veshura dhe ishulli i çelët i kuzhinës krijojnë një ritëm të qetë mes hapësirave të përbashkëta.","E njëjta vëmendje vazhdon në dhomat e gjumit, këndet e veshjes dhe banjat: ruajtja e integruar, pasqyrat e rrumbullakosura dhe ndriçimi i saktë i mbajnë hapësirat të lidhura pa i bërë të njëjta. Tarraca ofron një ambient të jashtëm brenda së njëjtës skemë banimi AS."]}),
  section("kati-1","AS — Kati 1","06",["03","07","10","12","15","17","21","23","28","35"],{
    en:"A sharper interplay of charcoal, pale cabinetry and graphic art gives the first-floor interiors a distinct character.",
    sq:"Ndërthurja e antracitit, mobilieve të çelëta dhe artit grafik i jep enterierit të katit të parë karakter të veçantë."}, {
    en:["The first-floor study introduces a stronger contrast into the AS palette. Dark seating and kitchen elements sit against pale joinery and timber flooring; graphic artwork and slender lighting fittings punctuate the open living and dining areas.","Bedrooms and workspaces use fitted cabinetry to keep their layouts clear. Stone surfaces, softly shaped mirrors and freestanding bath forms give the bathrooms a quieter register, while the terrace carries the living spaces outdoors."],
    sq:["Studimi i katit të parë sjell kontrast më të fortë në paletën AS. Ulëset e errëta dhe elementet e kuzhinës vendosen përballë mobilieve të çelëta dhe dyshemesë prej druri; arti grafik dhe ndriçuesit e hollë theksojnë zonat e hapura të qëndrimit dhe ngrënies.","Dhomat e gjumit dhe këndet e punës përdorin mobilie të integruara për ta mbajtur organizimin të pastër. Sipërfaqet e gurta, pasqyrat me forma të buta dhe vaskat e lira u japin banjave ton më të qetë, ndërsa tarraca e vazhdon jetesën jashtë."]}),
  section("kati-2","AS — Kati 2","02",["03","07","08","12","14","17","20","21","26","27"],{
    en:"Cream upholstery, pale timber and integrated lighting shape a bright, continuous residential interior.",
    sq:"Ulëset krem, druri i çelët dhe ndriçimi i integruar formojnë një enterier banimi të ndritshëm e të lidhur."}, {
    en:["The second-floor study takes a lighter approach to the AS interiors. Cream seating, timber flooring and full-height curtains tie the living room to the dining area and kitchen. Integrated shelving and warm linear lighting give the joinery depth without visual clutter.","Private rooms combine generous wardrobes with small dressing and work areas. Bathrooms retain the pale material palette, while the terrace provides a clear view of the surrounding landscape. The series documents an interior design proposal rather than verified built photography."],
    sq:["Studimi i katit të dytë sjell një qasje më të çelët në enterieret AS. Ulëset krem, dyshemeja prej druri dhe perdet në lartësi të plotë lidhin qëndrimin me ngrënien dhe kuzhinën. Raftet e integruara dhe ndriçimi linear i ngrohtë u japin thellësi mobilieve pa ngarkesë vizuale.","Hapësirat private ndërthurin dollapë të gjerë me kënde veshjeje dhe pune. Banjat ruajnë paletën e çelët, ndërsa tarraca hap pamjen drejt peizazhit përreth. Seria dokumenton një propozim të dizajnit të enterierit, jo fotografi të verifikuara të realizimit."]}),
  section("bodrum","AS — Bodrum","03",["02-clean"],{
    en:"A considered utility level where storage, laundry and everyday tasks are given a clear place.",
    sq:"Një nivel funksional ku ruajtja, lavanderia dhe detyrat e përditshme kanë vend të qartë."}, {
    en:["The basement study gives practical spaces the same design attention as the living areas. A modular shelving wall groups household storage into a clear system, while the laundry setting combines a sink, suspended drying rails and a dedicated work surface.","A restrained neutral palette keeps these compact rooms visually calm. Their value lies in organisation and usability: spaces designed to support the daily life of the wider AS residential scheme."],
    sq:["Studimi i bodrumit u jep hapësirave praktike të njëjtën vëmendje si zonave të jetesës. Një mur me rafte modulare organizon ruajtjen shtëpiake, ndërsa lavanderia ndërthur lavamanin, shinat e varura për tharje dhe një sipërfaqe të dedikuar pune.","Një paletë e përmbajtur neutrale i mban këto dhoma kompakte vizualisht të qeta. Vlera e tyre qëndron në organizim dhe përdorshmëri: hapësira që mbështesin jetën e përditshme të skemës së banimit AS."]}),
];
export function getProject(slug:string){return projects.find(project=>project.slug===slug);}
export function getAdjacentProjects(slug:string){const index=projects.findIndex(project=>project.slug===slug);return {prev:projects[(index-1+projects.length)%projects.length],next:projects[(index+1)%projects.length]};}
