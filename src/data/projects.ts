import type { Lang } from "@/lib/i18n";

type Localized = Record<Lang, string>;
type LocalizedList = Record<Lang, string[]>;

export type Project = {
  slug: string;
  title: string; // proper noun — same in both languages
  location: string; // proper noun
  year: string;
  area: string;
  category: Localized;
  scope: Localized;
  excerpt: Localized;
  description: LocalizedList;
  hero: string;
  gallery: string[];
};

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const projects: Project[] = [
  {
    slug: "hilltop-residence",
    title: "Hilltop Residence",
    location: "Prishtina",
    year: "2025",
    area: "420 m²",
    category: { en: "Residential", sq: "Banim" },
    scope: { en: "Architecture, Interior", sq: "Arkitekturë, Enterier" },
    excerpt: {
      en: "A family home carved into the slope — three stacked volumes that frame the valley below.",
      sq: "Një shtëpi familjare e gdhendur në shpat — tre vëllime të mbivendosura që kornizojnë luginën poshtë.",
    },
    description: {
      en: [
        "Set on a steep plot above the city, the Hilltop Residence resolves a difficult site into its greatest asset. Three concrete volumes step down the slope, each rotated slightly to capture a different fragment of the panorama.",
        "Inside, the section does the work: living spaces flow across half-levels, connected by a continuous light well that pulls the afternoon sun deep into the plan. Materials are kept deliberately quiet — board-formed concrete, smoked oak, and blackened steel — so the view remains the loudest element in every room.",
      ],
      sq: [
        "E vendosur në një parcelë të pjerrët mbi qytet, Hilltop Residence e kthen një vendndodhje të vështirë në pasurinë e saj më të madhe. Tre vëllime betoni zbresin shkallë-shkallë në shpat, secili i rrotulluar lehtë për të kapur një fragment të ndryshëm të panoramës.",
        "Brenda, prerja bën punën: hapësirat e jetesës rrjedhin nëpër gjysmë-nivele, të lidhura nga një pus drite i vazhdueshëm që e tërheq diellin e pasdites thellë në plan. Materialet mbahen qëllimisht të qeta — beton i derdhur me dërrasa, lis i tymosur dhe çelik i nxirë — që pamja të mbetet elementi më i zëshëm në çdo dhomë.",
      ],
    },
    hero: u("photo-1600585154340-be6161a56a0c", 2200),
    gallery: [
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1512917774080-9991f1c4c750"),
    ],
  },
  {
    slug: "mono-house",
    title: "Mono House",
    location: "Peja",
    year: "2024",
    area: "265 m²",
    category: { en: "Residential", sq: "Banim" },
    scope: { en: "Architecture, Landscape", sq: "Arkitekturë, Peizazh" },
    excerpt: {
      en: "A single dark monolith in an orchard — one material, one gesture, no noise.",
      sq: "Një monolit i vetëm i errët në një pemishte — një material, një gjest, pa zhurmë.",
    },
    description: {
      en: [
        "Mono House began with a restriction the clients set themselves: one material, inside and out. The answer is a charred-timber monolith that sits low in an old apple orchard, its silhouette deliberately archetypal — a child's drawing of a house, executed with obsessive precision.",
        "Every opening is placed against a tree, so that each room owns a single, specific view. The interior is lined in pale ash, a bright inversion of the dark shell, and the detailing throughout is reduced until nothing remains but proportion and light.",
      ],
      sq: [
        "Mono House nisi me një kufizim që klientët ia vunë vetes: një material, brenda dhe jashtë. Përgjigjja është një monolit prej druri të djegur që rri ulët në një pemishte të vjetër mollësh, silueta e tij qëllimisht arketipale — vizatimi i një fëmije për një shtëpi, i realizuar me përpikëri obsesive.",
        "Çdo hapje vendoset përballë një peme, që secila dhomë të zotërojë një pamje të vetme, specifike. Enterieri është veshur me frashër të çelët, një përmbysje e ndritshme e guaskës së errët, dhe detajimi kudo është reduktuar derisa nuk mbetet asgjë veç proporcionit dhe dritës.",
      ],
    },
    hero: u("photo-1545324418-cc1a3fa10c00", 2200),
    gallery: [
      u("photo-1513584684374-8bab748fbf90"),
      u("photo-1600210492486-724fe5c67fb0"),
      u("photo-1600585154526-990dced4db0d"),
    ],
  },
  {
    slug: "atrium-workspace",
    title: "Atrium Workspace",
    location: "Tirana",
    year: "2024",
    area: "1,150 m²",
    category: { en: "Commercial", sq: "Komerciale" },
    scope: {
      en: "Architecture, Workplace Design",
      sq: "Arkitekturë, Dizajn i Vendit të Punës",
    },
    excerpt: {
      en: "An introverted office block opened up around a four-storey planted atrium.",
      sq: "Një bllok zyrash introvert i hapur rreth një atriumi katërkatësh të mbjellë.",
    },
    description: {
      en: [
        "A 1980s office block with deep, dark floor plates was the unlikely starting point for Atrium Workspace. Rather than fight the building's depth, the project cuts a four-storey void through its centre and fills it with planting, daylight, and circulation.",
        "Workspaces wrap the atrium behind full-height glazing, so every desk reads as a balcony onto an interior garden. The original concrete structure is left exposed and unapologetic, set against precise steel and glass insertions in the practice's characteristic restraint.",
      ],
      sq: [
        "Një bllok zyrash i viteve 1980 me pllaka kati të thella e të errëta ishte pikënisja e papritur për Atrium Workspace. Në vend që të luftonte thellësinë e ndërtesës, projekti pret një zbrazëti katërkatëshe nëpër qendrën e saj dhe e mbush me gjelbërim, dritë dite dhe qarkullim.",
        "Hapësirat e punës mbështjellin atriumin pas xhamave në lartësi të plotë, kështu që çdo tavolinë lexohet si një ballkon mbi një kopsht të brendshëm. Struktura origjinale e betonit lihet e zhveshur dhe pa kërkim faljeje, e vendosur përballë futjeve precize prej çeliku e xhami në përmbajtjen karakteristike të studios.",
      ],
    },
    hero: u("photo-1497366754035-f200968a6e72", 2200),
    gallery: [
      u("photo-1497366811353-6870744d04b2"),
      u("photo-1604328698692-f76ea9498e76"),
      u("photo-1431576901776-e539bd916ba2"),
    ],
  },
  {
    slug: "linea-gallery",
    title: "Linea Gallery",
    location: "Prizren",
    year: "2023",
    area: "680 m²",
    category: { en: "Cultural", sq: "Kulturore" },
    scope: {
      en: "Architecture, Exhibition Design",
      sq: "Arkitekturë, Dizajn Ekspozite",
    },
    excerpt: {
      en: "A contemporary gallery threaded through the stone shell of an Ottoman-era warehouse.",
      sq: "Një galeri bashkëkohore e endur nëpër guaskën prej guri të një depoje të epokës osmane.",
    },
    description: {
      en: [
        "Linea Gallery occupies a stone warehouse that had stood empty for thirty years. The intervention is a single continuous line — a white steel ramp that climbs through the building, carrying visitors past artworks hung against the raw stone walls.",
        "Old and new never touch: the ramp floats on slender columns, and every junction is shadow-gapped, so the original shell remains legible as a found object. At night the insertion glows through the openings like a lantern inside a ruin.",
      ],
      sq: [
        "Linea Gallery zë një depo guri që kishte qëndruar bosh për tridhjetë vjet. Ndërhyrja është një vijë e vetme e vazhdueshme — një rampë e bardhë çeliku që ngjitet nëpër ndërtesë, duke i çuar vizitorët pranë veprave të varura përballë mureve të papërpunuara prej guri.",
        "E vjetra dhe e reja nuk preken kurrë: rampa noton mbi shtylla të holla, dhe çdo bashkim ka hapësirë hije, kështu që guaska origjinale mbetet e lexueshme si një objekt i gjetur. Natën, futja shkëlqen nëpër hapje si një fanar brenda një rrënoje.",
      ],
    },
    hero: u("photo-1488972685288-c3fd157d7c7a", 2200),
    gallery: [
      u("photo-1487958449943-2429e8be8625"),
      u("photo-1493397212122-2b85dda8106b"),
      u("photo-1486718448742-163732cd1544"),
    ],
  },
  {
    slug: "veranda-restaurant",
    title: "Veranda Restaurant",
    location: "Prishtina",
    year: "2023",
    area: "340 m²",
    category: { en: "Hospitality", sq: "Mikpritje" },
    scope: { en: "Interior Architecture", sq: "Arkitekturë Enterieri" },
    excerpt: {
      en: "A dining room built around fire, brass, and a nine-metre cantilevered terrace.",
      sq: "Një sallë ngrënieje e ndërtuar rreth zjarrit, bronzit dhe një tarrace nëntëmetërshe konzolë.",
    },
    description: {
      en: [
        "Veranda restores the theatre of cooking to the centre of the dining experience. The kitchen sits on a raised plinth in the middle of the room, wrapped in a brass counter that patinates a little more with every service.",
        "The defining move is structural: a nine-metre terrace cantilevers over the street below, held by two concealed steel beams, giving diners the sensation of eating in mid-air above the city's evening traffic.",
      ],
      sq: [
        "Veranda e kthen teatrin e gatimit në qendër të përvojës së ngrënies. Kuzhina rri mbi një piedestal të ngritur në mes të sallës, e mbështjellë me një banak bronzi që patinohet pak më shumë me çdo shërbim.",
        "Lëvizja përcaktuese është strukturore: një tarracë nëntëmetërshe del konzolë mbi rrugën poshtë, e mbajtur nga dy trarë çeliku të fshehur, duke u dhënë ngrënësve ndjesinë e të ngrënit në ajër mbi trafikun e mbrëmjes së qytetit.",
      ],
    },
    hero: u("photo-1517248135467-4c7edcad34c4", 2200),
    gallery: [
      u("photo-1559339352-11d035aa65de"),
      u("photo-1414235077428-338989a2e8c0"),
      u("photo-1466978913421-dad2ebd01d17"),
    ],
  },
  {
    slug: "tower-nine",
    title: "Tower Nine",
    location: "Prishtina",
    year: "2022",
    area: "8,400 m²",
    category: { en: "Mixed-Use", sq: "Përdorim i Përzier" },
    scope: { en: "Architecture, Façade Design", sq: "Arkitekturë, Dizajn Fasade" },
    excerpt: {
      en: "A nine-storey corner tower whose staggered balconies turn regulation into rhythm.",
      sq: "Një kullë qoshe nëntëkatëshe ballkonet e shkallëzuara të së cilës e kthejnë rregulloren në ritëm.",
    },
    description: {
      en: [
        "Tower Nine takes the city's most generic brief — retail below, apartments above — and answers it with a façade of staggered concrete balconies that shift half a bay on every floor. The rule is simple; the resulting rhythm never repeats.",
        "The staggering is not decoration. Each shift gives a balcony double height, planting depth, and shade for the apartment below, turning the building's skin into its environmental strategy and its identity at once.",
      ],
      sq: [
        "Tower Nine merr detyrën më gjenerike të qytetit — dyqane poshtë, banesa lart — dhe i përgjigjet me një fasadë ballkonesh betoni të shkallëzuara që zhvendosen gjysmë hapësire në çdo kat. Rregulli është i thjeshtë; ritmi që del nuk përsëritet kurrë.",
        "Shkallëzimi nuk është dekorim. Çdo zhvendosje i jep një ballkoni lartësi të dyfishtë, thellësi për mbjellje dhe hije për banesën poshtë, duke e kthyer lëkurën e ndërtesës njëkohësisht në strategjinë e saj mjedisore dhe identitetin e saj.",
      ],
    },
    hero: u("photo-1449157291145-7efd050a4d0e", 2200),
    gallery: [
      u("photo-1479839672679-a46483c0e7c8"),
      u("photo-1496307653780-42ee777d4833"),
      u("photo-1452626212852-811d58933cae"),
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
