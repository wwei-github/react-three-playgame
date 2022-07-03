import React, { useEffect, useRef, Suspense, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface shipModelRef {
  group: React.RefObject<THREE.Group>;
}

const AirshipModel = React.forwardRef<shipModelRef>((props, ref) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/bull_dog/scene.gltf");
  const { names, actions } = useAnimations(animations, group);
  useEffect(() => {
    actions[names[0]]?.play();
  });
  useImperativeHandle(ref, () => ({
    group,
  }));

  return (
    <>
      <group ref={group}>
        <primitive object={scene} scale={3}/>
      </group>
    </>
  );
});

const Airship = () => {
  const AirshipModelRef = useRef<shipModelRef>(null);
  useEffect(() => {
    if (!AirshipModelRef.current) return;
    AirshipModelRef.current.group.current!.rotation.set(0, Math.PI, 0);
  }, []);
  return (
    <>
      <AirshipModel ref={AirshipModelRef} />
    </>
  );
};

export default Airship;
