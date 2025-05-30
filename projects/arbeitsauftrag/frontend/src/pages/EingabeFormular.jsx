import React from "react";
import { Link } from "react-router-dom";
import Notfallplan from "../components/Notfallplan";
import { useForm } from '../context/FormContext';
import { findeNaechstenRettungspunkt } from '../utils/geoUtils';


const steps = [
  "Datum Arbeitstag", "Einsatzort", "Arbeitsverantwortlicher", "Einsatzkräfte", "Ansprechpartner Kunde",
  "Ersthelfer", "Rettungspunkt automatisch", "Wetterdaten", "Verkehrssicherung", "PSA",
  "Maschineneinsatz", "Gefährdungen", "Maßnahmen", "Unterschrift", "Zusammenfassung"
];

const fieldMap = {
  "Datum Arbeitstag": "arbeitstag",
  "Einsatzort": "einsatzort",
  "Arbeitsverantwortlicher": "arbeitsverantwortlicher",
  "Einsatzkräfte": "einsatzkraefte",
  "Ansprechpartner Kunde": "ansprechpartner_name",
  "Ersthelfer": "ersthelfer",
  "Rettungspunkt automatisch": "rettungspunkt_auto",
  "Wetterdaten": "witterung",
  "Verkehrssicherung": "verkehrsrecht",
  "PSA": "psa_geprueft",
  "Maschineneinsatz": "maschinen",
  "Gefährdungen": "gefaehrdungen",
  "Maßnahmen": "massnahmen_eingeleitet",
  "Unterschrift": "unterschrift",
};

function EingabeFormular() {
  const { step, setStep, formData, setFormData } = useForm(); // ✅ Jetzt korrekt

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  
  // ⬇️ HIER einfügen:
  const holeGPSundRettungspunkt = async () => {
    if (!navigator.geolocation) {
      alert("GPS wird nicht unterstützt.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
  
      const punkt = await findeNaechstenRettungspunkt(latitude, longitude);
  
      if (punkt) {
        setFormData(prev => ({
          ...prev,
          gps_lat: latitude,
          gps_lng: longitude,
          rettungspunkt_auto: `${punkt['RP_Nr']} – ${punkt['Ortsbeschr']}`
        }));
      } else {
        alert("Kein Rettungspunkt in der Nähe gefunden.");
      }
    }, (error) => {
      console.error("GPS-Fehler:", error);
      alert("GPS konnte nicht abgerufen werden.");
    });
  };
  

  const renderStep = () => {
    return (
      <input
        type="text"
        name={fieldMap[steps[step]] || steps[step].toLowerCase().replace(/ /g, "_")}
        value={formData[fieldMap[steps[step]] || steps[step].toLowerCase().replace(/ /g, "_")] || ""}
        onChange={handleChange}
        placeholder={`Eingabe für ${steps[step]}...`}
      />
    );
  };

  return (
    <div>
      <h2>Schritt {step + 1}: {steps[step]}</h2>
      {renderStep()}
  
      {steps[step] === "Rettungspunkt automatisch" && (
        <button 
          onClick={holeGPSundRettungspunkt}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          📍 Standort + nächster Rettungspunkt
        </button>
      )}
  
      <div className="navigation-buttons mt-4">
        {step > 0 && <button onClick={() => setStep(step - 1)}>Zurück</button>}
        {step < steps.length - 1 && <button onClick={() => setStep(step + 1)}>Weiter</button>}
      </div>
  
      <nav className="navbar mt-6">
        <Link to="/">📝 Eingabe</Link>
        <Link to="/zusammenfassung">📄 Zusammenfassung</Link>
        <Notfallplan />
      </nav>
    </div>
  );

}

export default EingabeFormular;
