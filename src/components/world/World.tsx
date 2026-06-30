"use client";

import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Sky } from "@react-three/drei";
import { controlsMap } from "./controls";
import { Ground } from "./Ground";
import { Scenery } from "./Scenery";
import { Player } from "./Player";

/**
 * The 3D world. <Canvas> sets up the whole "film studio" for us:
 * Scene + Camera + Renderer + the render loop. Everything inside <Canvas>
 * is part of the 3D scene. <KeyboardControls> (outside Canvas) captures WASD
 * and makes it available to any component via useKeyboardControls().
 */
export default function World() {
  return (
    <KeyboardControls map={controlsMap}>
      <Canvas
        shadows // enable shadow rendering globally
        camera={{ position: [0, 6, 10], fov: 50 }} // starting viewpoint + lens width
      >
        {/* Sky-blue background + distance fog so far things fade out (hides edges). */}
        <color attach="background" args={["#bcd4e6"]} />
        <fog attach="fog" args={["#bcd4e6", 45, 130]} />

        {/* Lights: soft fill from everywhere + a "sun" that casts shadows. */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[25, 35, 15]}
          intensity={1.3}
          castShadow
          shadow-mapSize={[2048, 2048]} // shadow resolution (higher = crisper)
          shadow-camera-near={1}
          shadow-camera-far={120}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />

        {/* A realistic procedural sky, lit from the same direction as our sun. */}
        <Sky sunPosition={[25, 35, 15]} />

        {/* The world contents. */}
        <Ground />
        <Scenery />
        <Player />
      </Canvas>
    </KeyboardControls>
  );
}
