import { Canvas } from "@react-three/fiber";
import Arena from "../components/environment/Arena";
import Lighting from "../components/environment/Lighting";
import Fighter from "../components/characters/Fighter";
export default function FightScene() {
  return (
    <Canvas
      camera={{
        position: [0, 5, 10],
        fov: 60
      }}
      shadows
    >
      <Lighting />
      <Arena />
      <Fighter />
    </Canvas>
  );
}
