import React, {
  useRef,
  useEffect,
  useState,
  MouseEvent as MouseEventReact,
} from "react";
import { ProjectType } from "@src/types/project.type";
import { ProjectCard } from "./ProjectCard";

type CarouselProps = {
  projects: ProjectType[];
  isProjectModal: boolean;
};

export const Carousel = ({ projects, isProjectModal }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!carouselRef.current) return;
      if (!carouselRef.current.contains(e.target as Node)) {
        if (!isProjectModal) setClickedCardIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProjectModal]);

  const handleClickCard = (
    e: MouseEventReact<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    if (!cardContainerRef.current) return;
    if (clickedCardIndex === index) setClickedCardIndex(null);
    else setClickedCardIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!carouselRef.current || !cardContainerRef.current) return;

    const { left: carouselLeft, width: carouselWidth } =
      carouselRef.current.getBoundingClientRect();
    const { scrollWidth: contentWidth } = cardContainerRef.current;

    const maxScroll = contentWidth - carouselWidth;

    const mouseX = e.clientX - carouselLeft;

    const translateX = maxScroll - (mouseX / carouselWidth) * 2 * maxScroll;

    const clampedTranslateX = Math.max(
      -maxScroll,
      Math.min(translateX, maxScroll),
    );

    setTimeout(() => {
      if (cardContainerRef.current)
        cardContainerRef.current.style.transition = "none";
    }, 300);
    cardContainerRef.current.style.transform = `translateX(${clampedTranslateX}px)`;
  };

  const handleMouseEnter = () => {
    if (!cardContainerRef.current || !carouselRef.current) return;

    cardContainerRef.current.style.transition = "transform 0.3s ease";
    const { left, width } = carouselRef.current.getBoundingClientRect();
    const mouseX = left + width / 2;
    const translateX =
      (mouseX / width) * (cardContainerRef.current.scrollWidth - width);

    cardContainerRef.current.style.transform = `translateX(-${translateX}px)`;
  };

  const handleMouseLeave = () => {
    if (!cardContainerRef.current) return;
    cardContainerRef.current.style.transition = "transform 0.3s ease";
  };

  return (
    <div className="absolute overflow-x-hidden left-0 right-0 px-20">
      <div
        ref={carouselRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=""
      >
        <div ref={cardContainerRef} className="flex gap-4 justify-center">
          {projects.map((project) => (
            <ProjectCard
              key={project.index}
              {...project}
              clickedCardIndex={clickedCardIndex}
              handleClickCard={(
                e: MouseEventReact<HTMLDivElement, MouseEvent>,
                index: number,
              ) => handleClickCard(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
