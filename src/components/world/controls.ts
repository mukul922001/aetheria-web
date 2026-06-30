// Keyboard control scheme for moving the avatar.
// We map intent ("forward") to physical keys (W / ArrowUp). Decoupling intent from
// keys is good design: rebinding keys later never touches movement logic.

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  run = "run",
}

// drei's <KeyboardControls> expects [{ name, keys }]. Each control can have multiple keys.
export const controlsMap = [
  { name: Controls.forward, keys: ["KeyW", "ArrowUp"] },
  { name: Controls.back, keys: ["KeyS", "ArrowDown"] },
  { name: Controls.left, keys: ["KeyA", "ArrowLeft"] },
  { name: Controls.right, keys: ["KeyD", "ArrowRight"] },
  { name: Controls.run, keys: ["ShiftLeft", "ShiftRight"] },
];
