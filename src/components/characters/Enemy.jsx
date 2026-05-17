import {
  Box,
  Text
} from "@react-three/drei";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from "react";

import {
  useFrame
} from "@react-three/fiber";

const Enemy = forwardRef(function Enemy(
  {
    playerRef,
    level,
    type,
    onDeath,
    setEnemyProjectiles
  },
  ref
) {

  const meshRef = useRef();

  const velocity = useRef({
    x: 0,
    z: 0
  });

  const attackCooldown = useRef(0);

  const projectileCooldown = useRef(0);

  let maxHealth = 100 + level * 25;

  let moveSpeed = 0.01 + level * 0.002;

  let damage = 10 + level * 2;

  let color = "#ff0033";

  let size = [1.5, 3, 1.5];

  const [health, setHealth] =
    useState(maxHealth);

  if (type === "fast") {

    moveSpeed *= 2;

    maxHealth *= 0.7;

    damage *= 0.8;

    color = "#ffff00";

  }

  if (type === "tank") {

    moveSpeed *= 0.6;

    maxHealth *= 2;

    damage *= 1.5;

    size = [2.5, 5, 2.5];

    color = "#ff6600";

  }

  if (type === "boss") {

    moveSpeed *= 0.8;

    maxHealth *= 5;

    damage *= 2;

    size = [4, 8, 4];

    color = "#aa00ff";

    if (health < maxHealth * 0.4) {

      moveSpeed *= 1.8;

      damage *= 1.5;

      color = "#ff00ff";

    }

  }

  const [isHit, setIsHit] =
    useState(false);

  const [isDead, setIsDead] =
    useState(false);

  const [isAttacking, setIsAttacking] =
    useState(false);

  useFrame(() => {

    if (
      !meshRef.current ||
      !playerRef?.current ||
      isDead
    ) return;

    velocity.current.x *= 0.9;

    velocity.current.z *= 0.9;

    const enemyPosition =
      meshRef.current.position;

    const playerPosition =
      playerRef.current.position;

    const dx =
      playerPosition.x - enemyPosition.x;

    const dz =
      playerPosition.z - enemyPosition.z;

    const distance =
      Math.hypot(dx, dz);

    if (distance > 2) {

      const dirX = dx / distance;

      const dirZ = dz / distance;

      velocity.current.x +=
        dirX * moveSpeed;

      velocity.current.z +=
        dirZ * moveSpeed;

      const angle =
        Math.atan2(dirX, dirZ);

      meshRef.current.rotation.y +=
        (
          angle
          - meshRef.current.rotation.y
        ) * 0.1;

    }

    if (
      distance < 2 &&
      attackCooldown.current <= 0
    ) {

      setIsAttacking(true);

      attackCooldown.current = 60;

      const direction = {
        x: dx / distance,
        z: dz / distance
      };

      playerRef.current.takeDamage(
        damage,
        direction
      );

    }

    if (
      type === "boss" &&
      projectileCooldown.current <= 0
    ) {

      projectileCooldown.current = 120;

      const direction = {
        x: dx / distance,
        z: dz / distance
      };

      setEnemyProjectiles((prev) => [

        ...prev.slice(-5),

        {
          id: Date.now(),

          position: {
            x: enemyPosition.x,
            y: 4,
            z: enemyPosition.z
          },

          direction
        }
      ]);

    }

    if (attackCooldown.current > 0) {

      attackCooldown.current--;

    } else {

      setIsAttacking(false);

    }

    if (projectileCooldown.current > 0) {

      projectileCooldown.current--;

    }

    meshRef.current.position.x +=
      velocity.current.x;

    meshRef.current.position.z +=
      velocity.current.z;

  });

  useImperativeHandle(ref, () => ({
    mesh: meshRef.current,

    takeDamage(amount, direction) {

      if (isDead) return;

      setHealth((prev) => {

        const newHealth =
          Math.max(prev - amount, 0);

        if (newHealth <= 0) {

          setIsDead(true);

        }

        return newHealth;

      });

      setIsHit(true);

      velocity.current.x +=
        direction.x * 0.5;

      velocity.current.z +=
        direction.z * 0.5;

      setTimeout(() => {

        setIsHit(false);

      }, 100);

    }
  }));

  if (isDead) {

    setTimeout(() => {

      onDeath?.({
        x: meshRef.current.position.x,
        y: 0,
        z: meshRef.current.position.z
      });

    }, 1000);

    return null;

  }

  return (
    <>
      <Box
        ref={meshRef}
        args={size}
        position={[5, size[1] / 2, 0]}
        castShadow
        receiveShadow
      >

        <meshStandardMaterial
          color={
            isHit
              ? "#ffffff"
              : isAttacking
              ? "#ffaa00"
              : color
          }
          emissive={color}
          emissiveIntensity={1}
        />

      </Box>

      <Text
        position={[
          meshRef.current?.position.x || 5,
          size[1] + 1,
          meshRef.current?.position.z || 0
        ]}
        fontSize={0.5}
        color="white"
      >

        {type.toUpperCase()} HP:
        {" "}
        {Math.floor(health)}

      </Text>
    </>
  );
});

export default Enemy;
