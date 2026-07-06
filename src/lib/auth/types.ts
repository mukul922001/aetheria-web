import type { components } from "@/generated/auth/schema";

// Convenient aliases for the schemas defined in the OpenAPI contract.
export type LoginResponse = components["schemas"]["LoginResponse"];
export type UserResponse = components["schemas"]["UserResponse"];
export type MeResponse = components["schemas"]["MeResponse"];
export type ProblemDetail = components["schemas"]["ProblemDetail"];
