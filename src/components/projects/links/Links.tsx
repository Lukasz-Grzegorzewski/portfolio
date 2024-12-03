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
      label: "api",
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
          className="relative flex items-center justify-center group"
        >
          <img
            src={link.urlIcon}
            alt={link.altIcon}
            className="h-4 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span
            className="
                  absolute inset-x-0 -top-3 
                  flex items-center justify-center
                  font-luckiest_guy tracking-widest text-primary text-[.6rem]
                  opacity-40 group-hover:opacity-100 transition-opacity
                "
          >
            {link.label}
          </span>
        </a>
      ),
  );
};

export default Links;
