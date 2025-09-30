"use client";
import { useEffect, useState } from "react";

type AssignedNurseShape = { id: number; full_name?: string | null; _needsFetch?: boolean };

interface Patient {
  user_id: string;
  full_name: string;
  age?: number | null;
  gender?: string | null;
  contact?: string | null;
  caregiver_contact?: string | null;
  illness_type?: string | null;
  duration?: string | null;
  severity_level?: string | null;
  care_needed?: string | null;
  speciality_required?: string | null;
  location?: string | null;
  time_of_care?: string | null;
  rotations?: string | null;
  assigned_nurse?: number | AssignedNurseShape | null;
}

interface User {
  id: number;
  full_name: string;
  user_id: string;
}

interface NurseReport {
  id: number;
  report_type: string;
  shift: string;
  observations: string;
  care_provided: string;
  medication_given: string;
  vitals_recorded: string;
  recommendations: string;
  created_at: string;
  nurse?: { id: number; full_name: string } | null;
}

const API_BASE = (process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");

async function getPatientData(userId: number) {
  const token = sessionStorage.getItem("access");
  if (!token) {
    window.location.href = "/login/patient";
    return null;
  }

  const res = await fetch(`${API_BASE}/patients/${userId}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err.detail?.toLowerCase?.().includes("token")) {
      alert("⚠️ Session expired. Please log in again.");
      sessionStorage.removeItem("access");
      sessionStorage.removeItem("user");
      window.location.href = "/login/patient";
      return null;
    }
    throw new Error(err.detail || "Failed to fetch patient data");
  }

  return res.json();
}

async function getPatientReports() {
  const token = sessionStorage.getItem("access");
  if (!token) return [];
  const res = await fetch(`${API_BASE}/patients/reports/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return [];
  return res.json();
}

/** Try to fetch nurse details when only an ID was returned */
async function fetchNurseById(id: number) {
  const token = sessionStorage.getItem("access");
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/nurses/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    // Nurse endpoints might return { id, user: { full_name } } or { id, full_name }
    if (data?.user?.full_name) return String(data.user.full_name);
    if (data?.full_name) return String(data.full_name);
    return null;
  } catch (e) {
    console.warn("Failed to fetch nurse details:", e);
    return null;
  }
}

export default function PatientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [reports, setReports] = useState<NurseReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/login/patient";
      return;
    }

    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);

    const loadData = async () => {
      try {
        const raw = await getPatientData(parsedUser.id);
        console.log("RAW patient data from API:", raw);

        // Normalize assigned_nurse into consistent object shape
        const normalized: Patient | null = raw
          ? {
              ...raw,
              assigned_nurse: (() => {
                const an = raw.assigned_nurse;
                if (!an) return null;
                if (typeof an === "number") return { id: an, full_name: undefined, _needsFetch: true } as AssignedNurseShape;
                if (typeof an === "object") {
                  return { id: Number(an.id), full_name: an.full_name ?? null } as AssignedNurseShape;
                }
                return null;
              })(),
            }
          : null;

        console.log("NORMALIZED patient data:", normalized);
        setPatient(normalized);

        // If assigned_nurse was a number (we marked _needsFetch), try to fetch name
        if (normalized?.assigned_nurse && (normalized.assigned_nurse as AssignedNurseShape)._needsFetch) {
          const nid = (normalized.assigned_nurse as AssignedNurseShape).id;
          const name = await fetchNurseById(nid);
          if (name) {
            setPatient((prev) => (prev ? { ...prev, assigned_nurse: { id: nid, full_name: name } } : prev));
            console.log("Fetched nurse name for ID", nid, "->", name);
          } else {
            // keep nurse id but no name
            setPatient((prev) => (prev ? { ...prev, assigned_nurse: { id: nid, full_name: null } } : prev));
          }
        }

        const reportData = await getPatientReports();
        setReports(reportData);
      } catch (err: any) {
        console.error("Error loading patient data:", err);
        alert("Failed to fetch your data: " + (err?.message || err));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // compute the label once and always in scope (before any JSX usage)
  const assignedNurseDisplay = (() => {
    if (!patient?.assigned_nurse) return "Not assigned";
    if (typeof patient.assigned_nurse === "number") return `Nurse #${patient.assigned_nurse}`;
    const asObj = patient.assigned_nurse as AssignedNurseShape;
    if (asObj.full_name && String(asObj.full_name).trim().length > 0) return String(asObj.full_name);
    if (asObj.id) return `Nurse #${asObj.id}`;
    return "Not assigned";
  })();

  if (loading) return <p style={{ fontFamily: "Playfair Display, serif" }}>Loading your data...</p>;
  if (!patient || !user) return <p style={{ fontFamily: "Playfair Display, serif" }}>Unable to load patient data.</p>;

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        color: "#111",
        fontFamily: "Playfair Display, serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", letterSpacing: "1px", color: "#000" }}>
          Dial-a-Nurse
        </h1>
        <h2 style={{ margin: 0, fontSize: "1.2rem", color: "#333", fontStyle: "italic" }}>
          Gishu Homebased Care
        </h2>
        <hr style={{ marginTop: "1rem", border: "1px solid #000" }} />
      </div>

      {/* Patient medical record */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #000",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          maxWidth: "850px",
          marginLeft: "auto",
          marginRight: "auto",
          color: "#111",
          lineHeight: "1.6",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            textDecoration: "underline",
            fontSize: "1.3rem",
            fontWeight: "600",
          }}
        >
          Patient Medical Record
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "0.8rem", columnGap: "2rem" }}>
          <p><strong>Patient ID:</strong> {patient.user_id}</p>
          <p><strong>Full Name:</strong> {patient.full_name}</p>
          <p><strong>Age:</strong> {patient.age ?? "N/A"}</p>
          <p><strong>Gender:</strong> {patient.gender ?? "N/A"}</p>
          <p><strong>Contact:</strong> {patient.contact ?? "N/A"}</p>
          <p><strong>Caregiver:</strong> {patient.caregiver_contact ?? "N/A"}</p>
          <p><strong>Illness:</strong> {patient.illness_type ?? "N/A"}</p>
          <p><strong>Duration:</strong> {patient.duration ?? "N/A"}</p>
          <p><strong>Severity:</strong> {patient.severity_level ?? "N/A"}</p>
          <p><strong>Care Needed:</strong> {patient.care_needed ?? "N/A"}</p>
          <p><strong>Speciality:</strong> {patient.speciality_required ?? "N/A"}</p>
          <p><strong>Location:</strong> {patient.location ?? "N/A"}</p>
          <p><strong>Time of Care:</strong> {patient.time_of_care ?? "N/A"}</p>
          <p><strong>Rotations:</strong> {patient.rotations ?? "N/A"}</p>
          <p><strong>Assigned Nurse:</strong> {assignedNurseDisplay}</p>
        </div>
      </div>

      {/* Nurse reports */}
      {reports.length > 0 && (
        <div style={{ marginTop: "2rem", maxWidth: "850px", marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>Nurse Reports</h2>
          {reports.map((r) => (
            <div
              key={r.id}
              style={{
                background: "#fff",
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "6px",
              }}
            >
              <p><strong>Date:</strong> {new Date(r.created_at).toLocaleString()}</p>
              <p><strong>Report Type:</strong> {r.report_type}</p>
              <p><strong>Shift:</strong> {r.shift}</p>
              <p><strong>Observations:</strong> {r.observations}</p>
              <p><strong>Care Provided:</strong> {r.care_provided}</p>
              <p><strong>Medication Given:</strong> {r.medication_given}</p>
              <p><strong>Vitals:</strong> {r.vitals_recorded}</p>
              <p><strong>Recommendations:</strong> {r.recommendations}</p>
              <p><strong>Nurse:</strong> {r.nurse?.full_name ?? "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
