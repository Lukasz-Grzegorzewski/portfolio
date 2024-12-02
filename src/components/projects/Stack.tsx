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
            <div className="relative group" key={tech.name}>
              <GatsbyImage image={projectImage} alt={tech.name} className="" />
              <div
                className="
                  absolute -top-7 right-0
                  text-xs text-nowrap text-white
                  flex items-center justify-center 
                bg-primary bg-opacity-70 p-1 w-fit rounded-full
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
