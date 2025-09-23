"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginAdmin(userId, password);
      alert("Login successful! Welcome, " + data.user_id);
      // Redirect to the new admin dashboard page
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-sky-700 mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* User ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              User ID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full border-b border-gray-300 bg-transparent px-1 py-2 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-gray-300 bg-transparent px-1 py-2 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-sky-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

