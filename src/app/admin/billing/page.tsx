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
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Billing Records</h1>
        <div className="space-x-2">
          <Link
            href="/admin/billing/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + New Billing
          </Link>
          <Link
            href="/admin/billing/invoices"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            View Invoices
          </Link>
        </div>
      </div>

      {billings.length === 0 ? (
        <p>No billing records found.</p>
      ) : (
        <table className="w-full border border-gray-200">
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
              <tr key={b.billing_id} className="border-t">
                <td className="p-2">{b.invoice_number || b.billing_id}</td>
                <td className="p-2">{b.patient_name}</td>
                <td className="p-2">{b.amount_due}</td>
                <td className="p-2">
                  {b.payment_status === "paid" ? (
                    <span className="inline-flex items-center px-2 py-1 text-sm text-green-700 bg-green-100 rounded-full">
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
  );
}
