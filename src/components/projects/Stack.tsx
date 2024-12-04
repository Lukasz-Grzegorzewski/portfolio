import { StackType } from "@src/types/stack.type";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

type StackProps = {
  stack: StackType[];
};

const Stack = ({ stack }: StackProps) => {
  return (
    <div className="flex gap-1">
      {stack.length > 0 &&
        stack.map((tech) => {
          const projectImage = getImage(tech.logo);
          if (!projectImage) return;
          return (
            <div className="relative group" key={tech.name}>
              <GatsbyImage image={projectImage} alt={tech.name} />
              <div
                className="
                  absolute -top-4 left-1/2 -translate-x-1/2
                  text-xs text-nowrap text-white
                  opacity-0 group-hover:opacity-100 transition-opacity
                "
              >
                {tech.name}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Stack;
