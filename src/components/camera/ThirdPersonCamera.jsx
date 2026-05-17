import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
export default function ThirdPersonCamera({ target }) {
  const { camera } = useThree();
  useFrame(() => {
    if (!target.current) return;
    const cameraOffset = new Vector3(
      0,
      5,
      10
    );
    const playerPosition = target.current.position;
    const desiredPosition = playerPosition.clone().add(cameraOffset);
    camera.position.lerp(desiredPosition, 0.1);
    camera.lookAt(playerPosition);
  });
  return null;
}
