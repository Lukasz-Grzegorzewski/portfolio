import React, { useRef, useState, useEffect } from "react";
import { ProjectCardMobile } from "./ProjectCardMobile";
import { ProjectType } from "@src/types/project.type";
import { useProjectDetailsContext } from "@src/contexts/ProjectDetailsContext";

type CarouselMobileProps = {
  projects: ProjectType[];
};

export const CarouselMobile = ({ projects }: CarouselMobileProps) => {
  const { openModal } = useProjectDetailsContext();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  // Set initial translate to center first card
  useEffect(() => {
    if (carouselRef.current && cardRefs.current[0]) {
      const cardWidth = cardRefs.current[0].offsetWidth;
      const computedGap =
        Number.parseFloat(getComputedStyle(carouselRef.current).gap) || 0;
      setTranslateX(window.innerWidth / 2 - (cardWidth + computedGap) / 2);
    }
  }, []);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diffX = clientX - startX;
    setTranslateX((prev) => prev + diffX);
    setStartX(clientX);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (!carouselRef.current || cardRefs.current.length === 0) return;

    const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
    const computedGap =
      Number.parseFloat(getComputedStyle(carouselRef.current).gap) || 0;
    const totalCardWidth = cardWidth + computedGap;

    const newIdx = Math.round(
      (window.innerWidth / 2 - translateX) / totalCardWidth,
    );
    const clampedIdx = Math.max(0, Math.min(projects.length - 1, newIdx));

    setCurrentIndex(clampedIdx);
    setTranslateX(
      window.innerWidth / 2 - clampedIdx * totalCardWidth - cardWidth / 2,
    );
  };

  const handleClick = (index: number) => {
    if (index === currentIndex) {
      openModal(projects[index].name);
    }
    const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
    const computedGap = carouselRef.current
      ? Number.parseFloat(getComputedStyle(carouselRef.current).gap) || 0
      : 0;
    const totalCardWidth = cardWidth + computedGap;

    setCurrentIndex(index);
    setTranslateX(
      window.innerWidth / 2 - index * totalCardWidth - cardWidth / 2,
    );
  };

  function handleTest(index: number) {
    console.log("index", index);
    console.log("currentIndex", currentIndex);

    return index === currentIndex
      ? { transform: "scale(1.05) translateY(-0.5rem)" }
      : {};
  }

  return (
    <div
      className="relative overflow-hidden py-10"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div
        ref={carouselRef}
        className="flex w-fit transition-transform duration-300 ease-out gap-5"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {projects.map((project, index) => (
          <div
            key={project.name}
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            ref={(el) => (cardRefs.current[index] = el)}
            className="transition-transform duration-300 ease-out"
            style={handleTest(index)}
          >
            <button type="button" onClick={() => handleClick(index)}>
              <ProjectCardMobile {...project} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
