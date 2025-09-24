// src/lib/api.ts
const isBrowser = typeof window !== "undefined";
const isLocal =
  isBrowser &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API_BASE = isLocal
  ? process.env.NEXT_PUBLIC_LOCAL_API_URL?.replace(/\/+$/, "")
  : process.env.NEXT_PUBLIC_PROD_API_URL?.replace(/\/+$/, "");

// --- TOKEN HELPERS ---
function getAccessToken(): string | null {
  return isBrowser ? sessionStorage.getItem("access") : null;
}

function getRefreshToken(): string | null {
  return isBrowser ? sessionStorage.getItem("refresh") : null;
}

function setTokens(access: string, refresh: string) {
  if (isBrowser) {
    sessionStorage.setItem("access", access);
    sessionStorage.setItem("refresh", refresh);
  }
}

function clearTokens() {
  if (isBrowser) {
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
  }
}

// --- LOGIN ---
export async function loginAdmin(user_id: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login/admin/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "Admin login failed");
  }

  const data = await res.json();

  // ✅ Read nested tokens from backend
  const access = data.tokens?.access;
  const refresh = data.tokens?.refresh;

  if (access && refresh) {
    setTokens(access, refresh); // store in sessionStorage
  } else {
    throw new Error("Login succeeded but tokens are missing");
  }

  return data;
}


// --- REFRESH TOKEN ---
async function refreshToken(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    clearTokens();
    return false;
  }

  const data = await res.json();
  if (data.access) {
    setTokens(data.access, refresh); // keep refresh token
    return true;
  }

  return false;
}

// --- AUTH FETCH ---
async function authFetch(url: string, options: RequestInit = {}) {
  let token = getAccessToken();

  // Always use a plain object for headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res = await fetch(url, { ...options, headers });

  // Try refreshing if 401
  if (res.status === 401 && getRefreshToken()) {
    const refreshed = await refreshToken();
    if (refreshed) {
      token = getAccessToken();
      if (token) headers["Authorization"] = `Bearer ${token}`;
      res = await fetch(url, { ...options, headers });
    } else {
      clearTokens();
    }
  }

  return res;
}

// --- APPOINTMENTS ---
export async function fetchAppointments() {
  const res = await authFetch(`${API_BASE}/appointments/`);
  if (!res.ok) throw new Error(`Failed to fetch appointments: ${res.status}`);
  return res.json();
}






