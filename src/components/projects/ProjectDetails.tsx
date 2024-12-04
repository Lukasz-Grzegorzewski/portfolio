import { ProjectType } from "@src/types/project.type";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Stack from "./Stack";
import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
  RenderRichTextData,
} from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS, Node } from "@contentful/rich-text-types";

const ProjectDetails = ({ project }: { project: ProjectType }) => {
  const image = getImage(project.image);
  const hrefs = [
    {
      url: project.name === "Portfolio" ? undefined : project.url,
      label: `Découvrez ${project.name} ici !`,
    },
    {
      url: project.urlGithub,
      label: `Github repository : Monolitique`,
    },
    {
      url: project.urlGithubFrontend,
      label: `Github repository : Frontend`,
    },
    {
      url: project.urlGithubBackend,
      label: `Github repository : Backtend`,
    },
  ].filter((e) => e.url);

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <b className="font-bold">{text}</b>
      ),
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => {
        const { uri } = node.data;
        return (
          <a
            href={uri}
            className="underline text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
        <p className="mb-4">{children}</p>
      ),
    },
  };

  return (
    <div
      className="
        flex flex-col gap-2
        bg-[rgba(32,32,32,.9)]
        text-secondary-light text-sm
      "
    >
      {image && (
        <div className="w-full h-auto">
          <GatsbyImage image={image} alt={project.name} />
        </div>
      )}
      <div className="self-end pr-5">
        <Stack stack={project.stack} />
      </div>
      <div className="flex flex-col flex-grow gap-10 p-[1rem_1.5rem_2rem] md:p-[1rem_4rem_2rem] text-secondary-light text-sm text-justify">
        <div className="space-y-4">
          {project.description &&
            renderRichText(
              project.description as RenderRichTextData<ContentfulRichTextGatsbyReference>,
              options,
            )}
        </div>
        <ul className="list-inside">
          {hrefs.map((href) => (
            <li key={href.url} className="list-disc">
              <a
                href={href.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {href.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetails;
