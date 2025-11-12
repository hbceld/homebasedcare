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
    credentials: "include",
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

// --- NURSES ---
export async function fetchNurses() {
  const res = await authFetch(`${API_BASE}/nurses/`); // fixed endpoint
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to fetch nurses: ${res.status}`);
  }
  return res.json(); // returns array of nurses
}

export async function deleteNurse(id: number) {
  const res = await authFetch(`${API_BASE}/nurses/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to delete nurse: ${res.status}`);
  }

  return true;
}



// --- NURSES ---
// Create a new nurse
export async function createNurse(formData: any) {
  const res = await authFetch(`${API_BASE}/nurses/create/`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to create nurse: ${res.status}`);
  }

  return res.json();
}


// --- PATIENTS ---
// Fetch all patients
export async function fetchPatients() {
  const res = await authFetch(`${API_BASE}/patients/`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to fetch patients: ${res.status}`);
  }
  return res.json(); // returns array of patients
}

// Create a new patient
// Create a new patient
export async function createPatient(formData: any) {
  const res = await authFetch(`${API_BASE}/patients/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // <-- VERY important
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      JSON.stringify(data) || `Failed to create patient: ${res.status}`
    );
  }
  return res.json();
}


// Delete patient
export async function deletePatient(id: number) {
  const res = await authFetch(`${API_BASE}/patients/delete/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to delete patient: ${res.status}`);
  }
  return true;
}

// --- BILLING ---

// Fetch all billings
export async function fetchBillings() {
  const res = await authFetch(`${API_BASE}/billing/billings/`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to fetch billings: ${res.status}`);
  }
  return res.json();
}

// Create a new billing
export async function createBilling(formData: any) {
  const res = await authFetch(`${API_BASE}/billing/billings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to create billing: ${res.status}`);
  }
  return res.json();
}

// Fetch single billing
export async function fetchBilling(id: string) {
  const res = await authFetch(`${API_BASE}/billing/billings/${id}/`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to fetch billing: ${res.status}`);
  }
  return res.json();
}

// Delete billing
export async function deleteBilling(id: string) {
  const res = await authFetch(`${API_BASE}/billing/billings/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to delete billing: ${res.status}`);
  }
  return true;
}

export async function updateInvoiceStatus(id: string, status: string) {
  const res = await authFetch(`${API_BASE}/billing/billings/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payment_status: status }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "Failed to update billing status");
  }
  return res.json();
}


export async function markBillingPaid(id: string) {
  const res = await fetch(`http://localhost:8000/api/billings/${id}/mark_paid/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to mark billing as paid");
  return res.json();
}

// --- REPORTS ---
export async function fetchReports() {
  const res = await authFetch(`${API_BASE}/reports/`); // remove extra /api
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to fetch reports: ${res.status}`);
  }
  return res.json(); // returns array of reports
}

export async function fetchReport(id: string) {
  const res = await authFetch(`${API_BASE}/reports/${id}/`); // remove extra /api
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to fetch report: ${res.status}`);
  }
  return res.json(); // returns report object
}

// Create
export async function createReport(formData: any) {
  const res = await authFetch(`${API_BASE}/reports/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to create report: ${res.status}`);
  }
  return res.json();
}

// Update
export async function updateReport(id: string, formData: any) {
  const res = await authFetch(`${API_BASE}/reports/update/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to update report: ${res.status}`);
  }
  return res.json();
}

// Delete
export async function deleteReport(id: string) {
  const res = await authFetch(`${API_BASE}/reports/delete/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || `Failed to delete report: ${res.status}`);
  }
  return true;
}

// lib/api.ts
const baseUrl =
  process.env.NEXT_PUBLIC_LOCAL_API_URL ||
  process.env.NEXT_PUBLIC_PROD_API_URL ||
  "http://127.0.0.1:8000/api"; // fallback

export async function nurseLogin(data: { user_id: string; password: string }) {
  const res = await fetch(`${baseUrl}/nurses/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Invalid username or password");
  }

  return res.json();
}


// Fetch patients assigned to a specific nurse
// lib/api.ts
// lib/api.ts

export async function getNursePatients(nurseId: number) {
  const API_BASE = process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://127.0.0.1:8000/api"; // <-- only one /api

  const res = await fetch(`${API_BASE}/nurses/${nurseId}/patients/`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to fetch assigned patients");
  }

  return res.json();
}




export async function patientLogin({ user_id, password }: { user_id: string; password: string }) {
  const res = await fetch("http://localhost:8000/api/patients/login/", {  // ✅ corrected
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







