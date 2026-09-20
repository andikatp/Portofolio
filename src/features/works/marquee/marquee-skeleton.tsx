
export const CARD_SIZE_CLASSES =
  "h-[30vh] min-h-[180px] max-h-[280px] sm:h-[38vh] sm:min-h-[260px] sm:max-h-[340px] md:h-[370px] lg:h-[430px] xl:h-[450px]";

export function MarqueeSkeleton() {
  return (
    <div className="w-full overflow-hidden my-auto py-4 relative pointer-events-none select-none">
      <div className="flex w-max shrink-0 items-center space-x-[18px] sm:space-x-[18px] py-4 sm:py-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`marquee-skeleton-${i}`}
            className={`${CARD_SIZE_CLASSES} w-[220px] sm:w-[200px] md:w-[200px] lg:w-[200px] xl:w-[200px] bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl shrink-0 animate-pulse flex items-center justify-center`}
          >
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ))}
      </div>
    </div>
  );
}
