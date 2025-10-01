"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPatient, fetchNurses } from "@/lib/api";
import {
  User,
  Lock,
  Phone,
  Stethoscope,
  MapPin,
  Clock,
  Activity,
} from "lucide-react";

export default function CreatePatientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    user_id: "",
    full_name: "",
    password: "",
    age: "",
    gender: "",
    contact: "",
    caregiver_contact: "",
    illness_type: "",
    duration: "",
    severity_level: "",
    care_needed: "",
    speciality_required: "",
    location: "",
    time_of_care: "",
    rotations: "",
    assigned_nurse: "",
  });

  const [nurses, setNurses] = useState<{ id: number; full_name: string }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadNurses() {
      try {
        const data = await fetchNurses();
        setNurses(data);
      } catch (err) {
        console.error("Failed to fetch nurses:", err);
      }
    }
    loadNurses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        age: form.age ? parseInt(form.age, 10) : null,
        assigned_nurse: form.assigned_nurse
          ? parseInt(form.assigned_nurse, 10)
          : null,
      };

      await createPatient(payload);
      router.push("/admin/patients");
    } catch (err: any) {
      setError(err.message || "Failed to create patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-8 min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-sky-700 mb-8 text-center md:text-left">
          🏥 Add New Patient
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 shadow-lg rounded-2xl p-6 md:p-10 space-y-8"
        >
          {/* User Info */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-4 border-b pb-2">
              👤 User Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="user_id"
                placeholder="User ID"
                value={form.user_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-400 focus:outline-none text-black"
              />
              <input
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-400 focus:outline-none text-black"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-400 focus:outline-none text-black"
              />
            </div>
          </section>

          {/* Patient Details */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-4 border-b pb-2">
              🧑‍⚕️ Patient Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <input
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                name="contact"
                placeholder="Contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <input
                name="caregiver_contact"
                placeholder="Caregiver Contact"
                value={form.caregiver_contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          </section>

          {/* Medical Info */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-4 border-b pb-2">
              🩺 Medical Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <input
                name="illness_type"
                placeholder="Illness Type"
                value={form.illness_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <input
                name="duration"
                placeholder="Duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />

              <select
                name="severity_level"
                value={form.severity_level}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select Severity</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
                <option value="critical">Critical</option>
              </select>

              <select
                name="care_needed"
                value={form.care_needed}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select Care Type</option>
                <option value="general">General Care</option>
                <option value="palliative">Palliative Care</option>
                <option value="post_surgery">Post-Surgery</option>
                <option value="daily_monitoring">Daily Monitoring</option>
                <option value="specialized">Specialized Care</option>
              </select>
            </div>
          </section>

          {/* Care Assignments */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-4 border-b pb-2">
              📋 Care Assignments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <input
                name="speciality_required"
                placeholder="Speciality Required"
                value={form.speciality_required}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <input
                name="time_of_care"
                placeholder="Time of Care"
                value={form.time_of_care}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <input
                name="rotations"
                placeholder="Rotations"
                value={form.rotations}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <select
                name="assigned_nurse"
                value={form.assigned_nurse}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select Nurse</option>
                {nurses.map((nurse) => (
                  <option key={nurse.id} value={nurse.id}>
                    {nurse.full_name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Error */}
          {error && (
            <p className="text-red-600 font-medium text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-[1.01]"
          >
            {loading ? "Saving..." : "💾 Save Patient"}
          </button>
        </form>
      </div>
    </main>
  );
}
