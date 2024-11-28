import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Stitch from "./Stitch";
import { SetActiveSectionType } from "@pages/index";
import useScrollDistance from "@hooks/useScrollDistance";

const Home = ({ setActiveSection }: SetActiveSectionType) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { isInView, elementRef } = useScrollDistance("Home");

  useEffect(() => {
    if (isInView) setActiveSection("Home");
  }, [isInView, setActiveSection]);

  useEffect(() => {
    if (window) {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      setWindowWidth(window.innerWidth);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <section
      id="Home"
      ref={elementRef}
      className="min-h-screen pb-20 flex flex-col items-center justify-center md:flex-row md:pb-0"
    >
      <div className="h-[320px] mb-0 md:h-[500px] md:mb-20">
        <Canvas
          key={windowWidth}
          camera={{
            position: [-1, 1, 3],
            fov: 75,
            zoom: windowWidth >= 768 ? 1 : 0.7,
          }}
        >
          <Stage environment="city" intensity={1}>
            <Stitch />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <h1
        className="
          relative text-secondary text-4xl -mt-5 
          md:text-6xl md:mb-0 
          after:content-['Full\00a0Stack'] after:absolute after:-right-10 after:-bottom-8 after:text-xl 
          after:md:text-2xl after:md:-right-15 after:md:-bottom-10
        "
      >
        Developpeur
      </h1>
    </section>
  );
};

export default Home;
