import React, { useEffect, useRef } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { ProjectType } from "@src/types/project.type";
import { ContentfulType } from "@src/types/contentful.type";
import { Carousel } from "./desktop/Carousel";
import { SetActiveSectionType } from "@pages/index";
import useScrollDistance from "@hooks/useScrollDistance";
import { useProjectDetailsContext } from "@src/contexts/ProjectDetailsContext";
import ProjectDetails from "./ProjectDetails";

const Projects = ({ isNavClick, setActiveSection }: SetActiveSectionType) => {
  const { isInView, elementRef } = useScrollDistance("Projects");
  const { projectNameModal } = useProjectDetailsContext();
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const { closeModal } = useProjectDetailsContext();

  useEffect(() => {
    if (!isNavClick && isInView) setActiveSection("Projects");
  }, [isInView, setActiveSection, isNavClick]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!projectDetailRef.current) return;
      if (!projectDetailRef.current.contains(e.target as Node)) closeModal();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);

  const data = useStaticQuery<ContentfulType>(graphql`
    query MyQuery {
      projects: allContentfulProject(sort: {index: ASC}) {
        edges {
          node {
            name
            index
            url
            urlGithub
            urlGithubBackend
            urlGithubFrontend
            stack {
              name
              logo {
                gatsbyImage(layout: FIXED, height: 19, placeholder: BLURRED)
              }
            }
            image {
              gatsbyImage(layout: FULL_WIDTH, height: 720, placeholder: BLURRED)
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

  const projectModal = projects.find(
    (project) => project.name === projectNameModal,
  );

  // const tempProjects = Array.from({ length: 5 }, (_, i) =>
  //   projects.map((project) => ({
  //     ...project,
  //     index: project.index + i * 3,
  //   })),
  // ).reduce((acc, curr) => acc.concat(curr), []);

  return (
    <section
      id="Projects"
      ref={elementRef}
      className="min-h-screen flex items-center justify-center"
    >
      <Carousel projects={projects} isProjectModal={!!projectModal} />
      {projectModal && (
        <div className="absolute inset-0 flex justify-center items-center z-20 backdrop-blur-sm">
          <div
            className="w-[90%] md:w-[70%] max-w-5xl h-[70vh] bg-white rounded shadow-lg overflow-y-scroll"
            ref={projectDetailRef}
          >
            <ProjectDetails project={projectModal} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
