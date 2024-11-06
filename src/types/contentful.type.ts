import { ProjectType } from "./project.type";

export type ContentfulType = {
  items: {
    edges: { node: ProjectType }[];
  };
};
