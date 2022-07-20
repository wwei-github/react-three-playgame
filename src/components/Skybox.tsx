import { useTexture,Stars } from "@react-three/drei";
import { useLayoutEffect } from "react";
import * as THREE from "three";

import { useWorldPosition } from "../store/WroldStore";

function Skybox() {
  const texture = useTexture("textures/galaxy.jpg");
  const position = useWorldPosition(state=>state.position)
  useLayoutEffect(() => {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(2, 2);
  }, []);

  return (
    <group position={new THREE.Vector3(...position)}>
      <Stars
        radius={130}
        depth={10}
        count={10000}
        factor={25}
        saturation={0}
        fade
        speed={1}
      />
      <mesh>
        <sphereGeometry attach="geometry" args={[500, 10, 10]} />
        <meshPhongMaterial
          attach="material"
          map={texture}
          side={THREE.BackSide}
          emissive={new THREE.Color("#003366")}
          emissiveIntensity={0.4}
          fog={true}
        />
      </mesh>
    </group>
  );
}
export default Skybox;
