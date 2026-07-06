import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a minimal, self-contained server bundle (.next/standalone) so the Docker
  // runtime image only needs Node + the app, not the whole node_modules tree.
  output: "standalone",
};

export default nextConfig;
