# Engineering G.ONE — Building a Stylized Combat Framework in Unity

> A technical breakdown of the architecture, combat systems, rendering decisions, optimization strategies, and gameplay engineering behind G.ONE — a stylized Unity combat project inspired by PS3-era arcade action games.

Built in Unity using C# with a fully modular combat-driven architecture focused on responsive gameplay systems, mobile deployment, and stylized arcade combat.

## The Idea

G.ONE began as a browser combat prototype and gradually evolved into a lightweight combat-engine architecture experiment.

The project focuses less on cinematic realism and more on gameplay readability, responsiveness, frame consistency, combat feedback, and scalable gameplay architecture inside Unity.

The design target was very specific:

* Fast arcade combat
* Aggressive visual readability
* Minimal latency input feel
* Heavy impact perception
* Mobile compatibility
* Modular combat architecture
* PS3-era stylized rendering aesthetics

Instead of attempting to simulate realism, the game intentionally exaggerates combat timing, screen-space effects, movement acceleration, and hit feedback.

This project was heavily inspired by the design language of older console action games where:

* effects were exaggerated
* animation timing mattered more than realism
* environments were atmospheric instead of photorealistic
* combat readability was prioritized over visual noise

The result is a custom combat framework disguised as a small arcade game.

---

# Why I Built It This Way

Most small action-game projects collapse into giant gameplay scripts extremely quickly.

Combat logic, enemy AI, camera behavior, effects, UI, and rendering all slowly fuse together into a single unmaintainable update loop.

I wanted to avoid that entirely.

So the project was built around one core principle:

> Separate gameplay systems aggressively.

Almost every major gameplay feature exists as an isolated module:

```txt
Input Layer
    ↓
Player State Machine
    ↓
Combat Systems
    ↓
Event Dispatch
    ↓
VFX Systems
    ↓
Camera Response
    ↓
HUD/UI Response
```

This separation prevents gameplay logic from collapsing into monolithic components.

The architecture intentionally avoids:

* giant update loops
* tightly coupled combat logic
* global mutable state
* mixed UI/rendering responsibilities
* physics-engine dependency lock-in

Instead, systems communicate through:

* state transitions
* event triggers
* isolated update responsibilities
* data-driven configuration

This makes iteration significantly faster.

For example:

* new VFX can be added without touching combat code
* enemy archetypes can be introduced without modifying the renderer
* wave behavior can be changed entirely from config objects
* mobile UI can evolve independently from gameplay logic

The goal was not just to "make a game work."

The goal was to engineer a reusable combat foundation.

---

# Opening Sequence

![Start Screen](./ScreenShots/Start.png)

# Gameplay Overview

Each wave escalates combat pressure through enemy composition, attack density, movement aggression, and spatial control.

```txt
[MAIN MENU]
      ↓
[WAVE 1 — BASIC ENEMIES]
      ↓
[WAVE 2 — FASTER + RANGED]
      ↓
[WAVE 3 — SHIELD ENEMIES]
      ↓
[MINI SWARM PHASE]
      ↓
[RA.ONE BOSS ENCOUNTER]
      ↓
[SCORE + RANK]
      ↓
[RESTART LOOP]
```

Combat pacing intentionally ramps non-linearly.

Early waves teach:

* movement
* spacing
* lock-on behavior
* projectile timing

Later waves stress:

* crowd control
* movement commitment
* target prioritization
* animation recovery windows
* camera awareness

Boss encounters shift the combat rhythm entirely.

Instead of increasing raw HP only, the boss alters:

* attack cadence
* projectile density
* movement aggression
* screen-space pressure
* VFX intensity
* camera pacing

This creates perceived escalation without requiring massive content volume.

---

# Main Menu

![Main Menu](./ScreenShots/MainG.One.png)

# The Arena

The arena was intentionally designed with low geometric complexity.

This decision was made for multiple reasons:

## 1. Gameplay Readability

A simplified environment ensures:

* enemy silhouettes remain visible
* energy attacks remain readable
* bloom does not visually drown gameplay
* combat spacing stays clear

## 2. GPU Stability on Mobile

Dense geometry in mobile mobile GPU environments introduces:

* fill-rate instability
* fragment overload
* memory pressure
* shader compilation spikes

The arena instead relies on:

* emissive materials
* contrast lighting
* bloom layering
* fog shaping
* post-processing

rather than raw polygon density.

## 3. Combat Framing

The environment acts as a stage.

Not a simulation.

The arena exists to frame combat silhouettes and energy attacks.

This is heavily inspired by PS3-era combat arenas where environmental simplicity amplified gameplay readability.

---

# Building the Combat Architecture

One of the earliest architectural decisions was separating gameplay simulation from presentation.

A hit should still register correctly regardless of:

* camera shake
* post-processing
* VFX load
* framerate fluctuations
* UI state

That meant the combat layer had to remain isolated from presentation systems.

```txt
controls.js
    ↓
Player FSM
    ↓
Attack Validation
    ↓
Collision Resolution
    ↓
Damage Pipeline
    ↓
Event Dispatch
    ↓
VFX / Camera / Audio Responses
```

This means combat logic remains deterministic even if rendering quality changes.

The combat layer does not care about:

* bloom
* particles
* camera shake
* audio
* HUD state

It only cares about:

* state transitions
* attack windows
* hit confirmation
* damage application
* invulnerability timing

Everything else is reactive.

---

# What You Can Do

| Action       | Mobile               | Desktop           |
| ------------ | -------------------- | ----------------- |
| Move         | Virtual Joystick     | WASD / Arrow Keys |
| Light Attack | Attack Button        | J                 |
| Heavy Attack | Heavy Button         | K                 |
| Energy Blast | Blast Button         | L                 |
| Dash         | Double-Tap Direction | Shift             |
| Lock-On      | Lock Button          | Tab               |
| Finisher     | Finisher Button      | F                 |
| Pause        | Pause Button         | Esc               |

---

# Combat Gameplay

![Combat](./ScreenShots/Action.png)

# Combat Feel Philosophy

The combat system prioritizes *perceived impact* over physical realism.

Most of the perceived weight comes from:

* hit-stop
* screen shake
* camera framing
* bloom pulses
* timing pauses
* animation interruption
* audio synchronization

The project intentionally uses exaggerated timing manipulation.

A hit that freezes the world for 3 frames feels dramatically heavier than one with realistic physics but no timing emphasis.

Live combat sequence — energy projectile impact during active combat loop.

The visual stack intentionally combines:

* bloom flashes
* trauma-based camera displacement
* emissive spikes
* hit-stop
* attack freeze frames
* HUD feedback

This layered feedback stack creates combat heaviness without requiring advanced animation systems.

---

# PS3-Era Visual Direction

The rendering direction intentionally avoids modern photorealism.

Instead, the visual language follows:

* deep contrast
* exaggerated bloom
* emissive neon edges
* aggressive post-processing
* atmospheric darkness
* arcade readability

The project deliberately recreates the feeling of:

* older console combat arenas
* stylized energy attacks
* bloom-heavy action games
* cinematic arcade fighters

Post-processing performs most of the visual lifting.

```txt
Scene Render
    ↓
HDR Buffer
    ↓
Bloom Extraction
    ↓
Chromatic Aberration
    ↓
Vignette Pass
    ↓
Final Composite
```

This allows the actual geometry to remain lightweight while preserving visual intensity.

---

# Engine + Technology Stack

| Layer             | Technology                   | Purpose                                                 |
| ----------------- | ---------------------------- | ------------------------------------------------------- |
| Engine            | Unity                        | Core rendering, gameplay framework, scene orchestration |
| Language          | C#                           | Gameplay systems, combat logic, AI, rendering tools     |
| Data Architecture | ScriptableObjects            | Data-driven enemy/wave/combat configuration             |
| Rendering         | Unity URP                    | Stylized post-processing and neon lighting              |
| Mobile Deployment | Android APK Pipeline         | Native Android builds                                   |
| Audio             | Unity Audio System           | Combat feedback + layered SFX                           |
| UI                | Unity Canvas UI              | HUD, mobile controls, overlays                          |
| Optimization      | Object Pooling + LOD Systems | Stable combat performance                               |

---|---|---|
| Framework | Unity 18 | Component-driven gameplay architecture |
| Renderer | Unity Rendering Pipeline r158 | mobile GPU rendering pipeline |
| Scene Bridge | Unity Three Fiber | Declarative rendering + lifecycle control |
| Effects | @react-three/postprocessing | Screen-space visual stack |
| UI | Unity Canvas UI | Decoupled UI rendering |
| Audio | Howler.js + Web Audio API | Lightweight audio management |
| Build System | Vite 5 | Fast iteration and optimized production builds |
| Mobile Packaging | Capacitor | Native Android deployment |
| Asset Pipeline | GLTF + Draco | Reduced mobile asset cost |
| Collision | Custom math-based system | Deterministic lightweight combat |

---

# Why Unity Was Chosen

The project was built entirely in Unity because the engine provides an ideal balance between:

* rapid gameplay iteration
* modular scene architecture
* mobile deployment support
* rendering flexibility
* scalable combat systems

Unity allowed the project to evolve from a small combat prototype into a larger gameplay architecture experiment.

The engine's component-based workflow made it possible to aggressively separate systems:

```txt
Combat Logic
    ↓
AI Systems
    ↓
Rendering
    ↓
UI
    ↓
VFX
```

This separation was critical for maintaining clean architecture as the combat systems became more complex.

Unity also enabled:

* Android deployment pipelines
* custom rendering control
* ScriptableObject-driven design
* modular gameplay composition
* scalable combat iteration

The project intentionally avoids relying heavily on premade gameplay frameworks.

Most gameplay systems were engineered manually in C#.

---

# Combat State Machine

The player controller is built around a finite-state machine.

```txt
IDLE
  ↓
MOVING
  ↓
ATTACKING
  ↓
RECOVERY
  ↓
IDLE
```

Additional branches:

```txt
MOVING → DASHING
MOVING → LOCK_ON
ATTACKING → HIT_STOP
ATTACKING → FINISHER
FINISHER → CINEMATIC_FLASH
```

FSMs were chosen because they provide:

* deterministic transitions
* predictable combat timing
* animation consistency
* interruption control
* reduced state ambiguity

Without FSM constraints, combat systems often suffer from:

* blended animation corruption
* overlapping attack states
* invalid movement behavior
* timing inconsistencies

The FSM guarantees:

> the player can never exist in multiple incompatible gameplay states simultaneously.

That alone dramatically improves combat responsiveness.

---

# FSM AI Breakdown

Enemy AI is also built as a finite-state machine.

This was a deliberate choice.

Behavior trees were unnecessary for the scale of gameplay.

FSMs provide:

* lower overhead
* easier debugging
* deterministic combat pacing
* highly readable enemy behavior

```txt
PATROL
   ↓
CHASE
   ↓
ATTACK
   ↓
RECOVER
   ↓
REPOSITION
```

Boss states extend the graph:

```txt
ATTACK
   ↓
RAGE_TRIGGER
   ↓
RAGE_LOOP
   ↓
PROJECTILE_BARRAGE
```

The AI pipeline intentionally prioritizes:

* responsiveness
* readability
* aggression pacing

rather than advanced navigation simulation.

This keeps combat tight and arcade-focused.

---

# Designing the Lock-On Camera

The camera system is one of the most important gameplay systems in the project.

A weak lock-on system destroys melee readability.

The camera architecture separates:

* free movement camera
* target framing
* combat centering
* trauma displacement
* cinematic transitions

```txt
Player Position
        +
Target Position
        ↓
Midpoint Solver
        ↓
Spring Damped Camera
        ↓
Look Target Resolution
```

The lock-on system dynamically frames:

* player silhouette
* enemy silhouette
* projectile readability
* dodge spacing

This dramatically improves combat clarity during crowded encounters.

The camera intentionally uses spring damping rather than hard snapping.

Hard snapping feels robotic.

Damped interpolation preserves cinematic motion.

---

# Building an Event-Driven Gameplay Pipeline

Gameplay systems communicate through lightweight event-style triggers.

```txt
Attack Lands
    ↓
Dispatch Combat Event
    ↓
Trigger:
    - HitStop
    - ScreenShake
    - Audio
    - Damage Numbers
    - HUD Flash
```

This separation prevents systems from directly depending on each other.

For example:

Combat logic does NOT know how screen shake works.

It simply dispatches:

```js
emit('HEAVY_HIT', payload)
```

The camera system independently reacts.

This architecture improves:

* modularity
* scalability
* debuggability
* feature iteration speed

---

# Why Object Pooling Became Mandatory

One of the most important optimization systems in the project is object pooling.

Projectile-heavy gameplay can destroy browser performance if objects are constantly allocated and destroyed.

Without pooling:

```txt
Spawn Projectile
    ↓
Allocate Memory
    ↓
Garbage Collection
    ↓
Frame Spike
```

With pooling:

```txt
Reuse Existing Object
    ↓
Reset State
    ↓
Unityivate
```

The pooling layer is used for:

* energy blasts
* enemy projectiles
* explosions
* shockwaves
* damage effects
* temporary particles

This significantly reduces:

* garbage collection spikes
* memory churn
* mobile frame instability

Object pooling is especially critical on Android WebViews where memory pressure becomes extremely visible.

---

# Rendering Pipeline Breakdown

```txt
Unity Three Fiber Canvas
    ↓
Scene Graph Construction
    ↓
Geometry + Material Submission
    ↓
Lighting Pass
    ↓
Transparent Objects
    ↓
Post-Processing Stack
    ↓
Unity Canvas UI HUD Overlay
```

The rendering architecture intentionally separates:

## World Rendering

Handled through Unity Rendering Pipeline/Unity Component System.

## UI Rendering

Handled through Unity Canvas UI.

This separation was critical.

---

# Why Unity Canvas UI Was Used For UI

Rendering UI directly inside Unity Rendering Pipeline creates unnecessary complexity.

Unity Rendering Pipeline is optimized for:

* meshes
* transforms
* shaders
* scene rendering

Not:

* menus
* accessibility
* responsive layouts
* mobile interaction layers

Using Unity Canvas UI for HUD/UI introduces major advantages:

## Accessibility

Standard HTML remains accessible.

## Mobile Responsiveness

CSS handles scaling naturally.

## Lower GPU Cost

UI does not consume mobile GPU draw calls.

## Easier Animation

CSS transitions outperform shader-based UI for simple overlays.

## Better Separation of Concerns

Gameplay rendering and interface rendering evolve independently.

This decision simplified the entire gameplay-engineering architecture.

---

# VFX Architecture

The effects layer is intentionally modular.

```txt
effects/
├── HitStop.jsx
├── ScreenShake.jsx
├── DashTrail.jsx
├── ExplosionEffect.jsx
├── Shockwave.jsx
└── FinisherFlash.jsx
```

Each effect:

* owns its own lifecycle
* updates independently
* destroys itself automatically
* reacts to gameplay events

This architecture enables effect composition.

Example:

```txt
Heavy Finisher
    ↓
Trigger:
    - HitStop
    - Shockwave
    - Bloom Pulse
    - Screen Flash
    - Camera Trauma
    - Audio Spike
```

No single monolithic effect controller is required.

Effects remain loosely coupled and highly tunable.

---

# Hit-Stop Implementation

Hit-stop is one of the defining combat systems.

```txt
Attack Connects
      ↓
Global Time Scale → 0
      ↓
Freeze World For 2–4 Frames
      ↓
Resume Simulation
```

This micro-freeze dramatically increases perceived impact.

The effect manipulates:

* enemy movement
* projectile simulation
* animation progression
* gameplay update flow

while preserving camera readability.

This technique originates from classic arcade fighting games.

It remains one of the most effective combat feel tools ever created.

---

# Wave Spawning Pipeline

The wave system is entirely data-driven.

```js
const WAVES = [
  {
    enemies: [
      { type: 'basic', count: 3 },
      { type: 'ranged', count: 2 }
    ]
  }
]
```

FightScene.jsx acts as an orchestrator.

Not an implementation layer.

Responsibilities:

* wave progression
* enemy spawning
* encounter timing
* transition pacing
* boss injection
* game-state routing

This architecture allows combat tuning entirely through configuration.

No core gameplay logic requires rewriting when encounter design changes.

---

# ScriptableObject-Inspired Data Design

Enemy archetypes and wave definitions follow a data-oriented approach inspired by Unity ScriptableObjects.

Instead of embedding combat constants directly into gameplay code:

```js
{
  type: 'shield',
  hp: 180,
  moveSpeed: 0.8,
  projectileCooldown: 1.2,
  staggerResistance: 0.5
}
```

This enables:

* faster balancing
* easier enemy iteration
* reusable archetypes
* configurable encounters

The architecture separates:

```txt
Behavior Logic
        FROM
Gameplay Data
```

This is critical for scalability.

---

# Combat Ranking System

The scoring/ranking layer is designed around combat expression.

Ranking factors include:

* damage efficiency
* combo continuity
* hit consistency
* survival time
* finisher usage
* dodge timing

Future extensions can integrate:

* style multipliers
* no-hit bonuses
* aggression scaling
* crowd-control weighting

The ranking system intentionally rewards:

> aggressive controlled combat.

Not passive survival.

---

# Optimizing for Android Without Killing Visual Style

Running mobile GPU combat systems inside Android WebViews introduces major constraints.

The optimization layer was built specifically around:

* thermal throttling
* GPU memory limits
* inconsistent refresh rates
* shader compilation spikes
* battery drain

The project dynamically scales:

```txt
Device Tier Detection
      ↓
Quality Profile Selection
      ↓
Renderer Adjustment
```

Possible runtime adjustments:

* bloom reduction
* shadow disable
* post-processing downgrade
* particle count reduction
* texture resolution reduction

---

# The Reality of Mobile Rendering Constraints

Mobile mobile GPU is extremely sensitive to:

* overdraw
* transparent materials
* fill rate
* fragment shader cost
* framebuffer bandwidth

The project intentionally avoids:

* expensive real-time shadows
* high-poly environments
* physically based realism pipelines
* unnecessary transparency layers

Instead it leans on:

* emissive tricks
* contrast lighting
* bloom amplification
* simplified geometry
* stylized rendering

This preserves combat readability while maintaining stable framerate.

---

# Memory Management and Runtime Stability

Memory stability was treated as a first-class concern.

The architecture aggressively minimizes:

* runtime allocation
* object churn
* temporary geometry creation
* shader recompilation

Strategies include:

## Object Pooling

Reuse instead of recreate.

## GLTF Preloading

Prevent runtime loading stalls.

## Shared Materials

Reduce GPU memory duplication.

## Instanced Rendering

Reduce draw calls.

## Controlled Post-Processing

Avoid framebuffer explosion on weaker devices.

---

# Performance Optimization Strategies

## Instanced Rendering

Enemies sharing geometry are rendered using InstancedMesh.

```txt
Without Instancing:
10 Enemies = 10 Draw Calls

With Instancing:
10 Enemies = 1 Draw Call
```

## Level of Detail

```txt
Near Camera   → High Detail
Mid Distance  → Simplified Mesh
Far Distance  → Culled
```

## Shadow Budgeting

Only a single low-resolution directional shadow is enabled on high-tier devices.

## Conditional Effects

Post-processing scales dynamically based on device capability.

---

# Scene Orchestration and System Ownership

FightScene.jsx behaves like a director.

Not a gameplay implementation blob.

Responsibilities:

```txt
Wave Management
Boss Timing
State Routing
Encounter Flow
Victory Conditions
UI Transitioning
```

The scene layer imports systems.

It does not own their logic.

This keeps orchestration clean and maintainable.

---

# Project Structure and Engine Organization

```txt
ScriptableObjects/
├── AttackData.cs
├── EnemyData.cs
└── WaveData.cs

Scripts/
├── Audio/
│   └── AudioManager.cs
│
├── Camera/
│   ├── CameraShake.cs
│   ├── LockOnCamera.cs
│   └── ThirdPersonCamera.cs
│
├── Combat/
│   ├── AdvancedComboSystem.cs
│   ├── AirComboManager.cs
│   ├── AirLaunch.cs
│   ├── BlastAttack.cs
│   ├── BlockSystem.cs
│   ├── CombatController.cs
│   ├── CombatFinisherCamera.cs
│   ├── CombatRankSystem.cs
│   ├── ComboSystem.cs
│   ├── CounterAttack.cs
│   ├── DamageData.cs
│   ├── EnemyProjectile.cs
│   ├── EnemyStagger.cs
│   ├── FinisherSystem.cs
│   ├── HeavyAttack.cs
│   ├── HitUnityionController.cs
│   ├── HitStop.cs
│   ├── IDamageable.cs
│   ├── LockOnSystem.cs
│   ├── ParrySystem.cs
│   ├── PerfectDodge.cs
│   └── Projectile.cs
│
├── Core/
│   ├── APKBuilder.cs
│   ├── AchievementSystem.cs
│   ├── AdaptiveQuality.cs
│   ├── AndroidHaptics.cs
│   ├── AsyncSceneLoader.cs
│   ├── BootManager.cs
│   ├── BossAI.cs
│   ├── BossHealthBar.cs
│   ├── BossIntro.cs
│   ├── CheckpointSystem.cs
│   ├── ControllerSupport.cs
│   ├── CurrencySystem.cs
│   ├── DailyRewardSystem.cs
│   ├── DialogueSystem.cs
│   ├── EventManager.cs
│   ├── GameManager.cs
│   ├── GameOverManager.cs
│   ├── InputManager.cs
│   ├── LODManager.cs
│   ├── LeaderboardSystem.cs
│   ├── LoadingScreen.cs
│   ├── MainMenuManager.cs
│   ├── MemoryCleanup.cs
│   ├── ObjectPoolManager.cs
│   ├── PerformanceManager.cs
│   ├── QuestSystem.cs
│   ├── ResolutionManager.cs
│   ├── SaveSystem.cs
│   ├── SceneLoader.cs
│   ├── ServiceLocator.cs
│   ├── SkillTree.cs
│   ├── SlowMotion.cs
│   ├── StatsTracker.cs
│   ├── WaveManager.cs
│   └── XPSystem.cs
│
├── Enemy/
│   ├── AttackState.cs
│   ├── BaseState.cs
│   ├── BossProjectileAttack.cs
│   ├── ChaseState.cs
│   ├── EnemyAI.cs
│   ├── EnemyArmorSystem.cs
│   ├── EnemyDodgeAI.cs
│   ├── EnemySpawner.cs
│   ├── EnemyStateMachine.cs
│   ├── IdleState.cs
│   └── RangedEnemyAI.cs
│
├── Player/
│   ├── PlayerController.cs
│   └── PlayerStats.cs
│
├── UI/
│   ├── AnimatedMainMenu.cs
│   ├── CharacterSelection.cs
│   ├── ComboCounterUI.cs
│   ├── DamageFlashUI.cs
│   ├── FPSCounter.cs
│   ├── HUDAnimator.cs
│   ├── HUDController.cs
│   ├── MobileControls.cs
│   ├── PauseMenu.cs
│   ├── SettingsMenu.cs
│   ├── ShopMenu.cs
│   ├── VirtualJoystick.cs
│   └── WaveAnnouncement.cs
│
├── VFX/
│   ├── DamagePopup.cs
│   ├── DashTrail.cs
│   ├── EnemyFlash.cs
│   ├── EnergyExplosion.cs
│   ├── EnergyTrail.cs
│   ├── FinisherFlash.cs
│   ├── GPUParticleExplosion.cs
│   ├── ImpactSpark.cs
│   ├── NeonArenaGenerator.cs
│   └── Shockwave.cs
│
├── ScreenShots/
└── README.md
```

The folder structure intentionally mirrors engine-style separation.

Each domain owns exactly one responsibility.

---

# Why Aggressive Separation of Concerns Matters

One of the core architectural rules of the project:

> systems should know as little about each other as possible.

Examples:

## Fighter.jsx

Knows:

* movement
* attack timing
* state transitions
* health

Does NOT know:

* camera shake
* UI rendering
* bloom intensity
* audio mixing

## EnergyBlast.jsx

Knows:

* movement
* collision
* despawn timing

Does NOT know:

* wave progression
* score systems
* HUD state

This drastically improves maintainability.

---

# Audio Feedback and Combat Timing

Audio feedback is synchronized tightly with gameplay timing.

The system uses:

* layered hit sounds
* impact spikes
* dash audio cues
* finisher emphasis
* boss rage transitions

Audio events trigger directly from gameplay events.

The sound layer intentionally exaggerates attack impact timing.

---

# Procedural Animation Instead of Heavy Animation Pipelines

The project currently relies primarily on procedural animation logic.

This was intentional.

Advantages:

* rapid iteration
* no dependency on external rigs
* gameplay-first tuning
* low asset overhead

Combat timing could be adjusted instantly through code.

This accelerated combat iteration significantly during development.

---

# Systems I Designed the Architecture Around

Potential future systems:

* combo cancel trees
* animation blending graphs
* deterministic rollback multiplayer
* ECS-style enemy batching
* advanced projectile scripting
* dynamic arena hazards
* cinematic finishers
* replay systems
* GPU particle simulation

The current architecture was intentionally designed to allow these systems to slot in incrementally.

---

# ScreenShots

./ScreenShots/MainG.One.png
./ScreenShots/Action.png
./ScreenShots/Start.png
---

Built by C.Kumaran
