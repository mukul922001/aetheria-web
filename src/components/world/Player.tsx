"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { Controls } from "./controls";

// Movement tuning (units per second). We multiply by delta-time so speed is the
// SAME on a 30fps laptop and a 144fps gaming PC. Never move "per frame".
const WALK_SPEED = 5;
const RUN_MULTIPLIER = 2;

// How far behind/above the avatar the camera sits (third-person view).
const CAMERA_OFFSET = new THREE.Vector3(0, 6, 10);

/**
 * The player avatar: a capsule the user drives with WASD/arrows, with a
 * smoothly-following third-person camera. This is the seed of the
 * "client-side movement" we'll later make server-authoritative in Phase 2.
 */
export function Player() {
  // A ref to the <group> so we can move it imperatively every frame.
  const group = useRef<THREE.Group>(null);
  // useKeyboardControls returns [subscribe, get]. get() reads the live key state.
  const [, getKeys] = useKeyboardControls<Controls>();
  // useThree reaches into the engine; we want the camera so it can follow us.
  const { camera } = useThree();

  // Reusable scratch vectors. Creating new objects every frame causes
  // garbage-collection stutter, so we allocate once and reuse (senior habit).
  const moveDir = useMemo(() => new THREE.Vector3(), []);
  const desiredCamPos = useMemo(() => new THREE.Vector3(), []);

  // useFrame = the render loop. Runs ~60x/sec. `delta` = seconds since last frame.
  useFrame((_, delta) => {
    const avatar = group.current;
    if (!avatar) return;

    const { forward, back, left, right, run } = getKeys();

    // Turn pressed keys into a direction. (right - left) on X, (back - forward) on Z.
    moveDir.set(Number(right) - Number(left), 0, Number(back) - Number(forward));

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize(); // so diagonal movement isn't faster than straight
      const speed = WALK_SPEED * (run ? RUN_MULTIPLIER : 1) * delta;
      avatar.position.addScaledVector(moveDir, speed);
      // Rotate the avatar to face where it's walking (Y rotation, in radians).
      avatar.rotation.y = Math.atan2(moveDir.x, moveDir.z);
    }

    // Glide the camera toward "avatar position + offset". The Math.pow(...) makes
    // the smoothing frame-rate independent, so the follow feels identical anywhere.
    desiredCamPos.copy(avatar.position).add(CAMERA_OFFSET);
    camera.position.lerp(desiredCamPos, 1 - Math.pow(0.0015, delta));
    camera.lookAt(avatar.position.x, avatar.position.y + 1, avatar.position.z);
  });

  return (
    // A <group> is an invisible container — moving it moves everything inside.
    <group ref={group} position={[0, 0, 0]}>
      {/* Body: capsule shape + realistic skin. castShadow = it throws a shadow. */}
      <mesh castShadow position={[0, 1, 0]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="#4f9dff" />
      </mesh>
      {/* A small "nose" so you can see which way the avatar is facing. */}
      <mesh position={[0, 1.2, 0.55]} castShadow>
        <boxGeometry args={[0.18, 0.18, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
