import { Capsule } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

import { forwardRef } from "react";

import keys from "../../game/controls";

const Fighter = forwardRef(function Fighter(props, ref) {

  useFrame(() => {

    if (!ref.current) return;

    const speed = 0.1;

    // Forward
    if (keys["w"]) {
      ref.current.position.z -= speed;
    }

    // Backward
    if (keys["s"]) {
      ref.current.position.z += speed;
    }

    // Left
    if (keys["a"]) {
      ref.current.position.x -= speed;
    }

    // Right
    if (keys["d"]) {
      ref.current.position.x += speed;
    }

  });

  return (

    <Capsule
      ref={ref}
      args={[0.5, 1.5, 8, 16]}
      position={[0, 1, 0]}
    >

      <meshStandardMaterial color="#00aaff" />

    </Capsule>
  );
});

export default Fighter;
