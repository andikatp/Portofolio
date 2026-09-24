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

interface SkeletonCardProps {
  aspectRatio?: number;
  className?: string;
}

export function MarqueeSkeletonCard({ aspectRatio = 1.33, className = "" }: SkeletonCardProps) {
  return (
    <div
      className={`${CARD_SIZE_CLASSES} w-auto bg-slate-200/90 dark:bg-slate-800/90 rounded-2xl shrink-0 animate-pulse flex items-center justify-center relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-300 rounded-full animate-spin" />
    </div>
  );
}

export function MarqueeSkeleton() {
  return (
    <div className="w-full flex-1 min-h-0 flex flex-col justify-end overflow-hidden relative pointer-events-none select-none">
      <div className="flex w-max shrink-0 items-end space-x-8 sm:space-x-8 py-2 sm:py-4">
        {SKELETON_WORKS.concat(SKELETON_WORKS, SKELETON_WORKS, SKELETON_WORKS).map((item, i) => (
          <MarqueeSkeletonCard key={`static-skeleton-${i}`} aspectRatio={item.aspectRatio} />
        ))}
      </div>
    </div>
  );
}
