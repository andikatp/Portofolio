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

export const WORKS: WorkItem[] = [];

export const DUPLICATED_WORKS: WorkItem[] = [];

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
