import { IGatsbyImageData } from "gatsby-plugin-image";

export type ProjectType = {
  name: string;
  url: string;
  stack: string[];
  index: number;
  urlGithub?: string;
  urlGithubFrontend?: string;
  urlGithubBackend?: string;
  image: IGatsbyImageData;
  thumbnail: IGatsbyImageData;
  thumbnailMobile: IGatsbyImageData;
};
