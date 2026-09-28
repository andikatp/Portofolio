import { CARD_SIZE_CLASSES, SKELETON_WORKS } from "./marquee-constants";

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
