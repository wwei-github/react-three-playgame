import { useEffect } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BoxMesh from "./BoxMesh";
import SceneModel from "./SceneModel";

function Demo() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [3, 4, 5],
        }}
      >
        <OrbitControls />
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow={true}
          shadow-mapSize={[1024, 1024]}
          intensity={0.6}
          position={[50, 50, 50]}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, 10, -10]}
          />
        </directionalLight>
        {/* <BoxMesh /> */}
        <SceneModel />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#00ffff" />
        </mesh>
      </Canvas>
    </>
  );
}
export default Demo;
