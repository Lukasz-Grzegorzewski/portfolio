import React, { useEffect, useRef, useState } from "react";

const CustomScrollbar = () => {
  const childRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbPosition, setThumbPosition] = useState(0);

  useEffect(() => {
    const thumb = thumbRef.current;
    const parentElement = childRef?.current?.parentElement;

    if (!parentElement || !thumb) return;

    const updateScrollbar = () => {
      const contentHeight =
        parentElement.scrollHeight - parentElement.clientHeight;

      const thumbHeight =
        (parentElement.clientHeight / parentElement.scrollHeight) *
        parentElement.clientHeight;

      const scrollPercentage = parentElement.scrollTop / contentHeight;

      setThumbHeight(thumbHeight);
      setThumbPosition(
        scrollPercentage * (parentElement.clientHeight - thumbHeight),
      );
    };

    parentElement.addEventListener("scroll", updateScrollbar);

    return () => {
      parentElement.removeEventListener("scroll", updateScrollbar);
    };
  }, []);

  return (
    <div
      className="absolute top-0 -right-3 md:-right-10 w-[1px] bg-secondary h-full z-40"
      ref={childRef}
    >
      <div
        ref={thumbRef}
        className="bg-primary rounded w-full relative"
        style={{
          height: thumbHeight,
          top: thumbPosition,
        }}
      />
    </div>
  );
};

export default CustomScrollbar;
