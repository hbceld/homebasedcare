"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPatient, fetchNurses } from "@/lib/api"; // ✅ make sure fetchNurses exists

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
        const data = await fetchNurses(); // should return [{id:1, full_name:"Jane Doe"}, ...]
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
      // Normalize payload for backend
      const payload = {
        ...form,
        age: form.age ? parseInt(form.age, 10) : null,
        assigned_nurse: form.assigned_nurse
          ? parseInt(form.assigned_nurse, 10)
          : null,
        gender: form.gender || null,
        severity_level: form.severity_level || null,
        care_needed: form.care_needed || null,
        contact: form.contact || null,
        caregiver_contact: form.caregiver_contact || null,
        illness_type: form.illness_type || null,
        duration: form.duration || null,
        speciality_required: form.speciality_required || null,
        location: form.location || null,
        time_of_care: form.time_of_care || null,
        rotations: form.rotations || null,
      };

      console.log("Submitting payload:", payload);

      await createPatient(payload);
      router.push("/admin/patients");
    } catch (err: any) {
      if (err.response?.data) {
        console.error("Backend error:", err.response.data);
        setError(JSON.stringify(err.response.data));
      } else {
        setError(err.message || "Failed to create patient");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6">
        Add Patient
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-md p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
      >
        {/* User Info */}
        <input
          name="user_id"
          placeholder="User ID"
          value={form.user_id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        {/* Patient Details */}
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
        />
        <input
          name="caregiver_contact"
          placeholder="Caregiver Contact"
          value={form.caregiver_contact}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="illness_type"
          placeholder="Illness Type"
          value={form.illness_type}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="severity_level"
          value={form.severity_level}
          onChange={handleChange}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
        >
          <option value="">Select Care Type</option>
          <option value="general">General Care</option>
          <option value="palliative">Palliative Care</option>
          <option value="post_surgery">Post-Surgery</option>
          <option value="daily_monitoring">Daily Monitoring</option>
          <option value="specialized">Specialized Care</option>
        </select>

        <input
          name="speciality_required"
          placeholder="Speciality Required"
          value={form.speciality_required}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="time_of_care"
          placeholder="Time of Care"
          value={form.time_of_care}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="rotations"
          placeholder="Rotations"
          value={form.rotations}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Nurse Dropdown */}
        <select
          name="assigned_nurse"
          value={form.assigned_nurse}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Nurse</option>
          {nurses.map((nurse) => (
            <option key={nurse.id} value={nurse.id}>
              {nurse.full_name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-600 col-span-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md col-span-2 transition"
        >
          {loading ? "Saving..." : "Save Patient"}
        </button>
      </form>
    </main>
  );
}
