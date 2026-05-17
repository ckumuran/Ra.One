import {
  Box,
  Cylinder
} from "@react-three/drei";

export default function NeonArena() {

  const pillars = [];

  for (let i = 0; i < 12; i++) {

    const angle =
      (i / 12) * Math.PI * 2;

    const radius = 20;

    const x =
      Math.cos(angle) * radius;

    const z =
      Math.sin(angle) * radius;

    pillars.push(
      <Cylinder
        key={i}
        args={[1, 1, 12, 16]}
        position={[x, 6, z]}
        castShadow
      >

        <meshStandardMaterial
          color="#111111"
          emissive="#00ffff"
          emissiveIntensity={2}
        />

      </Cylinder>
    );

  }

  return (
    <>
      <Box
        args={[60, 1, 60]}
        position={[0, -1, 0]}
        receiveShadow
      >

        <meshStandardMaterial
          color="#050510"
          metalness={1}
          roughness={0.2}
          emissive="#001122"
          emissiveIntensity={1}
        />

      </Box>

      {pillars}

      <Box
        args={[60, 20, 1]}
        position={[0, 10, -30]}
      >

        <meshStandardMaterial
          color="#220033"
          emissive="#aa00ff"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />

      </Box>

      <Box
        args={[60, 20, 1]}
        position={[0, 10, 30]}
      >

        <meshStandardMaterial
          color="#220033"
          emissive="#aa00ff"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />

      </Box>

      <Box
        args={[1, 20, 60]}
        position={[-30, 10, 0]}
      >

        <meshStandardMaterial
          color="#220033"
          emissive="#aa00ff"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />

      </Box>

      <Box
        args={[1, 20, 60]}
        position={[30, 10, 0]}
      >

        <meshStandardMaterial
          color="#220033"
          emissive="#aa00ff"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />

      </Box>
    </>
  );
}
