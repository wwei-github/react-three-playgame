import * as THREE from "three";
import { useRef } from "react";
import { useBox } from "@react-three/cannon";
import { BOXS_SIZE, GROUND_SIZE, BOXS_COUNT } from "../config/globalConfig";
import { randomRange } from "../utils/randomRange";
import { planeStore } from "../store/PlaneStore";
const Boxs = () => {
  const { planeZ1, planeZ2 } = planeStore();
  const [boxRef] = useBox<THREE.InstancedMesh>(
    () => ({
      mass: 1,
      args: [BOXS_SIZE, BOXS_SIZE, BOXS_SIZE],
      position: [
        randomRange(-GROUND_SIZE / 2, GROUND_SIZE / 2),
        BOXS_SIZE / 2 + 10,
        randomRange(-planeZ1 - GROUND_SIZE / 2, -planeZ1 + GROUND_SIZE / 2),
      ],
    }),
    useRef(null),
    [planeZ1]
  );
  const [boxRef2] = useBox<THREE.InstancedMesh>(
    () => ({
      mass: 1,
      args: [BOXS_SIZE, BOXS_SIZE, BOXS_SIZE],
      position: [
        randomRange(-GROUND_SIZE / 2, GROUND_SIZE / 2),
        BOXS_SIZE / 2 + 10,
        randomRange(-planeZ2 - GROUND_SIZE / 2, -planeZ2 + GROUND_SIZE / 2),
      ],
    }),
    useRef(null),
    [planeZ2]
  );
  return (
    <>
      <instancedMesh ref={boxRef} args={[undefined, undefined, BOXS_COUNT]}>
        <boxBufferGeometry args={[BOXS_SIZE, BOXS_SIZE, BOXS_SIZE]} />
        <meshBasicMaterial color={new THREE.Color("#44ff88")} />
      </instancedMesh>
      <instancedMesh ref={boxRef2} args={[undefined, undefined, BOXS_COUNT]}>
        <boxBufferGeometry args={[BOXS_SIZE, BOXS_SIZE, BOXS_SIZE]} />
        <meshBasicMaterial color={new THREE.Color("#44ff88")} />
      </instancedMesh>
    </>
  );
};
export default Boxs;
