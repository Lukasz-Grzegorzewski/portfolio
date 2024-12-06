import React, { useRef, useState, useEffect } from "react";
import { ProjectCardMobile } from "./ProjectCardMobile";
import { ProjectType } from "@src/types/project.type";
import { useProjectDetailsContext } from "@src/contexts/ProjectDetailsContext";

type CarouselMobileProps = {
  projects: ProjectType[];
};

export const CarouselMobile = ({ projects }: CarouselMobileProps) => {
  const { openModal } = useProjectDetailsContext();
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

  // Lock vertical scroll when dragging horizontally
  useEffect(() => {
    if (isDragging) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isDragging]);

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
    setIsDragging(false);

    if (!carouselMobileRef.current || cardWrapperRefs.current.length === 0) {
      return;
    }

    const totalCards = cardWrapperRefs.current.length;

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
    if (index === currentIndex) {
      const project = projects[index];
      openModal(project.name);
    }

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
        className="flex w-fit mb-44 gap-0 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${currentTranslate}px)` }}
      >
        {projects.map((project, index) => {
          const isCurrentCard = index === currentIndex;
          const isLeftCard = index === currentIndex - 1;
          const isRightCard = index === currentIndex + 1;
          const isFarLeft = !isLeftCard && index < currentIndex;
          const isFarRight = !isLeftCard && index > currentIndex;

          const scale = isCurrentCard
            ? 1
            : isLeftCard || isRightCard
              ? 0.75
              : 0.65;

          const translate = isCurrentCard
            ? { x: 0, y: 140 }
            : isLeftCard
              ? { x: 70, y: 60 }
              : isRightCard
                ? { x: -70, y: 60 }
                : isFarLeft
                  ? { x: 200, y: 0 }
                  : isFarRight
                    ? { x: -200, y: 0 }
                    : {};

          return (
            <div
              key={`${project.name}${index}`}
              ref={(el) => handleCardRef(el, index)}
              className={`flex transition-transform duration-500 `}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                zIndex: isCurrentCard ? 10 : isLeftCard || isRightCard ? 9 : 8,
              }}
            >
              <button
                type="button"
                onClick={() => handleClick(index)} // On card click, center it
              >
                <ProjectCardMobile {...project} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
