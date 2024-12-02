import { StackType } from "@src/types/stack.type";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

type StackProps = {
  stack: StackType[];
};

const Stack = ({ stack }: StackProps) => {
  return (
    <div className="flex gap-2">
      {stack.length > 0 &&
        stack.map((tech) => {
          const projectImage = getImage(tech.logo);
          if (!projectImage) return;
          return (
            <GatsbyImage
              key={tech.name}
              image={projectImage}
              alt={tech.name}
              className="w-2 h-2"
            />
          );
        })}
    </div>
  );
};

export default Stack;
