"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBillings, deleteBilling, markBillingPaid } from "@/lib/api";

export default function BillingPage() {
  const [billings, setBillings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBillings();
        setBillings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this billing?")) return;
    try {
      await deleteBilling(id);
      setBillings(billings.filter((b) => b.billing_id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleMarkPaid(id: string) {
    try {
      const updated = await markBillingPaid(id);
      setBillings(
        billings.map((b) => (b.billing_id === id ? updated : b))
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) return <p className="p-4">Loading billings...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <h1 className="text-xl sm:text-2xl font-bold">Billing Records</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/billing/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
          >
            + New Billing
          </Link>
          <Link
            href="/admin/billing/invoices"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm sm:text-base"
          >
            View Invoices
          </Link>
        </div>
      </div>

      {/* Table on large screens */}
      <div className="hidden md:block overflow-x-auto">
        {billings.length === 0 ? (
          <p>No billing records found.</p>
        ) : (
          <table className="w-full border border-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Invoice</th>
                <th className="p-2 border">Patient</th>
                <th className="p-2 border">Amount Due</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billings.map((b) => (
                <tr key={b.billing_id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{b.invoice_number || b.billing_id}</td>
                  <td className="p-2">{b.patient_name}</td>
                  <td className="p-2">{b.amount_due}</td>
                  <td className="p-2">
                    {b.payment_status === "paid" ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs sm:text-sm text-green-700 bg-green-100 rounded-full">
                        ✅ Paid
                      </span>
                    ) : (
                      <span className="text-red-600">Pending</span>
                    )}
                  </td>
                  <td className="p-2 space-x-2">
                    <Link
                      href={`/admin/billing/view/${b.billing_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(b.billing_id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile stacked cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {billings.length === 0 ? (
          <p>No billing records found.</p>
        ) : (
          billings.map((b) => (
            <div
              key={b.billing_id}
              className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-semibold">Invoice:</span>
                <span>{b.invoice_number || b.billing_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Patient:</span>
                <span>{b.patient_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Amount Due:</span>
                <span>{b.amount_due}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                {b.payment_status === "paid" ? (
                  <span className="text-green-600 font-medium">✅ Paid</span>
                ) : (
                  <span className="text-red-600 font-medium">Pending</span>
                )}
              </div>
              <div className="flex gap-4 pt-2">
                <Link
                  href={`/admin/billing/view/${b.billing_id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(b.billing_id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
