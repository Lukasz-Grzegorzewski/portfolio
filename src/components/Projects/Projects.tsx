import * as React from "react";

type Project = {
  name: string;
  url: string;
};

type ProjectsProps = {
  projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
  return <div>Projects content</div>;
};

export default Projects;
