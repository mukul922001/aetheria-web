import { WorldExperience } from "@/components/world/WorldExperience";

// This page stays a SERVER COMPONENT (the Next.js default — fast, no JS shipped
// for it). It simply renders the client-only world experience.
export default function Home() {
  return <WorldExperience />;
}
