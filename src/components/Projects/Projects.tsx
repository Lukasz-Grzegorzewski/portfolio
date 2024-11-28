import React, { useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { ProjectType } from "@src/types/project.type";
import { ContentfulType } from "@src/types/contentful.type";
import { Carousel } from "./Carousel";
import { SetActiveSectionType } from "@pages/index";
import useScrollDistance from "@hooks/useScrollDistance";

const Projects = ({ setActiveSection }: SetActiveSectionType) => {
  const { distance, elementRef } = useScrollDistance();

  useEffect(() => {
    if (distance === 0) setActiveSection("Projects");
  }, [distance, setActiveSection]);

  const data = useStaticQuery<ContentfulType>(graphql`
    query MyQuery {
      projects: allContentfulProject(sort: {index: ASC}) {
        edges {
          node {
            name
            index
            stack
            url
            urlGithub
            urlGithubBackend
            urlGithubFrontend
            image {
              gatsbyImage(layout: FIXED, height: 720, placeholder: BLURRED)
            }
            thumbnail {
              gatsbyImage(layout: FIXED, height: 337, placeholder: BLURRED)
            }
            thumbnailMobile {
              gatsbyImage(layout: FIXED, width: 338, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);

  const projects: ProjectType[] = data?.projects?.edges?.map(
    (edge) => edge.node,
  );

  const tempProjects = Array.from({ length: 5 }, (_, i) =>
    projects.map((project) => ({
      ...project,
      index: project.index + i * 3,
    })),
  ).reduce((acc, curr) => acc.concat(curr), []);

  return (
    <section
      id="Projects"
      ref={elementRef}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="absolute overflow-hidden left-0 right-0 px-20">
        <Carousel projects={projects} />
      </div>
    </section>
  );
};

export default Projects;
