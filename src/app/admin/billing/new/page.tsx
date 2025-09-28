"use client";

import { useState } from "react";
import { createBilling, fetchPatients, fetchNurses } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewBillingPage() {
  const [form, setForm] = useState<any>({
    patient: "",
    nurse: "",
    billing_period: "monthly",
    amount_due: "",
    amount_paid: 0,
    payment_method: "cash",
    payment_status: "pending",
    due_date: "",
  });

  const [patients, setPatients] = useState<any[]>([]);
  const [nurses, setNurses] = useState<any[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingNurses, setLoadingNurses] = useState(false);
  const router = useRouter();

  async function loadPatients() {
    setLoadingPatients(true);
    try {
      setPatients(await fetchPatients());
    } catch (err: any) {
      console.error("Failed to load patients:", err);
    } finally {
      setLoadingPatients(false);
    }
  }

  async function loadNurses() {
    setLoadingNurses(true);
    try {
      setNurses(await fetchNurses());
    } catch (err: any) {
      console.error("Failed to load nurses:", err);
    } finally {
      setLoadingNurses(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createBilling(form);
      router.push("/admin/billing");
    } catch (err: any) {
      alert(err.message || "Failed to create billing record.");
    }
  }

  // ✅ Utility to get display name
  function getPatientName(p: any) {
    if (p.full_name) return p.full_name;
    if (p.first_name || p.last_name) return `${p.first_name || ""} ${p.last_name || ""}`.trim();
    if (p.user?.full_name) return p.user.full_name;
    return `Patient ${p.id}`;
  }

  function getNurseName(n: any) {
    if (n.full_name) return n.full_name;
    if (n.first_name || n.last_name) return `${n.first_name || ""} ${n.last_name || ""}`.trim();
    if (n.user?.full_name) return n.user.full_name;
    return `Nurse ${n.id}`;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Billing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient */}
        <div>
          <label className="block font-medium">Patient</label>
          <select
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            onClick={loadPatients}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Patient --</option>
            {loadingPatients && <option>Loading...</option>}
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {getPatientName(p)}
              </option>
            ))}
          </select>
        </div>

        {/* Nurse */}
        <div>
          <label className="block font-medium">Nurse</label>
          <select
            value={form.nurse}
            onChange={(e) => setForm({ ...form, nurse: e.target.value })}
            onClick={loadNurses}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Nurse --</option>
            {loadingNurses && <option>Loading...</option>}
            {nurses.map((n) => (
              <option key={n.id} value={n.id}>
                {getNurseName(n)}
              </option>
            ))}
          </select>
        </div>

        {/* Billing Period */}
        <div>
          <label className="block font-medium">Billing Period</label>
          <select
            value={form.billing_period}
            onChange={(e) =>
              setForm({ ...form, billing_period: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Amount Due */}
        <div>
          <label className="block font-medium">Amount Due</label>
          <input
            type="number"
            value={form.amount_due}
            onChange={(e) => setForm({ ...form, amount_due: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block font-medium">Payment Method</label>
          <select
            value={form.payment_method}
            onChange={(e) =>
              setForm({ ...form, payment_method: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="cash">Cash</option>
            <option value="mpesa">M-Pesa</option>
            <option value="airtel_money">Airtel Money</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
