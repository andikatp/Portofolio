import type { WorkItem } from "../data/work-data";

export const CARD_SIZE_CLASSES =
  "h-[28vh] min-h-[160px] max-h-[240px] sm:h-[34vh] sm:min-h-[220px] sm:max-h-[300px] md:h-[36vh] md:min-h-[250px] md:max-h-[340px] lg:h-[40vh] lg:min-h-[280px] lg:max-h-[390px] xl:h-[43vh] xl:min-h-[300px] xl:max-h-[420px] short-marquee-card";

export const SKELETON_WORKS: WorkItem[] = [
  { id: -1, title: "Loading...", category: "PROJECT", image: "", images: [], techstacks: [], role: "", aspectRatio: 1.4 },
  { id: -2, title: "Loading...", category: "PROJECT", image: "", images: [], techstacks: [], role: "", aspectRatio: 0.75 },
  { id: -3, title: "Loading...", category: "PROJECT", image: "", images: [], techstacks: [], role: "", aspectRatio: 1.6 },
  { id: -4, title: "Loading...", category: "PROJECT", image: "", images: [], techstacks: [], role: "", aspectRatio: 1.25 },
  { id: -5, title: "Loading...", category: "PROJECT", image: "", images: [], techstacks: [], role: "", aspectRatio: 0.8 },
  { id: -6, title: "Loading...", category: "PROJECT", image: "", images: [], techstacks: [], role: "", aspectRatio: 1.5 },
];
