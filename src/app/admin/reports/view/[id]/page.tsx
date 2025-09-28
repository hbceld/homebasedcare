"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchReport } from "@/lib/api";

export default function ReportDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const data = await fetchReport(id as string);
        setReport(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="p-4">Loading report...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!report) return <p className="p-4">Report not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg print:p-0">
      <header className="mb-6 border-b pb-2">
        <h1 className="text-2xl font-bold mb-1">{report.report_type}</h1>
        <p className="text-sm text-gray-600">{report.patient_name}</p>
        <p className="text-sm text-gray-500">{new Date(report.date_time).toLocaleString()}</p>
        {report.is_finalized && (
          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-full">
            Finalized
          </span>
        )}
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Shift:</h2>
          <p>{report.shift || "N/A"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Observations:</h2>
          <p>{report.observations || "-"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Care Provided:</h2>
          <p>{report.care_provided || "-"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Medication Given:</h2>
          <p>{report.medication_given || "-"}</p>
        </div>

        {report.vitals_recorded && (
          <div>
            <h2 className="font-semibold">Vitals:</h2>
            <pre className="bg-gray-50 p-2 rounded">{JSON.stringify(report.vitals_recorded, null, 2)}</pre>
          </div>
        )}

        <div>
          <h2 className="font-semibold">Recommendations:</h2>
          <p>{report.recommendations || "-"}</p>
        </div>

        {report.attachments && (
          <div>
            <h2 className="font-semibold">Attachments:</h2>
            <a
              href={report.attachments}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Attachment
            </a>
          </div>
        )}

        <div>
          <h2 className="font-semibold">Verified By:</h2>
          <p>{report.verified_by || "N/A"}</p>
        </div>
      </section>

      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        ← Back
      </button>
    </div>
  );
}
