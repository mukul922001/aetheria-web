"use client";

import { Grid } from "@react-three/drei";

/**
 * The floor of the world: a large flat plane plus a reference grid so movement
 * is visible. The plane is rotated flat (planes are born standing up, facing +Z).
 */
export function Ground() {
  return (
    <>
      {/* A 200x200 plane. rotation-x = -90deg (−π/2) lays it flat on the ground.
          receiveShadow = shadows from other objects land on it. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#3f6b3f" />
      </mesh>

      {/* drei's Grid: a helper showing 1-unit cells and 10-unit sections, fading
          into the distance. Lifted 0.01 up so it doesn't z-fight the plane. */}
      <Grid
        args={[200, 200]}
        position={[0, 0.01, 0]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#4a4a4a"
        sectionSize={10}
        sectionThickness={1.2}
        sectionColor="#6f8f6f"
        fadeDistance={90}
        fadeStrength={1}
        infiniteGrid
      />
    </>
  );
}
