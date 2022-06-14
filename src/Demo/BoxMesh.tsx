import { useRef, useEffect } from "react";
import { MeshProps } from "@react-three/fiber";
import { gsap } from "gsap";

function BoxMesh() {
  const boxMesh = useRef<MeshProps>(null);
  useEffect(()=>{
    gsap.to(boxMesh.current!.position, {
      x: 3,
      duration: 1,
      yoyo: true,
      repeatRefresh:true,
      repeat:-1
    });
    gsap.to(boxMesh.current!.rotation, {
      x: 3,
      y: 3,
      duration: 1,
      yoyo: true,
      repeat: -1,
    });
  },[]);

  return (
    <mesh
      className="box"
      ref={boxMesh}
      position={[0, 0.5, 0]}
      castShadow={true}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  );
}
export default BoxMesh;
