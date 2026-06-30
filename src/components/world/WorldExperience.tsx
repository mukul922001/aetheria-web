"use client";

import dynamic from "next/dynamic";
import { Hud } from "./Hud";

// The 3D canvas needs the browser's GPU (`window`), which doesn't exist on the
// server. So we load World ONLY on the client: ssr:false. Next.js 16 requires
// this to live inside a Client Component ("use client" above) — that's why this
// thin wrapper exists between the server page and the world.
const World = dynamic(() => import("./World"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#bcd4e6] text-white">
      Loading world…
    </div>
  ),
});

/** Full-screen container: the 3D world with the 2D HUD layered on top. */
export function WorldExperience() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <World />
      <Hud />
    </div>
  );
}
