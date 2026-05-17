import { Box } from "@react-three/drei";

export default function Arena() {

  return (
    <>

      {/* Floor */}
      <Box
        args={[50, 1, 50]}
        position={[0, -1, 0]}
        receiveShadow
      >

        <meshStandardMaterial
          color="#111111"
          metalness={0.6}
          roughness={0.3}
        />

      </Box>

      {/* Left Wall */}
      <Box
        args={[1, 10, 50]}
        position={[-25, 4, 0]}
        receiveShadow
      >

        <meshStandardMaterial color="#111111" />

      </Box>

      {/* Right Wall */}
      <Box
        args={[1, 10, 50]}
        position={[25, 4, 0]}
        receiveShadow
      >

        <meshStandardMaterial color="#111111" />

      </Box>

      {/* Back Wall */}
      <Box
        args={[50, 10, 1]}
        position={[0, 4, -25]}
        receiveShadow
      >

        <meshStandardMaterial color="#111111" />

      </Box>

      {/* Front Wall */}
      <Box
        args={[50, 10, 1]}
        position={[0, 4, 25]}
        receiveShadow
      >

        <meshStandardMaterial color="#111111" />

      </Box>

    </>
  );
}
