import { useProjectDetailsContext } from "@src/contexts/ProjectDetailsContext";
import { ProjectType } from "@src/types/project.type";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

type ProjectDetailsProps = {
  project: ProjectType;
};

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const { closeModal } = useProjectDetailsContext();

  const image = getImage(project.image);

  return (
    <>
      {image && (
        <div className="w-full h-auto">
          <GatsbyImage image={image} alt={project.name} className="" />
        </div>
      )}
      <p>This is the modal content for : {project.name}</p>
      <p>This is the modal content for : {project.name}</p>
      <p>This is the modal content for : {project.name}</p>
      <p>This is the modal content for : {project.name}</p>
      <p>This is the modal content for : {project.name}</p>
      <p>This is the modal content for : {project.name}</p>
      <p>This is the modal content for : {project.name}</p>
      <p>This is the modal content for : {project.name}</p>
      <p>This is the modal content for : {project.name}</p>
      <button
        className="mt-4 px-4 py-2 bg-primary text-white rounded"
        type="button"
        onClick={closeModal}
      >
        Close
      </button>
    </>
  );
};

export default ProjectDetails;
