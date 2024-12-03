import React from "react";
import Links from "./Links";
import { ProjectType } from "@src/types/project.type";
import { StackType } from "@src/types/stack.type";
import { useProjectDetailsContext } from "@src/contexts/ProjectDetailsContext";

type LinksLayoutProps = {
  stack: StackType[];
  links: Pick<
    ProjectType,
    "url" | "urlGithub" | "urlGithubFrontend" | "urlGithubBackend"
  >;
  name: string;
};

const LinksLayout = ({ links, name }: LinksLayoutProps) => {
  const { openModal } = useProjectDetailsContext();
  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="
          absolute -top-10 -right-3
          p-5
          flex items-center justify-center gap-4 cursor-auto
          "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Links {...links} />
        <button
          type="button"
          className="cursor-pointer "
          onClick={() => openModal(name)}
        >
          <img
            src="/images/icons/info.png"
            alt="description"
            className="h-4 opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </button>
      </div>
    </>
  );
};

export default LinksLayout;
