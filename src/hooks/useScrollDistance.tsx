import { useState, useEffect, useRef } from "react";

const useScrollDistance = (sectionId: string) => {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.5 }, // 50% of the section is visible before it triggers
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Handle hash update for each section when it's in view
  useEffect(() => {
    if (isInView) {
      if (window?.location.hash !== `#${sectionId}`) {
        history.pushState(null, "", `#${sectionId}`);
      }
    }
  }, [isInView, sectionId]);

  return { isInView, elementRef };
};

export default useScrollDistance;
