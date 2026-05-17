import { Canvas } from "@react-three/fiber";

import { useRef } from "react";

import Arena from "../components/environment/Arena";
import Lighting from "../components/environment/Lighting";

import Fighter from "../components/characters/Fighter";

import ThirdPersonCamera from "../components/camera/ThirdPersonCamera";

export default function FightScene() {

  const playerRef = useRef();

  return (

    <Canvas shadows>

      <Lighting />

      <Arena />

      <Fighter ref={playerRef} />

      <ThirdPersonCamera target={playerRef} />

    </Canvas>
  );
}
