"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchNurses, deleteNurse } from "@/lib/api";

type Nurse = {
  id: number;
  user_id: string;
  full_name: string;
  password?: string;
  age: number;
  qualification: string;
  license_number: string;
  telephone: string;
  email: string;
  speciality: string;
  years_of_experience: number;
  gender: string;
};

export default function NursesPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNurses();
        setNurses(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = nurses.filter(
    (n) =>
      n.full_name.toLowerCase().includes(search.toLowerCase()) ||
      n.user_id.toLowerCase().includes(search.toLowerCase()) ||
      n.license_number.toLowerCase().includes(search.toLowerCase()) ||
      n.email.toLowerCase().includes(search.toLowerCase()) ||
      n.telephone.toLowerCase().includes(search.toLowerCase()) ||
      n.speciality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-700">Manage Nurses</h1>
        <Link
          href="/admin/nurses/create"
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md transition"
        >
          Add Nurse
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, ID, license, email, phone, speciality..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 md:mb-6 w-full md:w-1/2 border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-sky-500 transition"
      />

      {/* Loading / Error / Empty */}
      {loading ? (
        <p className="text-center py-6 text-gray-500">Loading nurses...</p>
      ) : error ? (
        <p className="text-center py-6 text-red-600">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No nurses found</p>
      ) : (
        <>
          {/* Mobile view: Cards */}
          <div className="grid gap-4 md:hidden">
            {filtered.map((n) => (
              <div
                key={n.id}
                className="bg-white shadow rounded-md p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800">{n.full_name}</h2>
                  <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded">
                    {n.speciality}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">User ID:</span> {n.user_id}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Age:</span> {n.age}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Qualification:</span> {n.qualification}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">License:</span> {n.license_number}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> {n.telephone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {n.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span>{" "}
                  {n.years_of_experience} yrs
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Gender:</span> {n.gender}
                </p>
                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/admin/nurses/edit/${n.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      if (!confirm("Delete this nurse?")) return;
                      try {
                        await deleteNurse(n.id);
                        setNurses((prev) => prev.filter((x) => x.id !== n.id));
                      } catch (err: any) {
                        alert(err.message || "Failed to delete nurse");
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view: Table */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-md">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-sky-100">
                <tr>
                  {[
                    "User ID",
                    "Full Name",
                    "Password",
                    "Age",
                    "Qualification",
                    "License Number",
                    "Telephone",
                    "Email",
                    "Speciality",
                    "Experience",
                    "Gender",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((n) => (
                  <tr key={n.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-sm text-gray-600">{n.user_id}</td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-700">{n.full_name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">••••••••</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{n.age}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{n.qualification}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{n.license_number}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{n.telephone}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{n.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{n.speciality}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {n.years_of_experience}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">{n.gender}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Link
                        href={`/admin/nurses/edit/${n.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={async () => {
                          if (!confirm("Delete this nurse?")) return;
                          try {
                            await deleteNurse(n.id);
                            setNurses((prev) => prev.filter((x) => x.id !== n.id));
                          } catch (err: any) {
                            alert(err.message || "Failed to delete nurse");
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
