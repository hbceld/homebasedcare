"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchNurses, deleteNurse } from "@/lib/api";

type Nurse = {
  id: number;
  user_id: string;
  full_name: string;
  license_number: string;
  email: string;
  telephone: string;
  is_active: boolean;
};

export default function NursesPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        // Step 1: Get CSRF cookie for session authentication
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/csrf/`, {
          credentials: "include",
        });

        // Step 2: Fetch nurses with session cookie
        const data = await fetchNurses(); // fetchNurses already includes credentials
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
      n.license_number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-sky-700">Manage Nurses</h1>
        <Link
          href="/admin/nurses/create"
          className="bg-sky-600 text-white px-4 py-2 rounded-md"
        >
          Add Nurse
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by name, ID or license..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full md:w-1/2 border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-sky-500"
      />

      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">License</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Loading nurses...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-red-600">{error}</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">No nurses found</td>
              </tr>
            ) : (
              filtered.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">{n.full_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{n.user_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{n.license_number}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{n.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{n.telephone}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link
                      href={`/admin/nurses/edit/${n.id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
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
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
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
    </main>
  );
}
