"use client";

import { useState } from "react";
import { createBilling, fetchPatients, fetchNurses } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  User,
  Stethoscope,
  Calendar,
  CreditCard,
  DollarSign,
  Wallet,
  FileText,
} from "lucide-react";

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

  function getPatientName(p: any) {
    if (p.full_name) return p.full_name;
    if (p.first_name || p.last_name)
      return `${p.first_name || ""} ${p.last_name || ""}`.trim();
    if (p.user?.full_name) return p.user.full_name;
    return `Patient ${p.id}`;
  }

  function getNurseName(n: any) {
    if (n.full_name) return n.full_name;
    if (n.first_name || n.last_name)
      return `${n.first_name || ""} ${n.last_name || ""}`.trim();
    if (n.user?.full_name) return n.user.full_name;
    return `Nurse ${n.id}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8" /> New Billing Record
          </h1>
          <p className="text-green-100 text-sm md:text-base mt-3 md:mt-0">
            Fill in the details below to create a billing record
          </p>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Left Side - Main Form */}
          <div className="md:col-span-2 space-y-8">
            {/* Patient & Nurse */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" /> Patient & Nurse
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={form.patient}
                  onChange={(e) =>
                    setForm({ ...form, patient: e.target.value })
                  }
                  onClick={loadPatients}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
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

                <select
                  value={form.nurse}
                  onChange={(e) => setForm({ ...form, nurse: e.target.value })}
                  onClick={loadNurses}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
            </section>

            {/* Billing Info */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" /> Billing Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={form.billing_period}
                  onChange={(e) =>
                    setForm({ ...form, billing_period: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>

                <input
                  type="date"
                  value={form.due_date}
                  onChange={(e) =>
                    setForm({ ...form, due_date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </section>

            {/* Payment */}
            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-600" /> Payment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    value={form.amount_due}
                    onChange={(e) =>
                      setForm({ ...form, amount_due: e.target.value })
                    }
                    placeholder="Amount Due"
                    className="w-full pl-10 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                  />
                </div>

                <select
                  value={form.payment_method}
                  onChange={(e) =>
                    setForm({ ...form, payment_method: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="cash">Cash</option>
                  <option value="mpesa">M-Pesa</option>
                  <option value="airtel_money">Airtel Money</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </section>
          </div>

          {/* Right Side - Live Summary */}
          <aside className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-inner space-y-6">
            <h2 className="text-xl font-bold text-green-700 mb-2">
              📋 Billing Summary
            </h2>
            <p className="text-gray-600 text-sm">
              Review the details before saving.
            </p>
            <div className="space-y-3 text-sm text-gray-800">
              <p>
                <strong>Patient:</strong>{" "}
                {form.patient
                  ? getPatientName(
                      patients.find((p) => p.id == form.patient) || {}
                    )
                  : "--"}
              </p>
              <p>
                <strong>Nurse:</strong>{" "}
                {form.nurse
                  ? getNurseName(nurses.find((n) => n.id == form.nurse) || {})
                  : "--"}
              </p>
              <p>
                <strong>Billing Period:</strong> {form.billing_period}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {form.due_date || "Not selected"}
              </p>
              <p>
                <strong>Amount Due:</strong>{" "}
                {form.amount_due ? `KES ${form.amount_due}` : "--"}
              </p>
              <p>
                <strong>Payment Method:</strong> {form.payment_method}
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-[1.02]"
            >
              ✅ Save Billing
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
}
