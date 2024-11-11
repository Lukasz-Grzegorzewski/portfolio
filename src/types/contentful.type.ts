import { ProjectType } from "./project.type";

export type ContentfulType = {
  projects: {
    edges: { node: ProjectType }[];
  };
};
