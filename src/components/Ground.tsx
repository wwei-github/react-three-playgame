import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";
import { GROUND_SIZE } from "../config/globalConfig";

const GROUND_COLOR = new THREE.Color("#ffff22");
const TEXTURE_SIZE = GROUND_SIZE * 0.05;

const Ground = () => {
  const [groundRef] = usePlane<THREE.Mesh>(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, -GROUND_SIZE / 2],
  }));
  const [groundRef2] = usePlane<THREE.Mesh>(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, GROUND_SIZE * 1.5],
  }));
  const texture = useTexture("/textures/grid-orange.png", (texture) => {
    // 需要判断是不是数组
    // if (!Array.isArray(texture)) {
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // }
  });
  useLayoutEffect(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(TEXTURE_SIZE, TEXTURE_SIZE);
  }, []);

  return (
    <>
      <mesh ref={groundRef}>
        <meshStandardMaterial
          map={texture}
          //   color={GROUND_COLOR}
          emissive={GROUND_COLOR}
          emissiveIntensity={0}
          metalness={0}
        />
        <planeBufferGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
      </mesh>
      <mesh ref={groundRef2}>
        <meshStandardMaterial
          map={texture}
          //   color={GROUND_COLOR}
          emissive={GROUND_COLOR}
          emissiveIntensity={0}
          metalness={0}
        />
        <planeBufferGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
      </mesh>
    </>
  );
};
export default Ground;
