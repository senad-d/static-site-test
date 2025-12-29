const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Localized = {
  en: string;
  hr: string;
};

export type Project = {
  id: string;
  title: Localized;
  description: Localized;
  objectives: Localized;
  approach: Localized;
  results: Localized;
  imagePaths: string[];
};

export const projects: Project[] = [
  {
    id: "family-pergola-oasis-primorsko-goranska",
    title: {
      en: "Family Pergola Oasis in Primorsko-goranska",
      hr: "Obiteljska pergola oaza u Primorsko-goranskoj",
    },
    description: {
      en: "A sturdy wooden pergola that turned an exposed patio into a calm, shaded outdoor living room for a retired couple.",
      hr: "Čvrsta drvena pergola koja je otvorenu terasu pretvorila u miran, zasjenjeni vanjski dnevni boravak za umirovljeni bračni par.",
    },
    objectives: {
      en: "Provide a relaxing, maintenance-light outdoor space where the homeowners could enjoy coffee and time with grandchildren without worrying about sun exposure or unstable structures.",
      hr: "Osigurati opuštajući, jednostavan za održavanje vanjski prostor u kojem vlasnici mogu uživati u kavi i vremenu s unucima bez brige o izloženosti suncu ili nestabilnim konstrukcijama.",
    },
    approach: {
      en: "Dimi Mont helped prioritize the project within a long repair list, proposed a pergola design that fit the existing house and garden, and handled all structural and finishing work with minimal disruption.",
      hr: "Dimi Mont je pomogao prioritizirati projekt unutar duge liste popravaka, predložio dizajn pergole koji se uklapa u postojeću kuću i vrt te izveo sve konstruktivne i završne radove uz minimalne smetnje.",
    },
    results: {
      en: "A solid, beautifully finished pergola that felt immediately safe and welcoming. The homeowners reported spending significantly more time outside and worrying less about the elements.",
      hr: "Čvrsta, lijepo dovršena pergola koja se odmah doimala sigurnom i ugodnom. Vlasnici su prijavili da provode znatno više vremena vani i manje brinu zbog vremenskih uvjeta.",
    },
    imagePaths: [
      `${prefix}/project-images/project1-1.jpg`,
      `${prefix}/project-images/project1-2.jpg`,
    ],
  },
  {
    id: "safer-balcony-shutter-repair-zagreb",
    title: {
      en: "Safer Balcony & Shutter Repair in Zagreb",
      hr: "Sigurniji balkon i popravak grilja u Zagrebu",
    },
    description: {
      en: "A balcony and shutter refresh that eliminated long-standing safety concerns for an older homeowner.",
      hr: "Obnova balkona i grilja koja je uklonila dugotrajne sigurnosne brige starije vlasnice.",
    },
    objectives: {
      en: "Resolve unsafe balcony railings and sticking shutters that had become stressful reminders of unfinished repairs.",
      hr: "Riješiti nesigurnu balkonsku ogradu i zapinjuće grilje koje su postale stalan podsjetnik na nedovršene popravke.",
    },
    approach: {
      en: "Dimi Mont inspected the balcony, replaced weakened elements, reinforced railings to modern safety expectations, and repaired or replaced aging shutters with minimal visual change to the facade.",
      hr: "Dimi Mont je pregledao balkon, zamijenio oslabljene dijelove, ojačao ogradu prema suvremenim sigurnosnim očekivanjima te popravio ili zamijenio dotrajale grilje uz minimalnu promjenu izgleda fasade.",
    },
    results: {
      en: "A balcony the homeowner once avoided became a comfortable place for everyday use. She reported sleeping better knowing the structure was safe.",
      hr: "Balkon kojeg je vlasnica prije izbjegavala postao je ugodno mjesto za svakodnevno korištenje. Navela je da mirnije spava znajući da je konstrukcija sigurna.",
    },
    imagePaths: [
      `${prefix}/project-images/project2-1.jpg`,
      `${prefix}/project-images/project2-2.jpg`,
    ],
  },
  {
    id: "coastal-facade-refresh-primorje",
    title: {
      en: "Coastal Facade Refresh in Primorje",
      hr: "Obnova obalne fasade u Primorju",
    },
    description: {
      en: "Exterior maintenance and repainting that extended the life of a coastal home battered by storms and salt air.",
      hr: "Vanjsko održavanje i ponovno bojanje koje je produžilo vijek kuće na obali izložene olujama i slanom zraku.",
    },
    objectives: {
      en: "Protect the home exterior from further weather damage while improving curb appeal for a family preparing for retirement.",
      hr: "Zaštititi vanjštinu kuće od daljnjih oštećenja od vremenskih utjecaja i istovremeno poboljšati izgled za obitelj koja se priprema za mirovinu.",
    },
    approach: {
      en: "Dimi Mont repaired cracked plaster, treated exposed areas, and applied a weather-resistant coating and repainting system designed for coastal conditions.",
      hr: "Dimi Mont je sanirao napuklu žbuku, obradio izložene površine te nanio sustav premaza otporan na vremenske utjecaje, prilagođen obalnim uvjetima.",
    },
    results: {
      en: "The house regained a clean, looked-after appearance and gained an extra layer of protection, reducing the stress of each new storm forecast.",
      hr: "Kuća je ponovno dobila uredan, njegovan izgled i dodatni sloj zaštite, što je smanjilo brigu pri svakoj novoj najavi nevremena.",
    },
    imagePaths: [`${prefix}/project-images/project3-1.jpg`],
  },
  {
    id: "multi-room-interior-refresh-istria",
    title: {
      en: "Multi-Room Interior Refresh in Istria",
      hr: "Obnova više prostorija u interijeru u Istri",
    },
    description: {
      en: "A phased interior refresh focused on comfort, safety and easier everyday living for an older couple.",
      hr: "Fazna obnova interijera usmjerena na udobnost, sigurnost i lakši svakodnevni život za stariji bračni par.",
    },
    objectives: {
      en: "Address a backlog of interior issues—tired finishes, awkward storage, uneven lighting—without overwhelming the homeowners or requiring a full gut renovation.",
      hr: "Riješiti niz unutarnjih problema — istrošene završne obrade, nezgodna spremišta, neujednačenu rasvjetu — bez preopterećivanja vlasnika ili potrebe za potpunim rušenjem i renovacijom.",
    },
    approach: {
      en: "Dimi Mont planned the work in calm, manageable phases, updating surfaces, improving lighting and adjusting storage with special care for accessibility and ease of cleaning.",
      hr: "Dimi Mont je isplanirao radove u mirnim, izvedivim fazama, osvježio površine, poboljšao rasvjetu i prilagodio spremišta s posebnom pažnjom na pristupačnost i jednostavno čišćenje.",
    },
    results: {
      en: "The couple reported feeling more relaxed and proud to invite family over, noting that the home felt brighter, safer and easier to maintain.",
      hr: "Par je naveo da se osjeća opuštenije i ponosnije pozvati obitelj u posjet, ističući da dom izgleda svjetlije, sigurnije i lakši je za održavanje.",
    },
    imagePaths: [`${prefix}/project-images/project4-1.jpg`],
  },
];