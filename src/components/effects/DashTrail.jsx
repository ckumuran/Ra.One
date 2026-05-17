import { Sphere } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

import {
  useRef,
  useState
} from "react";

export default function DashTrail({
  position,
  onFinish
}) {

  const meshRef = useRef();

  const [scale, setScale] = useState(1);

  useFrame(() => {

    setScale((prev) => prev + 0.03);

    if (meshRef.current) {

      meshRef.current.material.opacity -= 0.03;

      if (
        meshRef.current.material.opacity <= 0
      ) {

        onFinish();

      }

    }

  });

  return (
    <Sphere
      ref={meshRef}
      args={[0.7, 16, 16]}
      position={[
        position.x,
        position.y,
        position.z
      ]}
      scale={scale}
    >

      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={4}
        transparent
        opacity={0.5}
      />

    </Sphere>
  );
}
