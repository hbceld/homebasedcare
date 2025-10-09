"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fetchBillings, deleteBilling, markBillingPaid } from "@/lib/api";

type Billing = any;

const PAGE_SIZES = [10, 25, 50];

export default function BillingPage() {
  const [billings, setBillings] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = (await fetchBillings()) || [];
        if (!mounted) return;
        setBillings(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.message || "Failed to load billings");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // formatting helpers
  function fmtCurrency(val: number | string | undefined) {
    const n = Number(val ?? 0);
    return new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(n);
  }
  function fmtDate(dt?: string | null) {
    if (!dt) return "-";
    try {
      return new Date(dt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return String(dt);
    }
  }

  // client-side search + filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return billings.filter((b) => {
      if (statusFilter !== "all") {
        const status = String(b.payment_status ?? "").toLowerCase();
        if (statusFilter === "pending" && status === "paid") return false;
        if (statusFilter === "paid" && status !== "paid") return false;
        if (statusFilter === "overdue" && status !== "overdue") return false;
      }
      if (!q) return true;
      // search invoice id, patient name, nurse, or amount
      const invoice = String(b.invoice_number ?? b.billing_id ?? "").toLowerCase();
      const patient = String(b.patient_name ?? "").toLowerCase();
      const nurse = String(b.nurse_name ?? b.nurse ?? "").toLowerCase();
      const amount = String(b.amount_due ?? b.amount ?? "").toLowerCase();
      return invoice.includes(q) || patient.includes(q) || nurse.includes(q) || amount.includes(q);
    });
  }, [billings, query, statusFilter]);

  // pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this billing? This cannot be undone.")) return;
    try {
      setBusyId(id);
      await deleteBilling(id);
      setBillings((prev) => prev.filter((b) => String(b.billing_id) !== String(id)));
    } catch (err: any) {
      alert(err?.message || "Failed to delete billing");
    } finally {
      setBusyId(null);
    }
  }

  async function handleMarkPaid(id: string) {
    if (!confirm("Mark this billing as paid?")) return;
    try {
      setBusyId(id);
      const updated = await markBillingPaid(id);
      setBillings((prev) => prev.map((b) => (String(b.billing_id) === String(id) ? updated : b)));
    } catch (err: any) {
      alert(err?.message || "Failed to mark billing paid");
    } finally {
      setBusyId(null);
    }
  }

  // Loading skeleton
  if (loading)
    return (
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-100 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );

  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Billing Records</h1>
          <p className="text-sm text-gray-500">Manage invoices, mark paid or delete records.</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link
            href="/admin/billing/new"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            + New Billing
          </Link>
          <Link
            href="/admin/billing/invoices"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
          >
            View Invoices
          </Link>

          {/* search and filters */}
          <div className="ml-auto md:ml-4 w-full md:w-auto flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search invoice, patient, nurse or amount..."
              className="flex-1 md:w-64 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(1);
              }}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet table */}
      <div className="hidden md:block bg-white border rounded-md overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Invoice</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Patient</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Nurse</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Due</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No billing records found.</td>
              </tr>
            ) : (
              paged.map((b) => {
                const id = String(b.billing_id ?? b.id ?? "");
                const paid = String(b.payment_status ?? "").toLowerCase() === "paid";
                return (
                  <tr key={id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-3 align-top">{b.invoice_number || b.billing_id}</td>
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium">{b.patient_name}</div>
                      <div className="text-xs text-gray-500">{b.patient_id ?? ""}</div>
                    </td>
                    <td className="px-4 py-3 align-top">{b.nurse_name ?? b.nurse ?? "-"}</td>
                    <td className="px-4 py-3 align-top">{fmtCurrency(b.amount_due ?? b.amount)}</td>
                    <td className="px-4 py-3 align-top">{fmtDate(b.due_date)}</td>
                    <td className="px-4 py-3 align-top">
                      {paid ? (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Paid</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-right space-x-2">
                      <Link href={`/admin/billing/view/${id}`} className="text-blue-600 hover:underline text-sm">View</Link>

                      {!paid && (
                        <button
                          onClick={() => handleMarkPaid(id)}
                          disabled={busyId === id}
                          className="text-sm px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
                        >
                          {busyId === id ? "..." : "Mark Paid"}
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(id)}
                        disabled={busyId === id}
                        className="text-sm px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-3">
        {paged.length === 0 ? (
          <div className="bg-white border rounded-md p-4 text-center text-gray-500">No billing records found.</div>
        ) : (
          paged.map((b) => {
            const id = String(b.billing_id ?? b.id ?? "");
            const paid = String(b.payment_status ?? "").toLowerCase() === "paid";
            return (
              <div key={id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{b.invoice_number || b.billing_id}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${paid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {paid ? "Paid" : "Pending"}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{b.patient_name}</div>
                    <div className="text-xs text-gray-400 mt-1">Due: {fmtDate(b.due_date)}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold">{fmtCurrency(b.amount_due ?? b.amount)}</div>
                    <div className="text-xs text-gray-500">{b.nurse_name ?? b.nurse ?? "-"}</div>
                  </div>
                </div>

                <div className="mt-3 flex gap-3">
                  <Link href={`/admin/billing/view/${id}`} className="text-sm text-blue-600 hover:underline">View</Link>
                  {!paid && (
                    <button
                      onClick={() => handleMarkPaid(id)}
                      disabled={busyId === id}
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
                    >
                      {busyId === id ? "..." : "Mark Paid"}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(id)}
                    disabled={busyId === id}
                    className="text-sm px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="border rounded-md px-2 py-1"
          >
            {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="text-gray-500">Showing {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)} of {total}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border bg-white disabled:opacity-60"
          >
            Prev
          </button>
          <div className="text-sm px-3 py-1 border rounded-md bg-white">
            Page {page} / {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md border bg-white disabled:opacity-60"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

