import React from "react";
import { ProjectType } from "@src/types/project.type";

type LinksProps = Pick<
  ProjectType,
  "url" | "urlGithub" | "urlGithubFrontend" | "urlGithubBackend"
>;

const Links = ({
  url,
  urlGithub,
  urlGithubFrontend,
  urlGithubBackend,
}: LinksProps) => {
  const linksObj = [
    {
      url: urlGithub,
      urlIcon: "/images/icons/github.png",
      altIcon: "github",
      label: "mono",
    },
    {
      url: urlGithubFrontend,
      urlIcon: "/images/icons/github.png",
      altIcon: "frontend github",
      label: "front",
    },
    {
      url: urlGithubBackend,
      urlIcon: "/images/icons/github.png",
      altIcon: "backend github",
      label: "back",
    },
    {
      url,
      urlIcon: "/images/icons/eye.png",
      altIcon: "website",
      label: "www",
    },
  ];

  return linksObj.map(
    (link) =>
      link.url && (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center justify-center hover:opacity-50 transition-opacity duration-300"
        >
          <img src={link.urlIcon} alt={link.altIcon} className="h-5" />
          <span
            className="
                  absolute inset-x-0 -bottom-4 
                  flex items-center justify-center 
                  font-luckiest_guy text-white text-[.65rem]
                "
          >
            {link.label}
          </span>
        </a>
      ),
  );
};

export default Links;
