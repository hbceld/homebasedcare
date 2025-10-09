"use client";

import { useEffect, useState } from "react";
import { fetchReports, fetchPatients, fetchNurses, createReport } from "@/lib/api";
import Link from "next/link";

type ReportRaw = any;

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [nurses, setNurses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    patient: "",
    nurse: "",
    report_type: "",
    shift: "",
    observations: "",
    care_provided: "",
    medication_given: "",
    vitals_recorded: "",
    recommendations: "",
    verified_by: "",
    is_finalized: false,
  });

  // Helper maps for quick lookup
  const makeMap = (arr: any[], idKey = "id", nameKeyCandidates: string[] = ["full_name", "nurse_name", "patient_name", "name"]) => {
    const map = new Map<number | string, string>();
    for (const item of arr || []) {
      const id = item?.[idKey];
      if (id == null) continue;
      // try several name candidates
      let name = "";
      for (const nk of nameKeyCandidates) {
        if (item[nk]) {
          name = item[nk];
          break;
        }
      }
      if (!name) {
        // fallback to some other fields
        name = item.full_name || item.patient_name || item.nurse_name || String(id);
      }
      map.set(id, name);
    }
    return map;
  };

  // Normalize a report to guarantee date_time, patient_name and nurse_name
  const normalizeReport = (r: ReportRaw, patientMap: Map<any, string>, nurseMap: Map<any, string>) => {
    const copy = { ...r };

    // Date resolution: check common fields and fallback to now
    const maybeDate = copy.date_time ?? copy.date ?? copy.created_at ?? copy.timestamp ?? null;
    let dt = maybeDate ? new Date(maybeDate) : new Date();
    if (isNaN(dt.getTime())) {
      // try parse numbers (unix seconds or ms)
      if (typeof maybeDate === "number") {
        dt = new Date(maybeDate);
      } else {
        dt = new Date();
      }
    }
    copy.date_time = dt.toISOString();

    // Patient name resolution: prefer explicit patient_name, then lookup by id fields patient or patient_id
    if (!copy.patient_name) {
      const patientId = copy.patient ?? copy.patient_id ?? copy.patient_pk ?? null;
      if (patientId != null && patientMap.has(patientId)) copy.patient_name = patientMap.get(patientId);
      else if (copy.patient && typeof copy.patient === "object" && copy.patient.full_name) copy.patient_name = copy.patient.full_name;
      else copy.patient_name = copy.patient_name || "-";
    }

    // Nurse name resolution: prefer nurse_name, then nurse or nurse_id
    if (!copy.nurse_name) {
      const nurseId = copy.nurse ?? copy.nurse_id ?? copy.created_by ?? null;
      if (nurseId != null && nurseMap.has(nurseId)) copy.nurse_name = nurseMap.get(nurseId);
      else if (copy.nurse && typeof copy.nurse === "object" && (copy.nurse.full_name || copy.nurse.nurse_name)) copy.nurse_name = copy.nurse.full_name || copy.nurse.nurse_name;
      else copy.nurse_name = copy.nurse_name || "-";
    }

    // verified_by ensure string
    if (!copy.verified_by && copy.verified_by !== "") copy.verified_by = copy.verified_by ?? "-";

    // Ensure booleans exist
    copy.is_finalized = !!copy.is_finalized;

    return copy;
  };

  // Load reports, patients and nurses on mount
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // fetch in parallel
        const [reportsData, patientsData, nursesData] = await Promise.all([
          fetchReports().catch(() => []),
          fetchPatients().catch(() => []),
          fetchNurses().catch(() => []),
        ]);

        // Build lookup maps
        const patientMap = makeMap(patientsData, "id", ["full_name", "patient_name", "name"]);
        const nurseMap = makeMap(nursesData, "id", ["full_name", "nurse_name", "name"]);

        // Normalize reports
        const normalized = (Array.isArray(reportsData) ? reportsData : []).map((r: any) =>
          normalizeReport(r, patientMap, nurseMap)
        );

        // Sort newest first by date_time
        normalized.sort((a: any, b: any) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime());

        setReports(normalized);
        setPatients(Array.isArray(patientsData) ? patientsData : []);
        setNurses(Array.isArray(nursesData) ? nursesData : []);
      } catch (err: any) {
        console.error("Failed loading data:", err);
        setError(err?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // When modal opens, prefill selects (if patients/nurses not yet loaded fetch them)
  useEffect(() => {
    if (!showModal) return;

    async function ensureData() {
      try {
        // If lists already exist we still want to ensure defaults are set
        if (patients.length === 0 || nurses.length === 0) {
          const [patientsData, nursesData] = await Promise.all([fetchPatients().catch(() => []), fetchNurses().catch(() => [])]);
          if (patientsData.length) setPatients(patientsData);
          if (nursesData.length) setNurses(nursesData);
          if (patientsData.length) setFormData(prev => ({ ...prev, patient: patientsData[0].id }));
          if (nursesData.length) setFormData(prev => ({ ...prev, nurse: nursesData[0].id }));
        } else {
          if (patients.length) setFormData(prev => ({ ...prev, patient: (prev.patient || patients[0].id) }));
          if (nurses.length) setFormData(prev => ({ ...prev, nurse: (prev.nurse || nurses[0].id) }));
        }
      } catch (err) {
        console.error(err);
      }
    }

    ensureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare payload: convert blank strings to null where appropriate
      const payload = {
        patient: formData.patient || null,
        nurse: formData.nurse || null,
        report_type: formData.report_type || null,
        shift: formData.shift || null,
        observations: formData.observations || null,
        care_provided: formData.care_provided || null,
        medication_given: formData.medication_given || null,
        vitals_recorded: formData.vitals_recorded || null,
        recommendations: formData.recommendations || null,
        verified_by: formData.verified_by || null,
        is_finalized: !!formData.is_finalized,
      };

      const createdReport = await createReport(payload);

      // Build maps to normalize created report
      const patientMap = makeMap(patients, "id", ["full_name", "patient_name", "name"]);
      const nurseMap = makeMap(nurses, "id", ["full_name", "nurse_name", "name"]);

      // If server didn't return date or names, add them client-side
      const normalized = normalizeReport(createdReport || {
        // fallback if server returned nothing
        report_id: `local-${Date.now()}`,
        patient: payload.patient,
        patient_name: patients.find(p => String(p.id) === String(payload.patient))?.full_name ?? "-",
        nurse: payload.nurse,
        nurse_name: nurses.find(n => String(n.id) === String(payload.nurse))?.full_name ?? "-",
        report_type: payload.report_type,
        shift: payload.shift,
        observations: payload.observations,
        care_provided: payload.care_provided,
        medication_given: payload.medication_given,
        vitals_recorded: payload.vitals_recorded,
        recommendations: payload.recommendations,
        verified_by: payload.verified_by || "-",
        is_finalized: payload.is_finalized,
        date_time: new Date().toISOString(),
      }, patientMap, nurseMap);

      setReports(prev => [normalized, ...prev]);
      setShowModal(false);
      setFormData({
        patient: "",
        nurse: "",
        report_type: "",
        shift: "",
        observations: "",
        care_provided: "",
        medication_given: "",
        vitals_recorded: "",
        recommendations: "",
        verified_by: "",
        is_finalized: false,
      });
    } catch (err: any) {
      console.error("Create report failed:", err);
      alert(err?.message || "Failed to create report.");
    }
  };

  const renderPlaceholderReports = () => {
    return Array.from({ length: 3 }).map((_, idx) => (
      <div key={`placeholder-${idx}`} className="p-4 border rounded-lg shadow bg-gray-50 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-white bg-gray-400 rounded-full">
          Pending
        </span>
      </div>
    ));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patient Reports</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          + Create Report
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="p-4 text-gray-500">Loading reports...</p>}
      {error && <p className="p-4 text-red-600">{error}</p>}

      {/* Reports Grid */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {!loading && reports.length === 0 && renderPlaceholderReports()}

        {reports.map((r) => (
          <div
            key={r.report_id ?? r.id ?? `${r.patient}_${r.date_time}`}
            className="border rounded-xl shadow-lg bg-white p-6 hover:shadow-2xl transition duration-300"
          >
            {/* Header */}
            <div className="border-b pb-3 mb-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium">Dial-a-Nurse</p>
                <p className="text-xs text-gray-400 uppercase font-medium">Gishu Homebased Care</p>
              </div>
              <div className="text-right text-black">
                <p className="text-sm font-semibold">
                  {(() => {
                    try {
                      const dt = new Date(r.date_time);
                      if (isNaN(dt.getTime())) return new Date().toLocaleString();
                      return dt.toLocaleString();
                    } catch {
                      return new Date().toLocaleString();
                    }
                  })()}
                </p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  r.is_finalized ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
                }`}>
                  {r.is_finalized ? "Finalized" : "Pending"}
                </span>
              </div>
            </div>

            {/* Patient Info */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">{r.patient_name ?? "-"}</h2>
              <p className="text-sm text-gray-500">Assigned Nurse: {r.nurse_name ?? (r.nurse || "-")}</p>
              <p className="text-sm text-gray-500">Report Type: {r.report_type ?? "-"}</p>
              <p className="text-sm text-gray-500">Shift: {r.shift || "-"}</p>
            </div>

            {/* Body Sections */}
            <div className="grid grid-cols-2 gap-4 text-black text-sm">
              <div>
                <h3 className="font-semibold mb-1">Observations</h3>
                <p className="text-black">{r.observations || "-"}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Care Provided</h3>
                <p className="text-black">{r.care_provided || "-"}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Medication Given</h3>
                <p className="text-black">{r.medication_given || "-"}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Vitals</h3>
                <p className="text-black">{r.vitals_recorded || "-"}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-1">Recommendations</h3>
                <p className="text-black">{r.recommendations || "-"}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-1">Verified By</h3>
                <p className="text-black">{r.verified_by || "-"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 overflow-auto max-h-[90vh]">
            {/* Header */}
            <div className="mb-6 border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">Create New Report</h2>
              <p className="text-sm text-gray-500 mt-1">Dial-a-Nurse | Gishu Homebased Care</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              {/* Patient */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Patient</label>
                <select
                  name="patient"
                  value={formData.patient}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select patient</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.full_name || p.patient_name}</option>
                  ))}
                </select>
              </div>

              {/* Nurse */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Assigned Nurse</label>
                <select
                  name="nurse"
                  value={formData.nurse}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select nurse</option>
                  {nurses.map(n => (
                    <option key={n.id} value={n.id}>{n.full_name || n.nurse_name}</option>
                  ))}
                </select>
              </div>

              {/* Report Type */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Report Type</label>
                <select
                  name="report_type"
                  value={formData.report_type}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="daily">Daily Care Report</option>
                  <option value="incident">Incident Report</option>
                  <option value="progress">Progress Report</option>
                  <option value="followup">Follow-up Report</option>
                  <option value="discharge">Discharge/Completion Report</option>
                </select>
              </div>

              {/* Shift */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Shift</label>
                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Shift</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>

              {/* Finalized */}
              <div className="flex items-center space-x-2 mt-2 md:mt-6">
                <input
                  type="checkbox"
                  name="is_finalized"
                  checked={formData.is_finalized}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm font-medium">Finalize Report</label>
              </div>
            </div>

            {/* Text Areas */}
            <div className="mt-6 space-y-4 text-black">
              {[
                { label: "Observations", name: "observations" },
                { label: "Care Provided", name: "care_provided" },
                { label: "Medication Given", name: "medication_given" },
                { label: "Vitals (JSON)", name: "vitals_recorded", placeholder: '{"bp": "120/80", "temp": "36.6"}' },
                { label: "Recommendations", name: "recommendations" },
                { label: "Verified By", name: "verified_by", type: "text" }
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{field.label}</label>
                  {field.name === "verified_by" ? (
                    <input
                      type="text"
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  ) : (
                    <textarea
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder || ""}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 resize-none"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                onClick={handleSubmit}
              >
                Save Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
