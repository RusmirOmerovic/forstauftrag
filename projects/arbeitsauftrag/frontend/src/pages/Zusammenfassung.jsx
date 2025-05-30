import { exportToPDF } from "../utils/pdfExporter";
import { useForm } from "../context/FormContext";

function Zusammenfassung() {
  const { formData } = useForm();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📄 Zusammenfassung</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => {
          const label = key.replace(/_/g, ' ').toUpperCase();
          const display = Array.isArray(value)
            ? value.map(v => typeof v === "object" ? `${v.art} (${v.bediener})` : v).join(", ")
            : typeof value === "boolean" ? (value ? "Ja" : "Nein") : value;

          return (
            <div key={key} className="p-2 border rounded bg-gray-50">
              <strong>{label}:</strong> {display}
            </div>
          );
        })}
      </div>

      <div className="text-right mt-6">
        <button
          onClick={() => exportToPDF(formData)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📄 PDF herunterladen
        </button>
      </div>
    </div>
  );
}

export default Zusammenfassung;
