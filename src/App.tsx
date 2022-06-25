import { Canvas } from "@react-three/fiber";
import {OrbitControls} from '@react-three/drei';
import Skybox from './components/Skybox';

function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight />
        <OrbitControls />

        <Skybox />
      </Canvas>
    </div>
  );
}

export default App;
