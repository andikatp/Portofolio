import { LayoutGroup, useMotionValue, useSpring } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context";
import {
  getWorkBySlug,
  getWorkLayoutId,
  getWorkSlug,
  useWorks,
  WorkCursor,
  WorkDetailOverlay,
  WorkHeader,
  WorkInfoPanel,
  WorkMarquee,
  type WorkItem,
} from "./";

function WorkSection() {
  const { works, isLoading } = useWorks();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setIsModalOpen: setGlobalModalOpen } = useModal();
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const cursorX = useSpring(rawX, { damping: 24, stiffness: 280, mass: 0.4 });
  const cursorY = useSpring(rawY, { damping: 24, stiffness: 280, mass: 0.4 });

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<WorkItem | null>(null);

  const workFromSlug = slug ? getWorkBySlug(slug, works) : null;

  const [selectedWorkState, setSelectedWorkState] = useState<WorkItem | null>(
    null,
  );
  const [selectedLayoutIdState, setSelectedLayoutIdState] = useState<
    string | null
  >(null);

  const selectedWork = workFromSlug || selectedWorkState;
  const selectedLayoutId =
    selectedLayoutIdState ||
    (selectedWork ? getWorkLayoutId(selectedWork, 0, works) : null);
  const isModalOpen = Boolean(slug && workFromSlug);

  useEffect(() => {
    setGlobalModalOpen(isModalOpen);
  }, [isModalOpen, setGlobalModalOpen]);

  const handleExitComplete = useCallback(() => {
    setSelectedWorkState(null);
    setSelectedLayoutIdState(null);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      rawX.set(e.clientX - 64);
      rawY.set(e.clientY - 24);
    },
    [rawX, rawY],
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      rawX.set(e.clientX - 64);
      rawY.set(e.clientY - 24);
      setIsHovered(true);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setHoveredWork(null);
  }, []);

  const handleHoverWork = useCallback((work: WorkItem | null) => {
    setHoveredWork(work);
  }, []);

  const handleCloseModal = useCallback(() => {
    navigate("/works");
  }, [navigate]);

  const handleSelectWork = useCallback(
    (work: WorkItem, layoutId?: string) => {
      const workSlug = getWorkSlug(work, works);
      setSelectedWorkState(work);
      if (layoutId) {
        setSelectedLayoutIdState(layoutId);
      } else {
        setSelectedLayoutIdState(getWorkLayoutId(work, 0, works));
      }
      navigate(`/works/${workSlug}`);
    },
    [navigate, works],
  );

  return (
    <LayoutGroup id="work-gallery">
      <section className="flex flex-col w-full flex-1 min-h-0 gap-2">
        <WorkHeader />
        <WorkMarquee
          works={works}
          isLoading={isLoading}
          onHoverWork={handleHoverWork}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isPausedProp={isModalOpen || Boolean(selectedWork)}
          selectedLayoutId={selectedLayoutId}
          onSelectWork={handleSelectWork}
        />
        <WorkInfoPanel hoveredWork={hoveredWork} />
        <WorkCursor
          isHovered={isHovered && Boolean(hoveredWork)}
          x={cursorX}
          y={cursorY}
        />

        <WorkDetailOverlay
          isOpen={isModalOpen}
          selectedWork={selectedWork}
          selectedLayoutId={selectedLayoutId}
          onClose={handleCloseModal}
          onSelectWork={handleSelectWork}
          onExitComplete={handleExitComplete}
        />
      </section>
    </LayoutGroup>
  );
}

export default WorkSection;
