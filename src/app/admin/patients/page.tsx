"use client";

import { useEffect, useState } from "react";
import { User, Phone, Stethoscope, MapPin, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { fetchPatients, deletePatient, fetchNurses } from "@/lib/api";

type Patient = {
  id: number;
  patient_id: string;
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
  assigned_nurse?: number | null;
};

type Nurse = {
  id: number;
  full_name: string;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [patientsData, nursesData] = await Promise.all([
          fetchPatients(),
          fetchNurses(),
        ]);
        setPatients(Array.isArray(patientsData) ? patientsData : []);
        setNurses(Array.isArray(nursesData) ? nursesData : []);
      } catch (err: any) {
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getNurseName = (assigned_nurse?: number | { id: number; full_name: string } | null) => {
    if (!assigned_nurse) return "-";
  
    // If backend sends full object
    if (typeof assigned_nurse === "object") {
      return assigned_nurse.full_name || "-";
    }
  
    // If backend sends just an ID
    const nurse = nurses.find((n) => n.id === assigned_nurse);
    return nurse ? nurse.full_name : "-";
  };
  

  const filtered = patients.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (p.full_name || "").toLowerCase().includes(q) ||
      (p.patient_id || "").toLowerCase().includes(q) ||
      (p.illness_type || "").toLowerCase().includes(q) ||
      getNurseName(p.assigned_nurse).toLowerCase().includes(q) ||
      (p.contact || "").toLowerCase().includes(q) ||
      (p.location || "").toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this patient? This action cannot be undone.")) return;
    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err?.message || "Failed to delete patient");
    }
  };

  return (
    <main className="p-4 md:p-6 min-h-screen bg-gray-100">
      {/* Header with search + add button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-sky-700">Patients</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm md:text-base text-black"
          />
          <Link
            href="/admin/patients/create"
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm md:text-base"
          >
            + Add Patient
          </Link>
        </div>
      </div>

      {/* Table view (desktop) */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base text-black">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-3 py-3">Patient ID</th>
              <th className="px-3 py-3">Full Name</th>
              <th className="px-3 py-3">Age</th>
              <th className="px-3 py-3">Gender</th>
              <th className="px-3 py-3">Contact</th>
              <th className="px-3 py-3">Caregiver</th>
              <th className="px-3 py-3">Illness</th>
              <th className="px-3 py-3">Duration</th>
              <th className="px-3 py-3">Severity</th>
              <th className="px-3 py-3">Care Needed</th>
              <th className="px-3 py-3">Speciality</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">Time of Care</th>
              <th className="px-3 py-3">Rotations</th>
              <th className="px-3 py-3">Assigned Nurse</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={16} className="text-center py-6">
                  Loading patients...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={16} className="text-center py-6 text-red-600">
                  {error}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={16} className="text-center py-6 text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-3 py-2">{p.patient_id}</td>
                  <td className="px-3 py-2 font-medium">{p.full_name}</td>
                  <td className="px-3 py-2">{p.age ?? "-"}</td>
                  <td className="px-3 py-2">{p.gender ?? "-"}</td>
                  <td className="px-3 py-2">{p.contact ?? "-"}</td>
                  <td className="px-3 py-2">{p.caregiver_contact ?? "-"}</td>
                  <td className="px-3 py-2">{p.illness_type ?? "-"}</td>
                  <td className="px-3 py-2">{p.duration ?? "-"}</td>
                  <td className="px-3 py-2">{p.severity_level ?? "-"}</td>
                  <td className="px-3 py-2">{p.care_needed ?? "-"}</td>
                  <td className="px-3 py-2">{p.speciality_required ?? "-"}</td>
                  <td className="px-3 py-2">{p.location ?? "-"}</td>
                  <td className="px-3 py-2">{p.time_of_care ?? "-"}</td>
                  <td className="px-3 py-2">{p.rotations ?? "-"}</td>
                  <td className="px-3 py-2">{getNurseName(p.assigned_nurse)}</td>
                  <td className="px-3 py-2 space-x-2">
                    <Link
                      href={`/admin/patients/edit/${p.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card view (mobile) */}
      <div className="grid gap-4 md:hidden">
  {loading ? (
    <p className="text-center text-gray-500">Loading patients...</p>
  ) : error ? (
    <p className="text-center text-red-600">{error}</p>
  ) : filtered.length === 0 ? (
    <p className="text-center text-gray-500">No patients found.</p>
  ) : (
    filtered.map((p) => (
      <div
        key={p.id}
        className="bg-white shadow-md rounded-xl p-4 space-y-3 text-sm text-gray-800 border border-gray-100 hover:shadow-lg transition"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-sky-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            {p.full_name}
          </h2>
          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-md font-medium">
            ID: {p.patient_id}
          </span>
        </div>

        {/* Grid info */}
        <div className="grid grid-cols-2 gap-3">
          <p>
            <span className="font-medium">Age:</span> {p.age ?? "-"}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {p.gender ?? "-"}
          </p>
          <p className="flex items-center gap-1">
            <Phone className="w-4 h-4 text-gray-500" />
            {p.contact ?? "-"}
          </p>
          <p className="flex items-center gap-1">
            <Phone className="w-4 h-4 text-gray-500" />
            {p.caregiver_contact ?? "-"}
          </p>
          <p className="flex items-center gap-1">
            <Stethoscope className="w-4 h-4 text-gray-500" />
            {p.illness_type ?? "-"}
          </p>
          <p>
            <span className="font-medium">Duration:</span> {p.duration ?? "-"}
          </p>
          <p className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span
              className={`px-2 py-0.5 rounded-md text-xs ${
                p.severity_level === "severe"
                  ? "bg-red-100 text-red-700"
                  : p.severity_level === "moderate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {p.severity_level ?? "-"}
            </span>
          </p>
          <p>
            <span className="font-medium">Care:</span> {p.care_needed ?? "-"}
          </p>
          <p>
            <span className="font-medium">Speciality:</span>{" "}
            {p.speciality_required ?? "-"}
          </p>
          <p className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            {p.location ?? "-"}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            Nurse: {getNurseName(p.assigned_nurse)}
          </span>
          <div className="flex space-x-2">
            <Link
              href={`/admin/patients/edit/${p.id}`}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md text-xs font-medium"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
    </main>
  );
}
