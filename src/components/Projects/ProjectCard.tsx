import React, { useRef, MouseEvent as MouseEventReact } from "react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

type ProjectCardProps = {
  name: string;
  url: string;
  stack: string[];
  index: number;
  thumbnail: IGatsbyImageData;
  handleClickCard: (
    e: MouseEventReact<HTMLDivElement, MouseEvent>,
    index: number,
  ) => void;
  clickedCardIndex: number | null;
};

export const ProjectCard = ({
  name,
  url,
  stack,
  index,
  thumbnail,
  handleClickCard,
  clickedCardIndex,
}: ProjectCardProps) => {
  const projectImage = getImage(thumbnail);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      ref={cardRef}
      className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out`}
      onClick={(e) => handleClickCard(e, index)}
    >
      <div
        className={`relative transition-all duration-300 ease-in-out h-fit rounded-3xl overflow-hidden ${
          clickedCardIndex === index ? "w-[600px]" : "w-20"
        }`}
      >
        {projectImage && (
          <GatsbyImage
            image={projectImage}
            alt={name}
            className="w-full h-auto"
          />
        )}
      </div>
      <h2 className="text-secondary">{name}</h2>
    </div>
  );
};
