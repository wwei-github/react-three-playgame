import { useLayoutEffect, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";
import { GROUND_SIZE } from "../config/globalConfig";
import { useWorldPosition } from "../store/WroldStore";
import { planeStore } from "../store/PlaneStore";

const GROUND_COLOR = new THREE.Color("#ffff22");
const TEXTURE_SIZE = GROUND_SIZE * 0.05;

const Ground = () => {
  const { position } = useWorldPosition();
  const { planeZ1, planeZ2, addZ } = planeStore();
  const [groundRef] = usePlane<THREE.Mesh>(
    () => ({
      mass: 0,
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, 0, planeZ1],
    }),
    useRef(null),
    [planeZ1]
  );
  const [groundRef2] = usePlane<THREE.Mesh>(
    () => ({
      mass: 0,
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, 0, planeZ2],
    }),
    useRef(null),
    [planeZ2]
  );
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

  useFrame(({ clock }) => {
    const [, , z] = position;
    if (z < planeZ1 - GROUND_SIZE / 2 - 50) {
      addZ(1); // 更换第一块地板的位置
    }
    if (z < planeZ2 - GROUND_SIZE / 2 - 50) {
      addZ(2); // 更换第二块地板的位置
    }
  });

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
          emissive={new THREE.Color("#ffffff")}
          emissiveIntensity={0}
          metalness={0}
        />
        <planeBufferGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
      </mesh>
    </>
  );
};
export default Ground;
