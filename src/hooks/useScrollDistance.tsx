import { useState, useEffect, useRef } from "react";

const useScrollDistance = () => {
  const [distance, setDistance] = useState<number | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateDistance = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setDistance(rect.top);
      }
    };

    if (window) window.addEventListener("scroll", updateDistance);
    return () => window.removeEventListener("scroll", updateDistance);
  }, []);

  return { distance, elementRef };
};

export default useScrollDistance;
