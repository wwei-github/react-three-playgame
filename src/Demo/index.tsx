import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Demo() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow={true}
          shadow-mapSize={[1024, 1024]}
          intensity={0.6}
          position={[50, 50, 50]}
        >
            <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>
        <mesh position={[0, 0.5, 0]} castShadow={true}>
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color="#ff0000" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
          <planeGeometry args={[10, 10]} />
          <meshLambertMaterial color="#00ffff" />
        </mesh>
      </Canvas>
    </>
  );
}
export default Demo;
