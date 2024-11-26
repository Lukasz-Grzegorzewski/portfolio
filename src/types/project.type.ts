import { GatsbyImageProps, IGatsbyImageData } from "gatsby-plugin-image";

export type ProjectType = {
  name: string;
  url: string;
  stack: string[];
  index: number;
  thumbnail: IGatsbyImageData;
};
