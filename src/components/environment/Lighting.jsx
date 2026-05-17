export default function Lighting() {

  return (
    <>
      <ambientLight intensity={0.15} />

      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <pointLight
        position={[0, 8, 0]}
        color="#00ffff"
        intensity={25}
      />

      <pointLight
        position={[15, 5, 15]}
        color="#aa00ff"
        intensity={20}
      />

      <pointLight
        position={[-15, 5, -15]}
        color="#ff0066"
        intensity={15}
      />

      <pointLight
        position={[0, 15, 0]}
        color="#ffffff"
        intensity={5}
      />
    </>
  );
}
