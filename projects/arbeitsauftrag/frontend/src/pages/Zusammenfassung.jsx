// src/pages/Zusammenfassung.jsx
import React from "react";
import { useForm } from "../context/FormContext";
import { exportToPDF } from "../utils/pdfExport";

function Zusammenfassung() {
  const { formData } = useForm();

  return (
    <div id="zusammenfassung" className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📄 Zusammenfassung</h2>

      <div className="space-y-2">
        {Object.entries(formData).map(([key, value]) => {
          const label = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
          const display = Array.isArray(value)
            ? value.map(v => typeof v === "object" ? `${v.art} (${v.bediener})` : v).join(", ")
            : typeof value === "boolean"
              ? (value ? "✅ Ja" : "❌ Nein")
              : value;

          return (
            <div key={key} className="border-b pb-1">
              <strong>{label}:</strong> {display}
            </div>
          );
        })}
      </div>

      {/* 📄 PDF-Download-Button */}
      <div className="text-right mt-6">
        <button
          onClick={() => exportToPDF("zusammenfassung")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📄 PDF herunterladen
        </button>
      </div>
    </div>
  );
}

export default Zusammenfassung;
