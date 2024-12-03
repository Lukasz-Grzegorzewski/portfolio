import { IGatsbyImageData } from "gatsby-plugin-image";
import { StackType } from "./stack.type";

export type ProjectType = {
  name: string;
  url: string;
  stack: StackType[];
  index: number;
  urlGithub?: string;
  urlGithubFrontend?: string;
  urlGithubBackend?: string;
  image: IGatsbyImageData;
  thumbnail: IGatsbyImageData;
  thumbnailMobile?: IGatsbyImageData;
};
