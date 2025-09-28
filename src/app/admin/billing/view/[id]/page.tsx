"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBilling, markBillingPaid } from "@/lib/api"; // ✅ fixed import

export default function BillingDetailPage() {
  const { id } = useParams();
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const data = await fetchBilling(id as string);
        setBilling(data);
      } catch (err: any) {
        setError(err.message || "Failed to load billing");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleMarkPaid() {
    try {
      const updated = await markBillingPaid(id as string);
      setBilling(updated); // refresh UI with updated status
    } catch (err: any) {
      alert(err.message || "Failed to mark as paid");
    }
  }

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!billing) return <p className="p-4">Billing not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Billing {billing.invoice_number || billing.billing_id}
      </h1>
      <div className="space-y-2">
        <p><strong>Patient:</strong> {billing.patient_name}</p>
        <p><strong>Nurse:</strong> {billing.nurse_name || "N/A"}</p>
        <p><strong>Billing Period:</strong> {billing.billing_period}</p>
        <p><strong>Amount Due:</strong> {billing.amount_due}</p>
        <p><strong>Amount Paid:</strong> {billing.amount_paid}</p>
        <p><strong>Balance:</strong> {billing.balance}</p>
        <p><strong>Status:</strong> {billing.payment_status}</p>
        <p><strong>Method:</strong> {billing.payment_method || "N/A"}</p>
        <p><strong>Date Issued:</strong> {billing.date_issued}</p>
        <p><strong>Due Date:</strong> {billing.due_date || "N/A"}</p>
      </div>

        
      
    </div>
  );
}
