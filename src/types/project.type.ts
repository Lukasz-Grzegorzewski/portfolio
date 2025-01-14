import { IGatsbyImageData } from "gatsby-plugin-image";
import { StackType } from "./stack.type";
import { ContentfulRichTextGatsbyReference } from "gatsby-source-contentful/rich-text";

export type ProjectType = {
  name: string;
  url: string;
  descriptionFr: {
    raw: string;
    references?: ContentfulRichTextGatsbyReference[];
  };
  descriptionEn: {
    raw: string;
    references?: ContentfulRichTextGatsbyReference[];
  };
  descriptionPl: {
    raw: string;
    references?: ContentfulRichTextGatsbyReference[];
  };
  stack: StackType[];
  index: number;
  urlGithub?: string;
  urlGithubFrontend?: string;
  urlGithubBackend?: string;
  image: IGatsbyImageData;
  thumbnail: IGatsbyImageData;
  thumbnailMobile: IGatsbyImageData;
};
