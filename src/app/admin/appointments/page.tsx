"use client";

import { useEffect, useState } from "react";
import { fetchAppointments } from "@/lib/api";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (err: any) {
        if (err.message.includes("401") || err.message.includes("Unauthorized")) {
          sessionStorage.removeItem("access");
          sessionStorage.removeItem("refresh");
          router.push("/login/admin");
        } else {
          setError(err.message || "Failed to fetch appointments");
        }
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, [router]);

  const filteredAppointments = appointments.filter(
    (a) =>
      a.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      (a.nurse_name && a.nurse_name.toLowerCase().includes(search.toLowerCase())) ||
      a.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-4 sm:p-6 min-h-screen bg-black">
      <h1 className="text-3xl sm:text-4xl font-bold text-sky-700 mb-6 text-center sm:text-left">
        Appointments
      </h1>

      <div className="mb-6 flex justify-center sm:justify-start">
        <input
          type="text"
          placeholder="Search by patient, nurse, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Patient</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Nurse</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Date & Time</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Purpose</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Priority</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-blue-900">Status</th>
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
                <td colSpan={6} className="text-center py-6 text-gray-400 italic">
                  No appointments yet
                </td>
              </tr>
            ) : (
              filteredAppointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">{a.patient_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.nurse_name || "Unassigned"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.date_of_appointment} | {a.start_time} - {a.end_time || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.purpose}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.priority_level}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      a.status === "completed" ? "bg-green-100 text-green-800" :
                      a.status === "scheduled" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
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


