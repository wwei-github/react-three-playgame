import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import { BOXS_SIZE, GROUND_SIZE, BOXS_COUNT } from "../config/globalConfig";
import { randomRange } from "../utils/randomRange";
const Boxs = () => {
  const [boxRef, api] = useBox<THREE.InstancedMesh>(() => ({
    mass: 1,
    args: [BOXS_SIZE, BOXS_SIZE, BOXS_SIZE],
    position: [
      randomRange(-GROUND_SIZE / 2, GROUND_SIZE / 2),
      BOXS_SIZE / 2 + 10,
      randomRange(50, GROUND_SIZE),
    ],
  }));
  return (
    <>
      <instancedMesh ref={boxRef} args={[undefined, undefined, BOXS_COUNT]}>
        <boxBufferGeometry args={[BOXS_SIZE, BOXS_SIZE, BOXS_SIZE]} />
        <meshBasicMaterial color={new THREE.Color("#44ff88")} />
      </instancedMesh>
    </>
  );
};
export default Boxs;
