import * as React from "react";
import { ProjectType } from "../../types/project.type";

const ProjectCard = ({ name, url, stack }: ProjectType) => {
  return (
    <div className="bg-red-200 p-5">
      <h1>{name}</h1>
      <h1>{url}</h1>
      <h1>{stack.join(", ")}</h1>
    </div>
  );
};

export default ProjectCard;
