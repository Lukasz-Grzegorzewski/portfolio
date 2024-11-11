import * as React from "react";
import ProjectCard from "./ProjectCard";
import { ProjectType } from "../../types/project.type";
import { graphql, useStaticQuery } from "gatsby";
import { ContentfulType } from "../../types/contentful.type";

const Projects = () => {
  const data = useStaticQuery<ContentfulType>(graphql`
    query MyQuery {
      projects: allContentfulProject {
        edges {
          node {
            name
            url
            stack
          }
        }
      }
    }
  `);
  const projects: ProjectType[] = data?.projects?.edges?.map(
    (edge) => edge.node,
  );

  return (
    <section
      id="Projects"
      className="min-h-dvh flex items-center justify-center"
    >
      <ul className="flex gap-4">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
      </ul>
    </section>
  );
};

export default Projects;
