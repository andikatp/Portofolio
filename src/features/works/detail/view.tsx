import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Magnetic from "../../../components/ui/magnetic";
import { BACK_BUTTON_VARIANTS } from "../animations/work-animations";
import {
  getWorkBySlug,
  getWorkLayoutId,
  getWorkSlug,
  type WorkItem,
} from "../data/work-data";
import { useWorks } from "../hooks/use-works";
import { WorkDetailGallery } from "./components/gallery";
import { WorkDetailImageViewer } from "./components/image-viewer";
import { WorkDetailInfo } from "./components/info";
import { WorkDetailSelector } from "./components/selector";

interface WorkDetailViewProps {
  work?: WorkItem;
  layoutId?: string;
  onClose?: () => void;
  onSelectWork?: (work: WorkItem, layoutId?: string) => void;
}

export function WorkDetailView({
  work: propWork,
  layoutId,
  onClose,
  onSelectWork,
}: WorkDetailViewProps = {}) {
  const { works } = useWorks();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContentReady, setIsContentReady] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isInternalSwitch, setIsInternalSwitch] = useState(false);

  const work = propWork || (slug ? getWorkBySlug(slug, works) : undefined);

  const [prevWorkId, setPrevWorkId] = useState(work?.id);
  if (work?.id !== prevWorkId) {
    setPrevWorkId(work?.id);
    setCurrentImageIndex(0);
    setIsInternalSwitch(true);
    setIsContentReady(true);
    setIsClosing(false);
  }

  useEffect(() => {
    if (!isInternalSwitch) return;
    const timer = setTimeout(() => {
      setIsInternalSwitch(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isInternalSwitch]);

  useEffect(() => {
    if (isClosing || isInternalSwitch) return;
    const timer = setTimeout(() => {
      if (!isClosing) {
        setIsContentReady(true);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [work?.id, isClosing, isInternalSwitch]);

  const activeLayoutId =
    layoutId || (work ? getWorkLayoutId(work, 0, works) : undefined);

  const rawImages = work ? [work.image, ...(work.images || [])] : [];
  const images = Array.from(new Set(rawImages.filter(Boolean)));

  const handleClose = () => {
    setIsClosing(true);
    setIsContentReady(false);
    if (onClose) {
      onClose();
    } else {
      navigate("/works");
    }
  };

  if (!work) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 pt-24">
        <h1 className="text-2xl font-bold text-slate-900">Project Not Found</h1>
        <Magnetic strength={0.9}>
          <button
            onClick={handleClose}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Works</span>
          </button>
        </Magnetic>
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 py-4 sm:py-6 min-h-screen flex flex-col justify-between relative z-10">
      <Magnetic strength={0.9}>
        <motion.button
          variants={BACK_BUTTON_VARIANTS}
          initial="initial"
          animate="animate"
          custom={isClosing}
          exit="exit"
          transition={{ duration: isClosing ? 0.1 : 0.2 }}
          onClick={handleClose}
          className="p-2.5 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full hover:bg-gray-800 text-white transition-colors cursor-pointer select-none flex items-center justify-center shrink-0 mb-3 sm:mb-4 z-20"
          aria-label="Back to Works"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </Magnetic>

      <div className="flex flex-col xl:flex-row items-stretch xl:items-center flex-1 gap-6 xl:gap-8 w-full max-w-[1700px] mx-auto my-auto py-2 sm:py-4">
        <WorkDetailInfo
          work={work}
          isContentReady={isContentReady}
          isClosing={isClosing}
          isInternalSwitch={isInternalSwitch}
        />

        <WorkDetailImageViewer
          work={work}
          activeLayoutId={activeLayoutId || ""}
          images={images}
          currentImageIndex={currentImageIndex}
          isContentReady={isContentReady}
          isClosing={isClosing}
          isInternalSwitch={isInternalSwitch}
          onLayoutAnimationComplete={() => {
            if (!isClosing) {
              setIsContentReady(true);
            }
          }}
          onPrevImage={handlePrevImage}
          onNextImage={handleNextImage}
        />
        <WorkDetailGallery
          images={images}
          currentImageIndex={currentImageIndex}
          isContentReady={isContentReady}
          isClosing={isClosing}
          onSelectImage={(idx) => setCurrentImageIndex(idx)}
        />
      </div>

      <WorkDetailSelector
        currentWorkId={work.id}
        activeLayoutId={activeLayoutId || ""}
        isContentReady={isContentReady}
        isClosing={isClosing}
        works={works}
        onSelectWork={onSelectWork}
        onSelectInternal={(item) => {
          setCurrentImageIndex(0);
          navigate(`/works/${getWorkSlug(item, works)}`);
        }}
      />
    </div>
  );
}

export default WorkDetailView;
