"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Corrected endpoint
const API_BASE =
  process.env.NEXT_PUBLIC_PROD_API_URL?.replace(/\/+$/, "") ||
  "https://homebasedcarebackend.onrender.com/api";

async function patientLogin({ user_id, password }: { user_id: string; password: string }) {
  const res = await fetch(`${API_BASE}/patients/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Login failed");
  }

  return res.json();
}


export default function PatientLoginPage() {
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
      const response = await patientLogin({ user_id: userId, password });

      if (!response.access || !response.user) {
        throw new Error("Login succeeded but missing token or user data");
      }

      // ✅ Store JWT tokens and user info
      sessionStorage.setItem("access", response.access);
      sessionStorage.setItem("refresh", response.refresh || "");
      sessionStorage.setItem("user", JSON.stringify(response.user));

      // ✅ Redirect to patient dashboard
      router.push("/patient/dashboard");
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
          Patient Login
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-500 font-medium">Username</label>
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
