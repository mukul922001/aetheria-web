import createClient from "openapi-fetch";
import type { paths } from "@/generated/auth/schema";

// Base URL of the auth service. It's a browser client, so the var must be prefixed
// NEXT_PUBLIC_ to be exposed to the browser (12-Factor config).
const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:8081";

/**
 * A fully-typed fetch client GENERATED from the OpenAPI contract (aetheria-contracts).
 * Every path, request body, and response is type-checked against the contract — if the
 * contract changes and we regenerate, TypeScript flags any mismatch here at build time.
 * That's the payoff of contract-first + code generation.
 */
export const authClient = createClient<paths>({ baseUrl: AUTH_BASE_URL });
