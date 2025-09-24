"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    user_id: "",
    full_name: "",
    password: "",
    age: "",
    qualification: "",
    license_number: "",
    gender: "male",
    telephone: "",
    email: "",
    speciality: "",
    years_of_experience: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/nurses/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create nurse");
      router.push("/admin/nurses");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Add Nurse</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-md space-y-4">
        {error && <p className="text-red-600">{error}</p>}

        <input name="user_id" placeholder="User ID" value={form.user_id} onChange={handleChange} required className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        <input name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange} className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        <input name="license_number" placeholder="License Number" value={form.license_number} onChange={handleChange} className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        
        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input name="telephone" placeholder="Telephone" value={form.telephone} onChange={handleChange} className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        <input name="speciality" placeholder="Speciality" value={form.speciality} onChange={handleChange} className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>
        <input name="years_of_experience" type="number" placeholder="Years of Experience" value={form.years_of_experience} onChange={handleChange} className="w-full border-b py-2 px-1 focus:outline-none focus:border-sky-500"/>

        <button type="submit" disabled={loading} className="bg-sky-600 text-white px-4 py-2 rounded-md">
          {loading ? "Adding..." : "Add Nurse"}
        </button>
      </form>
    </main>
  );
}
