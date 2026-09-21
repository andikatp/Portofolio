export const CARD_SIZE_CLASSES =
  "h-[30vh] min-h-[180px] max-h-[280px] sm:h-[38vh] sm:min-h-[260px] sm:max-h-[340px] md:h-[370px] lg:h-[430px] xl:h-[450px]";

export function MarqueeSkeleton() {
  return (
    <div className="w-full flex-1 min-h-0 flex flex-col justify-end overflow-hidden relative pointer-events-none select-none">
      <div className="flex w-max shrink-0 items-end space-x-[18px] sm:space-x-[18px] py-2 sm:py-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`marquee-skeleton-${i}`}
            className={`${CARD_SIZE_CLASSES} w-[90px] sm:w-[110px] md:w-[125px] lg:w-[142px] xl:w-[155px] bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl shrink-0 animate-pulse flex items-center justify-center`}
          >
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ))}
      </div>
    </div>
  );
}
