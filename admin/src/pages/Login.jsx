import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DUMMY_USER = { username: "admin", password: "admin" };

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/dashboard";
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}
          <Button className="w-full" type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
