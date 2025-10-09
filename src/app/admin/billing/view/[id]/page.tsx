"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBilling, markBillingPaid } from "@/lib/api";

export default function BillingDetailPage() {
  const { id } = useParams();
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchBilling(id as string);
        setBilling(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load billing");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function fmtCurrency(val: number | string | undefined) {
    const num = Number(val ?? 0);
    return new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(num);
  }

  function fmtDate(dt?: string | null) {
    if (!dt) return "-";
    try {
      return new Date(dt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return dt as string;
    }
  }

  async function handleMarkPaid() {
    if (!billing || busy) return;
    if (!confirm("Mark this invoice as paid?")) return;
    try {
      setBusy(true);
      const updated = await markBillingPaid(billing.id ?? billing.billing_id);
      setBilling(updated);
      alert("Marked as paid");
    } catch (err: any) {
      alert(err?.message || "Failed to mark as paid");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="p-6 max-w-4xl mx-auto">Loading...</div>;
  if (error) return <div className="p-6 max-w-4xl mx-auto text-red-600">{error}</div>;
  if (!billing) return <div className="p-6 max-w-4xl mx-auto">Billing not found</div>;

  const statusBadge = (status: string | null | undefined) => {
    const s = (status || "pending").toLowerCase();
    const map: Record<string, string> = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-700",
    };
    return map[s] ?? "bg-gray-100 text-gray-700";
  };

  const items: any[] = billing.items ?? billing.line_items ?? [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b flex items-center justify-between gap-4 flex-col md:flex-row">
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-blue-600 text-white w-12 h-12 flex items-center justify-center font-bold">B</div>
            <div>
              <h1 className="text-xl font-semibold">Invoice {billing.invoice_number ?? billing.billing_id}</h1>
              <p className="text-sm text-gray-500">{billing.patient_name} — {billing.patient_id ?? "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(billing.payment_status)}`}>
              {billing.payment_status ?? "Pending"}
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500">Due</div>
              <div className="font-semibold">{fmtDate(billing.due_date)}</div>
            </div>

            <div>
              <button
                onClick={handleMarkPaid}
                disabled={busy || (billing.payment_status || "").toLowerCase() === "paid"}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition ${((billing.payment_status||"").toLowerCase() === "paid") ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {busy ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75"/></svg>
                ) : null}
                Mark as paid
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">Billing Summary</h3>
                <p className="text-sm text-gray-500">Issued {fmtDate(billing.date_issued)}</p>
              </div>

              <div className="flex items-baseline gap-6">
                <div>
                  <div className="text-sm text-gray-500">Amount Due</div>
                  <div className="text-2xl font-bold">{fmtCurrency(billing.amount_due)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Amount Paid</div>
                  <div className="text-lg font-semibold">{fmtCurrency(billing.amount_paid)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Balance</div>
                  <div className="text-lg font-semibold text-red-600">{fmtCurrency(billing.balance)}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3 flex-wrap">
              <div className="px-4 py-2 bg-gray-50 rounded-md text-sm">Method: {billing.payment_method ?? "-"}</div>
              <div className="px-4 py-2 bg-gray-50 rounded-md text-sm">Invoice: {billing.invoice_number ?? billing.billing_id}</div>
              <div className="px-4 py-2 bg-gray-50 rounded-md text-sm">Reference: {billing.reference ?? "-"}</div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium">Patient</h4>
              <p className="text-sm text-gray-700">{billing.patient_name}</p>
              <p className="text-sm text-gray-500">{billing.patient_contact ?? "-"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium">Nurse</h4>
              <p className="text-sm text-gray-700">{billing.nurse_name ?? billing.nurse ?? "-"}</p>
              <p className="text-sm text-gray-500">{billing.nurse_contact ?? "-"}</p>
            </div>

            <div className="bg-white p-4 rounded-md border">
              <h4 className="font-medium mb-2">Activity</h4>
              <div className="text-sm text-gray-600 space-y-2">
                {Array.isArray(billing.activities) && billing.activities.length > 0 ? (
                  billing.activities.slice(0,5).map((a: any, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mt-2"></div>
                      <div>
                        <div className="text-xs text-gray-500">{fmtDate(a.date)}</div>
                        <div className="text-sm">{a.note ?? a.action ?? a.type}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No recent activity</div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
