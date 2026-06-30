"use client";

/**
 * HUD = "Heads-Up Display": the 2D UI drawn ON TOP of the 3D canvas (title,
 * controls hint). It's plain HTML/CSS positioned absolutely over the canvas —
 * NOT part of the 3D scene. `pointer-events-none` lets clicks pass through to
 * the world; we re-enable them only on the interactive card.
 */
export function Hud() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 font-sans text-white">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight drop-shadow">Aetheria</h1>
        <p className="text-sm text-white/80 drop-shadow">Phase 0 · walkable world</p>
      </header>

      <footer className="pointer-events-auto self-start rounded-lg bg-black/40 px-4 py-3 text-sm backdrop-blur">
        <p className="font-medium">Controls</p>
        <p className="text-white/80">
          <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> / arrows to move ·{" "}
          <kbd>Shift</kbd> to run
        </p>
      </footer>
    </div>
  );
}
