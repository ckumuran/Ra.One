import { Sphere } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

import {
  useRef,
  useState
} from "react";

export default function ExplosionEffect({
  position,
  onFinish
}) {

  const meshRef = useRef();

  const [scale, setScale] = useState(1);

  useFrame(() => {

    setScale((prev) => prev + 0.15);

    if (meshRef.current) {

      meshRef.current.material.opacity -= 0.05;

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
      args={[1, 16, 16]}
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
        emissiveIntensity={5}
        transparent
        opacity={0.8}
      />

    </Sphere>
  );
}
