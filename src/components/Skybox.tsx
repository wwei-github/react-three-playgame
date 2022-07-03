import { useTexture,Stars } from "@react-three/drei";
import { useLayoutEffect } from "react";
import * as THREE from "three";

function Skybox() {
  const texture = useTexture("textures/galaxy.jpg");
  useLayoutEffect(() => {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(2, 2);
  }, []);
  return (
    <>
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
        <sphereGeometry attach="geometry" args={[300, 10, 10]} />
        <meshPhongMaterial
          attach="material"
          map={texture}
          side={THREE.BackSide}
          emissive={new THREE.Color("#003366")}
          emissiveIntensity={0.4}
          fog={true}
        />
      </mesh>
    </>
  );
}
export default Skybox;
