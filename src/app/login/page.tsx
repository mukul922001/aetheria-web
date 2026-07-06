"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import type { MeResponse, ProblemDetail } from "@/lib/auth/types";

const TOKEN_KEY = "aetheria.token";

/**
 * A login screen that talks to the aetheria-auth service using the typed client
 * generated from the OpenAPI contract. On success it stores the JWT and calls
 * /users/me to prove the token works.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // POST /api/v1/auth/login — the body is type-checked against the contract.
    const { data, error: apiError } = await authClient.POST("/api/v1/auth/login", {
      body: { email, password },
    });

    if (apiError || !data) {
      setError((apiError as ProblemDetail | undefined)?.detail ?? "Login failed");
      setLoading(false);
      return;
    }

    localStorage.setItem(TOKEN_KEY, data.accessToken);

    // GET /api/v1/users/me with the bearer token to fetch our identity.
    const me = await authClient.GET("/api/v1/users/me", {
      headers: { Authorization: `Bearer ${data.accessToken}` },
    });
    if (me.data) setUser(me.data);
    setLoading(false);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setEmail("");
    setPassword("");
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-950 p-6 text-slate-100">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight">Aetheria</h1>
        <p className="mt-1 text-sm text-slate-400">
          {user ? "You're signed in." : "Sign in to enter the world."}
        </p>

        {user ? (
          <div className="mt-6 space-y-3">
            <div className="rounded-lg bg-slate-800/70 p-4 text-sm">
              <p className="text-slate-400">Signed in as</p>
              <p className="font-medium">{user.email}</p>
              <p className="mt-2 text-slate-400">Roles</p>
              <p className="font-mono text-xs">{user.roles.join(", ")}</p>
              <p className="mt-2 text-slate-400">User ID</p>
              <p className="break-all font-mono text-xs">{user.id}</p>
            </div>
            <button
              onClick={logout}
              className="w-full rounded-lg bg-slate-700 py-2.5 text-sm font-medium transition-colors hover:bg-slate-600"
            >
              Sign out
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-sky-500"
                placeholder="you@aetheria.io"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-sky-500"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-sky-600 py-2.5 text-sm font-medium transition-colors hover:bg-sky-500 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
