import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { setAxiosAuthHeader } from "@/lib/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const API_LOGIN = `http://20.2.235.234:5000/auth/login`;

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    // Add padding if needed
    const padded = payload.padEnd(
      payload.length + ((4 - (payload.length % 4)) % 4),
      "="
    );
    const decoded = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    try {
      // Some environments require decodeURIComponent
      return JSON.parse(decodeURIComponent(escape(decoded)));
    } catch {
      return JSON.parse(decoded);
    }
  } catch (err) {
    return null;
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || `Login failed (${res.status})`);
      }

      if (!data.token) throw new Error("No token returned from server");

      // store token and user
      localStorage.setItem("token", data.token);
      // mark as logged in so ProtectedRoute works
      localStorage.setItem("isLoggedIn", "true");
      // set axios default header for subsequent requests
      try {
        setAxiosAuthHeader(axios);
      } catch (e) {
        // ignore if axios helper not available
      }
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      // decode token to get expiry (exp is in seconds)
      const payload = decodeJwt(data.token);
      if (payload && payload.exp) {
        const expMs = payload.exp * 1000;
        localStorage.setItem("token_exp", String(expMs));
      }

      // log and redirect to admin dashboard
      try {
        console.log("login success, token saved");
      } catch {}
      // use replace to avoid keeping login in history
      window.location.replace("/dashboard");
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full border rounded px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              className="w-full border rounded px-3 py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
