import React, { useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { ProjectType } from "@src/types/project.type";
import { ContentfulType } from "@src/types/contentful.type";
import { Carousel } from "./desktop/Carousel";
import { SetActiveSectionType } from "@pages/index";
import useScrollDistance from "@hooks/useScrollDistance";

const Projects = ({ isNavClick, setActiveSection }: SetActiveSectionType) => {
  const { isInView, elementRef } = useScrollDistance("Projects");

  useEffect(() => {
    if (!isNavClick && isInView) setActiveSection("Projects");
  }, [isInView, setActiveSection, isNavClick]);

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
      <Carousel projects={projects} />
    </section>
  );
};

export default Projects;
