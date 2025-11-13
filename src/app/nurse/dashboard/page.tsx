"use client";
import { useEffect, useState } from "react";

interface Patient {
  id: number;
  user_id: string;
  full_name: string;
  age?: number | null;
  gender?: string | null;
  contact?: string | null;
  caregiver?: string | null;
  illness_type?: string | null;
  duration?: string | null;
  severity_level?: string | null;
  care_needed?: string | null;
  speciality_required?: string | null;
  location?: string | null;
  time_of_care?: string | null;
  rotations?: string | null;
  assigned_nurse?: number | null;
}

interface User {
  id: number;
  full_name: string;
}

interface ReportForm {
  report_type: string;
  shift: string;
  observations: string;
  care_provided: string;
  medication_given: string;
  vitals_recorded: string;
  recommendations: string;
  verified_by?: string; // store string (full name) to satisfy backend
}

const API_BASE = (
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_API_URL
)?.replace(/\/$/, "") || "";


// --- Local storage helpers (persist reports per-user) ---
const storageKeyForUser = (userId: number) => `nurse_reports_${userId}`;

function loadReportsFromStorage(userId: number) {
  try {
    const raw = localStorage.getItem(storageKeyForUser(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveReportsToStorage(userId: number, reports: any[]) {
  try {
    localStorage.setItem(storageKeyForUser(userId), JSON.stringify(reports));
  } catch {
    // ignore localStorage errors
  }
}

// Ensure a report object has a date_time field (fallbacks to other common fields or now)
function ensureReportHasDate(report: any) {
  if (!report) return report;
  if (report.date_time) return report;
  // try common alternatives returned by different backends
  if (report.date) report.date_time = report.date;
  else if (report.created_at) report.date_time = report.created_at;
  else if (report.timestamp) report.date_time = report.timestamp;
  else report.date_time = new Date().toISOString();
  return report;
}

// Fetch patients assigned to this nurse
async function getNursePatients(nurseId: number) {
  const token = sessionStorage.getItem("access");
  if (!token) {
    window.location.href = "/login/nurse";
    return [];
  }
  const headers: Record<string, string> = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };
  const res = await fetch(`${API_BASE}/nurses/${nurseId}/patients/`, { headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err.detail?.toLowerCase().includes("token") || err.detail?.toLowerCase().includes("not valid")) {
      alert("⚠️ Session expired. Please log in again.");
      sessionStorage.removeItem("access");
      sessionStorage.removeItem("user");
      window.location.href = "/login/nurse";
      return [];
    }
    throw new Error(err.detail || "Failed to fetch patients");
  }
  return res.json();
}

// Fetch reports created by this nurse
async function getNurseReports(nurseId: number) {
  const token = sessionStorage.getItem("access");
  if (!token) return [];
  const headers: Record<string, string> = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };
  const res = await fetch(`${API_BASE}/nurses/${nurseId}/reports/`, { headers });
  if (!res.ok) return [];
  const data = await res.json().catch(() => []);
  return Array.isArray(data) ? data : [];
}

// Create report (sends to backend) — ensure verified_by is string
async function createReport(data: any) {
  const token = sessionStorage.getItem("access");
  if (!token) {
    window.location.href = "/login/nurse";
    return;
  }

  const REPORT_TYPE_MAP: Record<string, string> = {
    daily: "daily",
    incident: "incident",
    progress: "progress",
    followup: "followup",
    discharge: "discharge",
  };
  const SHIFT_MAP: Record<string, string> = {
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  };

  // Verified_by must be a string — prefer provided string, else fallback to a friendly name
  const verifiedBy =
    typeof data.verified_by === "string" && data.verified_by.trim() !== ""
      ? data.verified_by
      : typeof data.verified_by === "number"
      ? String(data.verified_by)
      : "Eldoret Home-Based Care";

  const payload = {
    patient: Number(data.patient_id),
    report_type: REPORT_TYPE_MAP[data.report_type] || null,
    shift: SHIFT_MAP[data.shift] || null,
    observations: data.observations || "",
    care_provided: data.care_provided || "",
    medication_given: data.medication_given || "",
    vitals_recorded: data.vitals_recorded || "",
    recommendations: data.recommendations || "",
    created_by: Number(data.nurse_id),
    verified_by: verifiedBy,
    is_finalized: false,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const res = await fetch(`${API_BASE}/reports/create/`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("Report payload:", payload);
    console.error("Server response:", err);

    const errorMessages = Object.entries(err)
      .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
      .join("\n");

    throw new Error(errorMessages || "Failed to create report");
  }

  const created = await res.json().catch(() => ({}));
  return created;
}

// --- COMPONENT ---
export default function NurseDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<any[]>([]);

  const [form, setForm] = useState<ReportForm>({
    report_type: "",
    shift: "",
    observations: "",
    care_provided: "",
    medication_given: "",
    vitals_recorded: "",
    recommendations: "",
    verified_by: undefined,
  });

  useEffect(() => {
    // Expose selectedPatient for debugging
    console.log("Selected patient:", selectedPatient);
    (window as any).selectedPatient = selectedPatient;
  }, [selectedPatient]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    else window.location.href = "/login/nurse";
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);
      try {
        // 1) Load persisted reports from localStorage so UI shows instantly after refresh
        const cached = loadReportsFromStorage(user.id) || [];
        const normalizedCached = (Array.isArray(cached) ? cached : []).map((r: any) => ensureReportHasDate(r));
        setReports(normalizedCached);

        // 2) Fetch fresh patients & reports from server and merge (server preferred)
        const patientsData = await getNursePatients(user.id);
        setPatients(Array.isArray(patientsData) ? patientsData : []);

        const serverReports = await getNurseReports(user.id);
        const normalizedServer = (Array.isArray(serverReports) ? serverReports : []).map((r: any) => ensureReportHasDate(r));

        // Merge server reports with cached ones, preferring server entries.
        const merged: any[] = [];
        const seen = new Set<string>();
        const makeKey = (r: any) => (r.id ? `id:${r.id}` : r.pk ? `pk:${r.pk}` : r.date_time && r.patient ? `d:${r.date_time}-p:${r.patient}` : JSON.stringify(r));

        normalizedServer.forEach((r: any) => {
          const key = makeKey(r);
          if (!seen.has(key)) {
            seen.add(key);
            merged.push(ensureReportHasDate(r));
          }
        });

        normalizedCached.forEach((r: any) => {
          const key = makeKey(r);
          if (!seen.has(key)) {
            seen.add(key);
            merged.push(ensureReportHasDate(r));
          }
        });

        setReports(merged);
        saveReportsToStorage(user.id, merged);
      } catch (err: any) {
        alert("Failed to fetch data: " + (err?.message || err));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // keep verified_by as string (full name) in form state; the select below will supply user's full_name
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedPatient || !user) return;

    if (!selectedPatient.assigned_nurse) {
      alert("⚠️ No nurse assigned to this patient.");
      return;
    }

    // Build payload using string for verified_by (prefer the form value or fallback to user.full_name)
    const payload = {
      patient_id: selectedPatient.id,
      nurse_id: selectedPatient.assigned_nurse,
      verified_by: form.verified_by && String(form.verified_by).trim() !== "" ? form.verified_by : user.full_name,
      report_type: form.report_type || null,
      shift: form.shift || null,
      observations: form.observations || null,
      care_provided: form.care_provided || null,
      medication_given: form.medication_given || null,
      vitals_recorded: form.vitals_recorded || null,
      recommendations: form.recommendations || null,
    };

    try {
      const newReport = await createReport(payload);

      // Ensure date exists on created report; fallback to now if server didn't return one
      const reportWithDate = ensureReportHasDate(newReport || {
        patient: payload.patient_id,
        patient_name: selectedPatient.full_name,
        report_type: payload.report_type,
        shift: payload.shift,
        observations: payload.observations,
        care_provided: payload.care_provided,
        medication_given: payload.medication_given,
        vitals_recorded: payload.vitals_recorded,
        recommendations: payload.recommendations,
        verified_by: payload.verified_by,
        date_time: new Date().toISOString(),
      });

      // Add locally and persist
      setReports(prev => {
        const updated = [reportWithDate, ...prev];
        if (user) saveReportsToStorage(user.id, updated);
        return updated;
      });

      alert("✅ Report submitted successfully");
      setForm({
        report_type: "",
        shift: "",
        observations: "",
        care_provided: "",
        medication_given: "",
        vitals_recorded: "",
        recommendations: "",
        verified_by: undefined,
      });
      setSelectedPatient(null);
    } catch (err: any) {
      alert("❌ Failed: " + (err?.message || err));
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh", color: "#111", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Nurse Dashboard</h1>
      {loading ? <p>Loading patients...</p> :
        patients.length === 0 ? <p>No patients assigned yet.</p> :
          <div style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", letterSpacing: "1px", color: "#000" }}>Dial-a-Nurse</h1>
              <h2 style={{ margin: 0, fontSize: "1.2rem", color: "#333", fontStyle: "italic" }}>Gishu Homebased Care</h2>
              <hr style={{ marginTop: "1rem", border: "1px solid #000" }} />
            </div>

            {/* --- Create Report Form at the Top --- */}
            {selectedPatient && (
              <div style={{ background: "#fff", border: "1px solid #000", padding: "2rem", marginBottom: "2rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", maxWidth: "850px", marginLeft: "auto", marginRight: "auto", color: "#111", lineHeight: "1.6" }}>
                <h3 style={{ textAlign: "center", marginBottom: "1.5rem", textDecoration: "underline", fontSize: "1.3rem", fontWeight: "600" }}>
                  Create Report for {selectedPatient.full_name}
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label>Report Type *</label>
                    <select name="report_type" value={form.report_type} onChange={handleChange} style={{ width: "100%", padding: "0.5rem" }}>
                      <option value="">-- Select --</option>
                      <option value="daily">Daily Care Report</option>
                      <option value="incident">Incident Report</option>
                      <option value="progress">Progress Report</option>
                      <option value="followup">Follow-up Report</option>
                      <option value="discharge">Discharge/Completion Report</option>
                    </select>
                  </div>
                  <div>
                    <label>Shift *</label>
                    <select name="shift" value={form.shift} onChange={handleChange} style={{ width: "100%", padding: "0.5rem" }}>
                      <option value="">-- Select --</option>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                      <option value="night">Night</option>
                    </select>
                  </div>
                </div>

                <textarea name="observations" value={form.observations} onChange={handleChange} placeholder="Observations..." style={{ width: "100%", minHeight: "70px", marginTop: "1rem" }} />
                <textarea name="care_provided" value={form.care_provided} onChange={handleChange} placeholder="Care provided..." style={{ width: "100%", minHeight: "70px", marginTop: "1rem" }} />
                <textarea name="medication_given" value={form.medication_given} onChange={handleChange} placeholder="Medication given..." style={{ width: "100%", minHeight: "70px", marginTop: "1rem" }} />
                <textarea name="vitals_recorded" value={form.vitals_recorded} onChange={handleChange} placeholder="Vitals (nurse can type freely)..." style={{ width: "100%", minHeight: "70px", marginTop: "1rem" }} />
                <textarea name="recommendations" value={form.recommendations} onChange={handleChange} placeholder="Recommendations..." style={{ width: "100%", minHeight: "70px", marginTop: "1rem" }} />

                <div style={{ marginTop: "1rem" }}>
                  <label>Verified By</label>
                  {/* value is user's full name (string) so backend validation is satisfied, label unchanged */}
                  <select name="verified_by" value={form.verified_by ?? user.full_name} onChange={handleChange} style={{ width: "100%", padding: "0.5rem" }}>
                    <option value={user.full_name}>{user.full_name} (You)</option>
                  </select>
                </div>

                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                  <button onClick={handleSubmit} style={{ padding: "0.6rem 1.2rem", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem" }}>Submit Report</button>
                </div>
              </div>
            )}

            {/* --- Patient Records --- */}
            {patients.map(p => (
              <div key={p.id} style={{ background: "#fff", border: "1px solid #000", padding: "2rem", marginBottom: "2rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", maxWidth: "850px", marginLeft: "auto", marginRight: "auto", color: "#111", lineHeight: "1.6" }}>
                <h3 style={{ textAlign: "center", marginBottom: "1.5rem", textDecoration: "underline", fontSize: "1.3rem", fontWeight: "600" }}>Patient Medical Record</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "0.8rem", columnGap: "2rem" }}>
                  <p><strong>Patient ID:</strong> {p.user_id}</p>
                  <p><strong>Full Name:</strong> {p.full_name}</p>
                  <p><strong>Age:</strong> {p.age ?? "N/A"}</p>
                  <p><strong>Gender:</strong> {p.gender ?? "N/A"}</p>
                  <p><strong>Contact:</strong> {p.contact ?? "N/A"}</p>
                  <p><strong>Caregiver:</strong> {p.caregiver ?? "N/A"}</p>
                  <p><strong>Illness:</strong> {p.illness_type ?? "N/A"}</p>
                  <p><strong>Duration:</strong> {p.duration ?? "N/A"}</p>
                  <p><strong>Severity:</strong> {p.severity_level ?? "N/A"}</p>
                  <p><strong>Care Needed:</strong> {p.care_needed ?? "N/A"}</p>
                  <p><strong>Speciality:</strong> {p.speciality_required ?? "N/A"}</p>
                  <p><strong>Location:</strong> {p.location ?? "N/A"}</p>
                  <p><strong>Time of Care:</strong> {p.time_of_care ?? "N/A"}</p>
                  <p><strong>Rotations:</strong> {p.rotations ?? "N/A"}</p>
                  <p><strong>Assigned Nurse:</strong> {user.full_name}</p>
                </div>
                <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px dashed #444", textAlign: "center" }}>
                  <button onClick={() => setSelectedPatient(p)} style={{ padding: "0.6rem 1.2rem", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem" }}>+ Create Report</button>
                </div>
              </div>
            ))}

            {/* --- Nurse Reports --- */}
            {reports.length > 0 && (
              <div style={{ marginTop: "2rem", maxWidth: "850px", marginLeft: "auto", marginRight: "auto" }}>
                <h2 style={{ fontWeight: "bold", marginBottom: "1rem", textAlign: "center", fontSize: "1.3rem" }}>My Reports</h2>
                {reports.map((r, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#fff",
                      border: "1px solid #000",
                      padding: "1.5rem",
                      marginBottom: "1.5rem",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      color: "#111",
                      lineHeight: "1.6"
                    }}
                  >
                    <h3 style={{ textAlign: "center", marginBottom: "1rem", textDecoration: "underline", fontSize: "1.2rem", fontWeight: "600" }}>
                      Report ({r.report_type?.toUpperCase() || "N/A"})
                    </h3>

                    {/* Top section (metadata) */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "0.8rem", columnGap: "2rem" }}>
                      <p><strong>Date:</strong> {r.date_time ? new Date(r.date_time).toLocaleString() : "N/A"}</p>
                      <p><strong>Patient:</strong> {r.patient_name || r.patient}</p>
                      <p><strong>Shift:</strong> {r.shift || "N/A"}</p>
                      <p><strong>Verified By:</strong> {r.verified_by || "N/A"}</p>
                    </div>

                    {/* Details section (two-column grid for long text) */}
                    <div style={{ marginTop: "1rem", borderTop: "1px dashed #444", paddingTop: "1rem" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "1rem", columnGap: "2rem" }}>
                        <p><strong>Observations:</strong> {r.observations || "N/A"}</p>
                        <p><strong>Care Provided:</strong> {r.care_provided || "N/A"}</p>
                        <p><strong>Medication Given:</strong> {r.medication_given || "N/A"}</p>
                        <p><strong>Vitals:</strong> {r.vitals_recorded || "N/A"}</p>
                        <p style={{ gridColumn: "1 / span 2" }}>
                          <strong>Recommendations:</strong> {r.recommendations || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
      }
    </div>
  );
}
