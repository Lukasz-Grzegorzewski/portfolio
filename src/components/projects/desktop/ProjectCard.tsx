import React, { MouseEvent as MouseEventReact } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ProjectType } from "@src/types/project.type";
import LinksLayout from "../links/LinksLayout";
import Stack from "../Stack";

type ProjectCardProps = ProjectType & {
  handleClickCard: (
    e: MouseEventReact<HTMLDivElement, MouseEvent>,
    index: number,
  ) => void;
  clickedCardIndex: number | null;
};

export const ProjectCard = ({
  name,
  index,
  url,
  urlGithub,
  urlGithubFrontend,
  urlGithubBackend,
  stack,
  thumbnail,
  handleClickCard,
  clickedCardIndex,
}: ProjectCardProps) => {
  const projectImage = getImage(thumbnail);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={`relative flex flex-col items-center cursor-pointer transition-width duration-700 ease-in-out mt-10`}
      onClick={(e) => handleClickCard(e, index)}
    >
      <div
        className={`
          relative transition-width duration-700 ease-in-out 
          rounded-lg shadow-[0_0px_40px_-10px_rgba(0,0,0,.3)] overflow-hidden 
          ${clickedCardIndex === index ? "w-[600px]" : "w-28"}
        `}
      >
        {projectImage && (
          <GatsbyImage
            image={projectImage}
            alt={name}
            className={`
              transition-transform duration-[750ms]
              ${name === "Portfolio" && clickedCardIndex !== index ? "relative transform -translate-x-[178px]" : ""}
          `}
          />
        )}
      </div>
      <h2 className="text-secondary">{name}</h2>
      <div
        className={`
          transition-opacity duration-500
          ${clickedCardIndex === index ? "opacity-1" : "opacity-0"}
        `}
      >
        <LinksLayout
          links={{ url, urlGithub, urlGithubFrontend, urlGithubBackend }}
          stack={stack}
          name={name}
        />
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="absolute -top-6 left-1 cursor-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Stack stack={stack} />
        </div>
      </div>
    </div>
  );
};
