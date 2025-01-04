import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLocaleLanguageContext } from "@src/contexts/LocaleLanguageContext";

export default function Stitch() {
  const { localeLanguage } = useLocaleLanguageContext();

  const stitchRef = useRef<THREE.Group>(null);

  const gltf = useLoader(GLTFLoader, "./gltf/stitch/download/scene.gltf");

  useFrame(() => {
    if (stitchRef.current) {
      const time = performance.now() / 1500;
      stitchRef.current.position.y = (Math.sin(time * 2) + 1) * 0.2;
    }
  });

  return (
    <group ref={stitchRef}>{gltf && <primitive object={gltf.scene} />}</group>
  );
}
