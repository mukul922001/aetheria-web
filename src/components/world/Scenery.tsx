"use client";

// Notice the pattern: scenery is described as DATA (arrays below), not hard-coded
// JSX. This is the "data-driven content" principle from DESIGN.md §4 — later, this
// data will come from the server/DB so we can extend the map without code changes.

type Vec3 = [number, number, number];

const BUILDINGS: { pos: Vec3; size: Vec3; color: string }[] = [
  { pos: [-12, 0, -10], size: [4, 6, 4], color: "#b9a07a" },
  { pos: [14, 0, -6], size: [5, 4, 5], color: "#a98f6b" },
  { pos: [8, 0, 14], size: [3, 8, 3], color: "#c2b294" },
  { pos: [-16, 0, 12], size: [6, 3, 4], color: "#9c8159" },
];

const TREES: Vec3[] = [
  [5, 0, -14],
  [-6, 0, -6],
  [18, 0, 8],
  [-14, 0, -2],
  [10, 0, -2],
  [-4, 0, 16],
];

/** A simple tree: a brown trunk (cylinder) topped with green leaves (cone). */
function Tree({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 2, 8]} />
        <meshStandardMaterial color="#6b4a2b" />
      </mesh>
      <mesh castShadow position={[0, 2.6, 0]}>
        <coneGeometry args={[1.3, 2.4, 10]} />
        <meshStandardMaterial color="#2f6b3a" />
      </mesh>
    </group>
  );
}

/** All the static props in the world, rendered from the data arrays above. */
export function Scenery() {
  return (
    <>
      {BUILDINGS.map((b, i) => (
        // Box buildings. Position y = half the height so they sit ON the ground.
        <mesh key={`b${i}`} position={[b.pos[0], b.size[1] / 2, b.pos[2]]} castShadow receiveShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial color={b.color} />
        </mesh>
      ))}
      {TREES.map((pos, i) => (
        <Tree key={`t${i}`} position={pos} />
      ))}
    </>
  );
}
