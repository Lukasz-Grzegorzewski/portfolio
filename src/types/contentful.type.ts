import { ProjectType } from "./project.type";

export type ContentfulType = {
  projects: {
    nodes: ProjectType[];
  };
};
