// src/lib/api.ts

//admin log
// src/lib/api.ts

// Detect if running locally or in production
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API_BASE = isLocal
  ? process.env.NEXT_PUBLIC_LOCAL_API_URL
  : process.env.NEXT_PUBLIC_PROD_API_URL;

export async function loginAdmin(user_id: string, password: string) {
  const res = await fetch(`${API_BASE?.replace(/\/+$/, "")}/auth/login/admin/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, password }), // ✅ matches your backend's USERNAME_FIELD
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      data?.detail ||
        data?.user_id || // ✅ backend sends errors with "user_id"
        data?.password ||
        "Admin login failed"
    );
  }

  return res.json();
}

export async function fetchAppointments() {
  const res = await fetch(`${API_BASE?.replace(/\/+$/, "")}/appointments/`);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}







