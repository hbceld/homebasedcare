"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nurseLogin } from "@/lib/api";

export default function NurseLoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await nurseLogin({ user_id: userId, password });
      // Expecting response = { access, refresh, user }

      if (!response.access || !response.user) {
        throw new Error("Login succeeded but missing token or user data");
      }

      // ✅ Store in sessionStorage so dashboard can read
      sessionStorage.setItem("access", response.access);
      sessionStorage.setItem("refresh", response.refresh || "");
      sessionStorage.setItem("user", JSON.stringify(response.user));

      // Redirect to nurse dashboard
      router.push("/nurse/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-sky-700 mb-6 text-center">
          Nurse Login
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-500 font-medium">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="border-b-2 border-gray-300 bg-transparent pb-2 pt-1 focus:border-sky-500 focus:outline-none text-gray-900 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-500 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-b-2 border-gray-300 bg-transparent pb-2 pt-1 focus:border-sky-500 focus:outline-none text-gray-900 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
