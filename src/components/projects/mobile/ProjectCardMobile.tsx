import { ProjectType } from "@src/types/project.type";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

export const ProjectCardMobile = ({
  name,
  index,
  url,
  urlGithub,
  urlGithubFrontend,
  urlGithubBackend,
  stack,
  thumbnailMobile,
}: ProjectType) => {
  const projectThumbnailMobileImage = getImage(thumbnailMobile);
  return (
    <div className="shadow-[0_0px_40px_-10px_rgba(0,0,0,.3)] flex items-center justify-center">
      {projectThumbnailMobileImage && (
        <GatsbyImage
          image={projectThumbnailMobileImage}
          alt={name}
          className="object-cover rounded-lg"
        />
      )}
    </div>
  );
};