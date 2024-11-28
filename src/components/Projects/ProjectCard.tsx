import React, { useRef, MouseEvent as MouseEventReact } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ProjectType } from "@src/types/project.type";
import Links from "./Links/Links";

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
  image,
  thumbnailMobile,
  handleClickCard,
  clickedCardIndex,
}: ProjectCardProps) => {
  const projectImage = getImage(thumbnail);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      ref={cardRef}
      className={`flex flex-col items-center cursor-pointer transition-width duration-700 ease-in-out`}
      onClick={(e) => handleClickCard(e, index)}
    >
      <div
        className={`relative transition-width duration-700 ease-in-out h-fit rounded-3xl overflow-hidden ${
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
        {clickedCardIndex === index && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            p-5
            flex items-center justify-center gap-5 cursor-auto
            before:absolute before:content-[''] before:left-0 before:right-0
            before:shadow-[0_0_60px_50px_rgba(0,0,0,0.85)]"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Inner button clicked");
            }}
          >
            <Links
              url={url}
              urlGithub={urlGithub}
              urlGithubFrontend={urlGithubFrontend}
              urlGithubBackend={urlGithubBackend}
            />
            <button type="button" className="cursor-pointer brightness-100">
              <img
                src="/images/icons/info.png"
                alt="description"
                className="h-5 hover:opacity-50 transition-opacity duration-300"
              />
            </button>
          </div>
        )}
      </div>
      <h2 className="text-secondary">{name}</h2>
    </div>
  );
};
