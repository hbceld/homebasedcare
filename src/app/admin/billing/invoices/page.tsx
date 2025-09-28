"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBillings, updateInvoiceStatus } from "@/lib/api";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBillings(); 
        setInvoices(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleMarkPaid(billingId: string) {
    try {
      await updateInvoiceStatus(billingId, "paid");
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.billing_id === billingId ? { ...inv, payment_status: "paid" } : inv
        )
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) return <p className="p-4">Loading invoices...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link
          href="/admin/billing/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + New Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <p>No invoices found.</p>
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
            {invoices.map((inv) => (
              <tr key={inv.billing_id} className="border-t">
                <td className="p-2">{inv.invoice_number || inv.billing_id}</td>
                <td className="p-2">{inv.patient_name}</td>
                <td className="p-2">{inv.amount_due}</td>
                <td className="p-2">{inv.payment_status}</td>
                <td className="p-2 space-x-2">
                  <Link
                    href={`/admin/billing/view/${inv.billing_id}`} 
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  {inv.payment_status === "pending" && (
                    <button
                      onClick={() => handleMarkPaid(inv.billing_id)}
                      className="text-green-600 hover:underline"
                    >
                      Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

