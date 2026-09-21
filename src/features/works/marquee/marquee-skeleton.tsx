export const CARD_SIZE_CLASSES =
  "h-[28vh] min-h-[160px] max-h-[240px] sm:h-[34vh] sm:min-h-[220px] sm:max-h-[300px] md:h-[36vh] md:min-h-[250px] md:max-h-[340px] lg:h-[40vh] lg:min-h-[280px] lg:max-h-[390px] xl:h-[43vh] xl:min-h-[300px] xl:max-h-[420px] short-marquee-card";

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
