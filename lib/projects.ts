const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Project = {
  id: string;
  title: string;
  description: string;
  objectives: string;
  approach: string;
  results: string;
  imagePaths: string[];
};

export const projects: Project[] = [
  {
    id: "family-pergola-oasis-primorsko-goranska",
    title: "Family Pergola Oasis in Primorsko-goranska",
    description:
      "A sturdy wooden pergola that turned an exposed patio into a calm, shaded outdoor living room for a retired couple.",
    objectives:
      "Provide a relaxing, maintenance-light outdoor space where the homeowners could enjoy coffee and time with grandchildren without worrying about sun exposure or unstable structures.",
    approach:
      "Dimi Mont helped prioritize the project within a long repair list, proposed a pergola design that fit the existing house and garden, and handled all structural and finishing work with minimal disruption.",
    results:
      "A solid, beautifully finished pergola that felt immediately safe and welcoming. The homeowners reported spending significantly more time outside and worrying less about the elements.",
    imagePaths: [
      `${prefix}/project-images/project1-1.jpg`,
      `${prefix}/project-images/project1-2.jpg`,
    ],
  },
  {
    id: "safer-balcony-shutter-repair-zagreb",
    title: "Safer Balcony & Shutter Repair in Zagreb",
    description:
      "A balcony and shutter refresh that eliminated long-standing safety concerns for an older homeowner.",
    objectives:
      "Resolve unsafe balcony railings and sticking shutters that had become stressful reminders of unfinished repairs.",
    approach:
      "Dimi Mont inspected the balcony, replaced weakened elements, reinforced railings to modern safety expectations, and repaired or replaced aging shutters with minimal visual change to the facade.",
    results:
      "A balcony the homeowner once avoided became a comfortable place for everyday use. She reported sleeping better knowing the structure was safe.",
    imagePaths: [
      `${prefix}/project-images/project2-1.jpg`,
      `${prefix}/project-images/project2-2.jpg`,
    ],
  },
  {
    id: "coastal-facade-refresh-primorje",
    title: "Coastal Facade Refresh in Primorje",
    description:
      "Exterior maintenance and repainting that extended the life of a coastal home battered by storms and salt air.",
    objectives:
      "Protect the home exterior from further weather damage while improving curb appeal for a family preparing for retirement.",
    approach:
      "Dimi Mont repaired cracked plaster, treated exposed areas, and applied a weather-resistant coating and repainting system designed for coastal conditions.",
    results:
      "The house regained a clean, looked-after appearance and gained an extra layer of protection, reducing the stress of each new storm forecast.",
    imagePaths: [`${prefix}/project-images/project3-1.jpg`],
  },
  {
    id: "multi-room-interior-refresh-istria",
    title: "Multi-Room Interior Refresh in Istria",
    description:
      "A phased interior refresh focused on comfort, safety and easier everyday living for an older couple.",
    objectives:
      "Address a backlog of interior issues—tired finishes, awkward storage, uneven lighting—without overwhelming the homeowners or requiring a full gut renovation.",
    approach:
      "Dimi Mont planned the work in calm, manageable phases, updating surfaces, improving lighting and adjusting storage with special care for accessibility and ease of cleaning.",
    results:
      "The couple reported feeling more relaxed and proud to invite family over, noting that the home felt brighter, safer and easier to maintain.",
    imagePaths: [`${prefix}/project-images/project4-1.jpg`],
  },
];