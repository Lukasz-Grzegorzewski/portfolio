import React, { useRef, useState, useEffect } from "react";
import { ProjectCardMobile } from "./ProjectCardMobile";
import { ProjectType } from "@src/types/project.type";

type CarouselMobileProps = {
  projects: ProjectType[];
};

export const CarouselMobile = ({ projects }: CarouselMobileProps) => {
  const carouselMobileRef = useRef<HTMLDivElement | null>(null);
  const cardWrapperRefs = useRef<HTMLDivElement[]>([]);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Measure card width, gap, and carousel width
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (carouselMobileRef.current && cardWrapperRefs.current.length > 0) {
        const carouselStyles = getComputedStyle(carouselMobileRef.current);
        const gapValue = Number.parseFloat(carouselStyles.gap || "0");

        const card = cardWrapperRefs.current[0];
        const cardRect = card.getBoundingClientRect();

        setCardWidth(cardRect.width);
        setGap(gapValue);

        // Initially center the first card
        const initialTranslate = window.innerWidth / 2 - cardRect.width / 2;
        setCurrentTranslate(initialTranslate);
      }
    }
  }, []);

  // Handle drag start
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  // Handle drag move
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;

    setCurrentTranslate((prev) => prev + diff);
    setStartX(clientX);
  };

  // Handle drag end and snap to the nearest card
  const handleEnd = () => {
    if (typeof window === "undefined") return;
    setIsDragging(false);

    if (!carouselMobileRef.current || cardWrapperRefs.current.length === 0) {
      return;
    }

    const totalCards = cardWrapperRefs.current.length;
    const carouselWidth =
      carouselMobileRef.current.getBoundingClientRect().width;

    // Calculate the target index
    const offset = window.innerWidth / 2 - cardWidth / 2; // Center offset
    const closestIndex = Math.round(
      (offset - currentTranslate) / (cardWidth + gap),
    );

    // Clamp the index
    const clampedIndex = Math.max(0, Math.min(totalCards - 1, closestIndex));

    setCurrentIndex(clampedIndex);

    // Recalculate translate for the centered card
    const newTranslate = offset - clampedIndex * (cardWidth + gap);
    setCurrentTranslate(newTranslate);
  };

  // Handle card click to center the clicked card
  const handleClick = (index: number) => {
    if (typeof window === "undefined") return;

    const offset = window.innerWidth / 2 - cardWidth / 2;
    const newTranslate = offset - index * (cardWidth + gap);
    setCurrentIndex(index);
    setCurrentTranslate(newTranslate);
  };

  const handleCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardWrapperRefs.current[index] = el;
    }
  };

  return (
    <div
      className="relative overflow-hidden py-10"
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div
        ref={carouselMobileRef}
        className="flex w-fit gap-0 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${currentTranslate}px)` }}
      >
        {projects.map((project, index) => (
          <div
            key={project.name}
            ref={(el) => handleCardRef(el, index)}
            className={`flex ${
              index === currentIndex
                ? "z-10 scale-100 opacity-100"
                : "scale-75 opacity-60"
            } transition-transform duration-300`}
          >
            <button
              type="button"
              onClick={() => handleClick(index)} // On card click, center it
            >
              <ProjectCardMobile {...project} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
