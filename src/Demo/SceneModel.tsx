import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export default function Scene() {
  const gltf = useLoader(GLTFLoader, "http://127.0.0.1:5500/models/floating_castle/scene.gltf");
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  );
}
