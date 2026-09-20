import { slugify } from "../../../utils/slugify";

export interface WorkItem {
  id: number;
  slug?: string;
  title: string;
  category: string;
  image: string;
  images: string[];
  description?: string;
  techstacks: string[];
  role: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  order?: number;
}

export const WORKS: WorkItem[] = [
  {
    id: 1,
    slug: "hrm-ess",
    title: "HRM ESS",
    category: "MOBILE APP / FLUTTER",
    image: "https://images.ctfassets.net/aefzh7reb8zp/3rR215F0T34v82S2VbO73k/81c817df0e78280145c26dbf58aa89c6/thumb1.jpg",
    images: ["https://images.ctfassets.net/aefzh7reb8zp/3rR215F0T34v82S2VbO73k/81c817df0e78280145c26dbf58aa89c6/thumb1.jpg"],
    description: "Enterprise Human Resource Management and Employee Self-Service platform with AI face authentication.",
    techstacks: ["FLUTTER", "NODEJS"],
    role: "Mobile Developer",
  },
  {
    id: 2,
    slug: "dg-sales-app",
    title: "DG Sales App",
    category: "MOBILE APP / REACT NATIVE",
    image: "https://images.ctfassets.net/aefzh7reb8zp/3rR215F0T34v82S2VbO73k/81c817df0e78280145c26dbf58aa89c6/thumb1.jpg",
    images: [],
    description: "Cross-platform enterprise sales & distribution management app.",
    techstacks: ["REACT NATIVE", "NODEJS"],
    role: "Mobile Developer",
  },
  {
    id: 3,
    slug: "my-sinar-jaya",
    title: "My Sinar Jaya",
    category: "MOBILE APP / FLUTTER",
    image: "https://images.ctfassets.net/aefzh7reb8zp/3rR215F0T34v82S2VbO73k/81c817df0e78280145c26dbf58aa89c6/thumb1.jpg",
    images: [],
    description: "Ticketing & booking application for transportation operations.",
    techstacks: ["FLUTTER", "NODEJS"],
    role: "Mobile Developer",
  },
  {
    id: 4,
    slug: "mootasi",
    title: "Mootasi",
    category: "FULLSTACK WEB / REACT",
    image: "https://images.ctfassets.net/aefzh7reb8zp/3rR215F0T34v82S2VbO73k/81c817df0e78280145c26dbf58aa89c6/thumb1.jpg",
    images: [],
    description: "Financial transaction mutation tracker and analytical dashboard.",
    techstacks: ["REACT", "NODEJS"],
    role: "Fullstack Developer",
  },
];

export const DUPLICATED_WORKS: WorkItem[] = [...WORKS, ...WORKS, ...WORKS, ...WORKS, ...WORKS, ...WORKS];

export function getWorkSlug(work: WorkItem, worksList: WorkItem[] = WORKS): string {
  if (work.slug) return work.slug;
  const baseSlug = slugify(work.title);
  const duplicates = worksList.filter(
    (w) => (w.slug || slugify(w.title)) === baseSlug,
  );
  if (duplicates.length > 1) {
    return `${baseSlug}-${work.id}`;
  }
  return baseSlug;
}

export function getWorkBySlug(slug: string, worksList: WorkItem[] = WORKS): WorkItem | undefined {
  return worksList.find((w) => {
    const workSlug = getWorkSlug(w, worksList);
    if (workSlug === slug) return true;
    const baseSlug = slugify(w.title);
    return slug === `${baseSlug}-${w.id}` || slug === String(w.id);
  });
}

export function getWorkLayoutId(work: WorkItem, setIndex: number = 0, worksList: WorkItem[] = WORKS): string {
  const itemIndexInSet = worksList.findIndex((w) => w.id === work.id);
  const targetIndex =
    (itemIndexInSet >= 0 ? itemIndexInSet : 0) + setIndex * worksList.length;
  return `hero-card-${work.id}-${targetIndex}`;
}

export function getSetIndexFromLayoutId(layoutId?: string, listLength: number = WORKS.length): number {
  if (!layoutId) return 0;
  const parts = layoutId.split("-");
  const indexStr = parts[parts.length - 1];
  const index = parseInt(indexStr, 10);
  if (isNaN(index) || listLength === 0) return 0;
  return Math.floor(index / listLength);
}
