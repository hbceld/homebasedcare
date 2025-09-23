"use client";

import { useEffect, useState } from "react";
import { fetchAppointments } from "@/lib/api";

type Appointment = {
  id: number;
  appointment_id: string;
  patient_name: string;
  nurse_name: string | null;
  date_of_appointment: string;
  start_time: string;
  end_time: string | null;
  purpose: string;
  status: string;
  priority_level: string;
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const filteredAppointments = appointments.filter(
    (a) =>
      a.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      (a.nurse_name && a.nurse_name.toLowerCase().includes(search.toLowerCase())) ||
      a.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Appointments</h1>

      <input
        type="text"
        placeholder="Search by patient, nurse, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full md:w-1/2 border-b border-gray-300 bg-transparent px-2 py-2 text-sm focus:outline-none focus:border-sky-500"
      />

      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Patient</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nurse</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date & Time</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Purpose</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Priority</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Loading appointments...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-red-600">
                  {error}
                </td>
              </tr>
            ) : filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">{a.patient_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.nurse_name || "Unassigned"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {a.date_of_appointment} | {a.start_time} - {a.end_time || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.purpose}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.priority_level}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        a.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : a.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}


