"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNurse } from "@/lib/api"; // <-- added import

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

  // <-- updated handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createNurse(form); // call backend via lib/api.ts
      router.push("/admin/nurses");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    { name: "user_id", label: "User ID", type: "text" },
    { name: "full_name", label: "Full Name", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "age", label: "Age", type: "number" },
    { name: "qualification", label: "Qualification", type: "text" },
    { name: "license_number", label: "License Number", type: "text" },
    { name: "telephone", label: "Telephone", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "speciality", label: "Speciality", type: "text" },
    { name: "years_of_experience", label: "Years of Experience", type: "number" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 flex justify-center pt-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-sky-700 mb-6 text-center">Add Nurse</h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputs.map((input) => (
            <div key={input.name} className="relative">
              {/* Label always above input */}
              <label className="absolute left-1 -top-4 text-gray-500 text-sm">{input.label}</label>
              <input
                name={input.name}
                type={input.type}
                value={(form as any)[input.name]}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 px-1 text-gray-900 focus:border-sky-500 focus:outline-none sm:text-sm"
              />
            </div>
          ))}

          {/* Gender select */}
          <div className="relative">
            <label className="absolute left-1 -top-4 text-gray-500 text-sm">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 px-1 text-gray-900 focus:border-sky-500 focus:outline-none sm:text-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Adding..." : "Add Nurse"}
          </button>
        </form>
      </div>
    </main>
  );
}
