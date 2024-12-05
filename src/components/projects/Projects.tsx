import React, { useEffect, useRef } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { ProjectType } from "@src/types/project.type";
import { ContentfulType } from "@src/types/contentful.type";
import { CarouselDesktop } from "./desktop/CarouselDesktop";
import { SetActiveSectionType } from "@pages/index";
import useScrollDistance from "@hooks/useScrollDistance";
import { useProjectDetailsContext } from "@src/contexts/ProjectDetailsContext";
import ProjectDetails from "./ProjectDetails";
import Links from "./links/Links";
import CustomScrollbar from "../custom/CustomScrollbar";
import { CarouselMobile } from "./mobile/CarouselMobile";

export const Projects = ({
  isNavClick,
  setActiveSection,
}: SetActiveSectionType) => {
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
        nodes {
          name
          description {
            raw
          }
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
            gatsbyImage(layout: FIXED, width: 200, placeholder: BLURRED)
          }
        }
      }
    }
  `);
  const projects: ProjectType[] = data?.projects?.nodes;

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
    <section id="Projects" ref={elementRef} className="">
      <div className="min-h-screen items-center justify-center hidden sm:flex">
        <CarouselDesktop projects={projects} isProjectModal={!!projectModal} />
      </div>
      <div className="min-h-screen flex items-center justify-center sm:hidden ">
        <CarouselMobile projects={projects} />
      </div>
      {projectModal && (
        <div className="absolute inset-0 flex justify-center items-center z-20 backdrop-blur-sm ">
          <div
            className="relative w-[90%] md:w-[70%] max-w-5xl h-[70vh] max-h-fit rounded shadow-[0_0px_50px_-10px_rgba(0,0,0,.5)]"
            ref={projectDetailRef}
          >
            <div className="h-full overflow-y-scroll overflow-x-hidden">
              <ProjectDetails project={projectModal} />
              <CustomScrollbar />
            </div>
            <div className="flex gap-5 absolute -top-5 right-1 h-fit">
              <Links
                url={projectModal.url}
                urlGithub={projectModal.urlGithub}
                urlGithubFrontend={projectModal.urlGithubFrontend}
                urlGithubBackend={projectModal.urlGithubBackend}
              />
              <button className="text-white" type="button" onClick={closeModal}>
                <img
                  src="/images/icons/close.png"
                  alt="description"
                  className="h-4 opacity-50 hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
