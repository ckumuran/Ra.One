import { Canvas } from "@react-three/fiber";

import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  EffectComposer,
  Bloom,
  Vignette
} from "@react-three/postprocessing";

import Fighter from "../components/characters/Fighter";
import Enemy from "../components/characters/Enemy";

import ThirdPersonCamera from "../components/camera/ThirdPersonCamera";

import Lighting from "../components/environment/Lighting";
import NeonArena from "../components/environment/NeonArena";

import EnergyBlast from "../components/combat/EnergyBlast";
import EnemyProjectile from "../components/combat/EnemyProjectile";

import ExplosionEffect from "../components/effects/ExplosionEffect";
import ScreenShake from "../components/effects/ScreenShake";
import HitStop from "../components/effects/HitStop";
import DashTrail from "../components/effects/DashTrail";
import Shockwave from "../components/effects/Shockwave";
import FinisherFlash from "../components/effects/FinisherFlash";

import HUD from "../components/ui/HUD";
import MobileControls from "../components/ui/MobileControls";
import MainMenu from "../components/ui/MainMenu";
import PauseMenu from "../components/ui/PauseMenu";
import GameOver from "../components/ui/GameOver";

import { bgMusic } from "../audio/sounds";

import { isMobile } from "../utils/device";

export default function FightScene() {

  const playerRef = useRef();

  const enemyRef = useRef();

  const [cameraRotation, setCameraRotation] =
    useState(0);

  const [lockOn, setLockOn] =
    useState(false);

  const [wave, setWave] =
    useState(1);

  const [enemyKey, setEnemyKey] =
    useState(0);

  const [enemyType, setEnemyType] =
    useState("normal");

  const [blasts, setBlasts] =
    useState([]);

  const [enemyProjectiles, setEnemyProjectiles] =
    useState([]);

  const [explosions, setExplosions] =
    useState([]);

  const [dashTrails, setDashTrails] =
    useState([]);

  const [shockwaves, setShockwaves] =
    useState([]);

  const [shake, setShake] =
    useState(false);

  const [hitStop, setHitStop] =
    useState(false);

  const [finisherFlash, setFinisherFlash] =
    useState(false);

  const [started, setStarted] =
    useState(false);

  const [paused, setPaused] =
    useState(false);

  const [gameOver, setGameOver] =
    useState(false);

  useEffect(() => {

    const handlePause = (e) => {

      if (e.key === "Escape") {

        setPaused((prev) => !prev);

      }

    };

    window.addEventListener(
      "keydown",
      handlePause
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handlePause
      );

    };

  }, []);

  useEffect(() => {

    if (!started) return;

    bgMusic.play();

    return () => {

      bgMusic.pause();

    };

  }, [started]);

  if (!started) {

    return (
      <MainMenu
        onStart={() => {

          document.documentElement
            .requestFullscreen?.();

          setStarted(true);

        }}
      />
    );

  }

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference:
            "high-performance"
        }}
        camera={{
          fov: 60,
          near: 0.1,
          far: 1000
        }}
      >

        <fog
          attach="fog"
          args={
            isMobile
              ? ["#050510", 15, 40]
              : ["#050510", 10, 60]
          }
        />

        <Lighting />

        <NeonArena />

        <Fighter
          ref={playerRef}
          cameraRotation={cameraRotation}
          enemyRef={enemyRef}
          lockOn={lockOn}
          setBlasts={setBlasts}
          setShake={setShake}
          setHitStop={setHitStop}
          setDashTrails={setDashTrails}
          setShockwaves={setShockwaves}
        />

        <Enemy
          key={enemyKey}
          ref={enemyRef}
          playerRef={playerRef}
          level={wave}
          type={enemyType}
          setEnemyProjectiles={
            setEnemyProjectiles
          }

          onDeath={(enemyPosition) => {

            setFinisherFlash(true);

            setShake(true);

            setHitStop(true);

            setShockwaves((prev) => [
              ...prev,

              {
                id: Date.now(),
                position: enemyPosition
              }
            ]);

            setTimeout(() => {

              setFinisherFlash(false);

              setShake(false);

              setHitStop(false);

            }, 300);

            const nextWave =
              wave + 1;

            setWave(nextWave);

            if (nextWave % 5 === 0) {

              setEnemyType("boss");

            } else if (
              nextWave % 3 === 0
            ) {

              setEnemyType("tank");

            } else if (
              nextWave % 2 === 0
            ) {

              setEnemyType("fast");

            } else {

              setEnemyType("normal");

            }

            setEnemyKey((prev) =>
              prev + 1
            );

          }}
        />

        {
          blasts.map((blast) => (

            <EnergyBlast
              key={blast.id}
              position={blast.position}
              direction={blast.direction}
              enemyRef={enemyRef}

              onDestroy={() => {

                setExplosions((prev) => [
                  ...prev,

                  {
                    id: Date.now(),

                    position:
                      blast.position
                  }
                ]);

                setBlasts((prev) =>
                  prev.filter(
                    (b) =>
                      b.id !== blast.id
                  )
                );

              }}
            />

          ))
        }

        {
          enemyProjectiles.map(
            (projectile) => (

              <EnemyProjectile
                key={projectile.id}
                position={
                  projectile.position
                }
                direction={
                  projectile.direction
                }
                playerRef={playerRef}

                onDestroy={() => {

                  setEnemyProjectiles(
                    (prev) =>
                      prev.filter(
                        (p) =>
                          p.id
                          !== projectile.id
                      )
                  );

                }}
              />

            )
          )
        }

        {
          explosions.map(
            (explosion) => (

              <ExplosionEffect
                key={explosion.id}
                position={
                  explosion.position
                }

                onFinish={() => {

                  setExplosions((prev) =>
                    prev.filter(
                      (e) =>
                        e.id
                        !== explosion.id
                    )
                  );

                }}
              />

            )
          )
        }

        {
          dashTrails.map((trail) => (

            <DashTrail
              key={trail.id}
              position={trail.position}

              onFinish={() => {

                setDashTrails((prev) =>
                  prev.filter(
                    (t) =>
                      t.id !== trail.id
                  )
                );

              }}
            />

          ))
        }

        {
          shockwaves.map(
            (shockwave) => (

              <Shockwave
                key={shockwave.id}
                position={
                  shockwave.position
                }

                onFinish={() => {

                  setShockwaves((prev) =>
                    prev.filter(
                      (s) =>
                        s.id
                        !== shockwave.id
                    )
                  );

                }}
              />

            )
          )
        }

        <ThirdPersonCamera
          target={playerRef}
          enemyRef={enemyRef}
          lockOn={lockOn}
          setLockOn={setLockOn}
          setCameraRotation={
            setCameraRotation
          }
        />

        <ScreenShake
          shake={shake}
        />

        <HitStop
          active={hitStop}
        />

        <EffectComposer>

          <Bloom
            intensity={
              isMobile
                ? 0.4
                : 0.8
            }
            luminanceThreshold={0.4}
            luminanceSmoothing={0.6}
          />

          <Vignette
            eskil={false}
            offset={0.1}
            darkness={1.2}
          />

        </EffectComposer>

      </Canvas>

      <HUD
        health={
          playerRef.current?.health || 0
        }

        wave={wave}

        combo={
          playerRef.current?.combo || 0
        }

        blastCooldown={
          playerRef.current
            ?.blastCooldown || 0
        }

        dashCooldown={
          playerRef.current
            ?.dashCooldown || 0
        }
      />

      <MobileControls />

      {
        paused &&
        <PauseMenu
          onResume={() =>
            setPaused(false)
          }
        />
      }

      {
        gameOver &&
        <GameOver
          wave={wave}

          onRestart={() => {
            window.location.reload();
          }}
        />
      }

      {
        finisherFlash &&
        <FinisherFlash />
      }

      {
        playerRef.current?.health <= 0 &&
        !gameOver &&
        setGameOver(true)
      }
    </>
  );
}
