import {useEffect,useRef,Suspense} from "react";
import { useGLTF,useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Airship = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/bull_dog/scene.gltf");
  const { names, actions } = useAnimations(animations,group);
  useEffect(() => {
    actions[names[0]]?.play();
  });
  return (
    <>
    <group ref={group}>
      <primitive object={scene} />
    </group>
    </>
  );
};
export default Airship;
