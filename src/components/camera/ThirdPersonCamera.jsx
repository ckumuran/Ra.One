import {
  useFrame,
  useThree
} from "@react-three/fiber";

import {
  useEffect,
  useState
} from "react";

import { Vector3 } from "three";

import keys from "../../game/controls";

export default function ThirdPersonCamera({
  target,
  enemyRef,
  lockOn,
  setLockOn,
  setCameraRotation
}) {

  const { camera } = useThree();

  const [rotation, setRotation] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {

    const handleMouseMove = (e) => {

      if (lockOn) return;

      if (e.buttons !== 1) return;

      setRotation((prev) => ({
        x: prev.x - e.movementY * 0.003,
        y: prev.y - e.movementX * 0.003
      }));
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };

  }, [lockOn]);

  useFrame(() => {

    if (!target.current) return;

    if (keys["e"]) {
      setLockOn(true);
    }

    if (keys["r"]) {
      setLockOn(false);
    }

    const playerPosition =
      target.current.position;

    let desiredPosition;

    if (
      lockOn &&
      enemyRef?.current?.mesh
    ) {

      const enemyPosition =
        enemyRef.current.mesh.position;

      const midPoint = new Vector3(
        (playerPosition.x + enemyPosition.x) / 2,
        playerPosition.y + 4,
        (playerPosition.z + enemyPosition.z) / 2
      );

      desiredPosition = new Vector3(
        midPoint.x,
        midPoint.y + 2,
        midPoint.z + 10
      );

      camera.position.lerp(
        desiredPosition,
        0.08
      );

      camera.lookAt(midPoint);

      const dx =
        enemyPosition.x - playerPosition.x;

      const dz =
        enemyPosition.z - playerPosition.z;

      const angle =
        Math.atan2(dx, dz);

      setCameraRotation(angle);

    } else {

      const distance = 10;

      const height = 5;

      const offsetX =
        Math.sin(rotation.y) * distance;

      const offsetZ =
        Math.cos(rotation.y) * distance;

      desiredPosition = new Vector3(
        playerPosition.x + offsetX,
        playerPosition.y + height,
        playerPosition.z + offsetZ
      );

      camera.position.lerp(
        desiredPosition,
        0.1
      );

      camera.lookAt(playerPosition);

      setCameraRotation(rotation.y);

    }

  });

  return null;
}
