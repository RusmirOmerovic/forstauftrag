import React from "react";
import { Link } from "react-router-dom";
import Notfallplan from "../components/Notfallplan";
import { useForm } from '../context/FormContext';

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

      <div className="navigation-buttons">
        {step > 0 && <button onClick={() => setStep(step - 1)}>Zurück</button>}
        {step < steps.length - 1 && <button onClick={() => setStep(step + 1)}>Weiter</button>}
      </div>

      <nav className="navbar">
        <Link to="/">📝 Eingabe</Link>
        <Link to="/zusammenfassung">📄 Zusammenfassung</Link>
        <Notfallplan />
      </nav>
    </div>
  );
}

export default EingabeFormular;
