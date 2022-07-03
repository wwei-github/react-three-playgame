import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Skybox from "./components/Skybox";
import Ground from "./components/Ground";
import Boxs from "./components/Boxs";
import Airship from "./components/Airship";

function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight />
        <OrbitControls />

        <Skybox />
        <Physics>
          <Ground />
          <Boxs />
          <Airship />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
