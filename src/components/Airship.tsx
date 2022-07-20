import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import gsap from "gsap";

import { useWorldPosition } from "../store/WroldStore";
import { useSpeedStore } from "../store/SpeedStore";

interface shipModelRef {
  group: React.RefObject<THREE.Group>;
}

const AirshipModel = React.forwardRef<shipModelRef>((props, ref) => {
  // const group = useRef<THREE.Group>(null);

  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const { position, setPostition } = useWorldPosition();
  const [x, y, z] = position;
  const [group] = useBox<THREE.Group>(
    () => ({
      position: [x, y, z],
      args: [5, 10, 5],
      onCollide:(e) => {
        console.log(e);
      }
    }),
    useRef(null),
    [position]
  );
  const { scene, animations } = useGLTF("/models/bull_dog/scene.gltf");
  const { names, actions } = useAnimations(animations, group);
  const { speed, addSpeed, reduceSpeed } = useSpeedStore();

  useImperativeHandle(ref, () => ({
    group,
  }));

  // 每一帧渲染
  useFrame(() => {
    if (!group.current) return;
    let { x, y, z } = group.current!.position;
    z -= speed;
    left && (x -= 0.2);
    right && (x += 0.2);

    setPostition([x, y, z]);
  });

  useEffect(() => {
    actions[names[0]]?.play();
  }, []);

  useEffect(() => {
    const doEvent = (e: KeyboardEvent) => {
      let type = e.type === "keydown";
      switch (e.key) {
        case "a":
          setLeft(type);
          break;
        case "d":
          setRight(type);
          break;
        case "w":
          addSpeed();
          break;
        case "s":
          reduceSpeed();
          break;
      }
    };
    window.addEventListener("keydown", doEvent);
    window.addEventListener("keyup", doEvent);
    return () => {
      window.removeEventListener("keydown", doEvent);
      window.removeEventListener("keyup", doEvent);
    };
  }, []);

  const ship = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!ship.current) return;
    let rotateZ = 0;
    if (left) {
      rotateZ = -Math.PI / 6;
    }
    if (right) {
      rotateZ = Math.PI / 6;
    }
    gsap.to(ship.current!.rotation, {
      z: rotateZ,
    });
  }, [left, right]);

  return (
    <>
      <group ref={group}>
        <primitive
          ref={ship}
          object={scene}
          scale={3}
          rotation={[0, Math.PI, 0]}
        />
      </group>
    </>
  );
});

const Airship = () => {
  const AirshipModelRef = useRef<shipModelRef>(null);
  const camera = useRef<THREE.Camera>(null);

  const { position } = useWorldPosition();

  useFrame(() => {
    if (!camera.current) return;
    const [x, y, z] = position;
    camera.current!.position.set(x, y + 5, z + 20);
  });

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault
        far={2000}
        position={new THREE.Vector3(...position)}
      />
      <AirshipModel ref={AirshipModelRef} />
    </>
  );
};

export default Airship;
