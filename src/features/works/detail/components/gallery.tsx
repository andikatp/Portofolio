import { motion } from "framer-motion";
import { GALLERY_SIDEBAR_VARIANTS } from "../../animations/work-animations";

interface WorkDetailGalleryProps {
  images: string[];
  currentImageIndex: number;
  isContentReady: boolean;
  isClosing: boolean;
  onSelectImage: (index: number) => void;
}

export function WorkDetailGallery({
  images,
  currentImageIndex,
  isContentReady,
  isClosing,
  onSelectImage,
}: WorkDetailGalleryProps) {
  if (images.length <= 1) return null;

  const isReadyAndOpen = isContentReady && !isClosing;

  return (
    <motion.div
      variants={GALLERY_SIDEBAR_VARIANTS}
      initial="initial"
      animate={isReadyAndOpen ? "animate" : "initial"}
      custom={isReadyAndOpen}
      exit="exit"
      transition={{
        duration: isClosing ? 0.1 : 0.3,
        delay: isReadyAndOpen ? 0.1 : 0,
      }}
      className="flex flex-row xl:flex-col gap-2 justify-center items-center max-w-full overflow-x-auto xl:overflow-y-auto xl:max-h-[60vh] no-scrollbar py-1 xl:py-2 shrink-0 order-2 xl:order-3"
    >
      {images.map((img, idx) => {
        const isSelected = idx === currentImageIndex;
        return (
          <button
            key={idx}
            onClick={() => onSelectImage(idx)}
            className={`relative w-12 h-16 sm:w-14 sm:h-20 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer shrink-0 bg-slate-100 ${
              isSelected ? "opacity-100" : "opacity-40 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`Photo ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        );
      })}
    </motion.div>
  );
}
