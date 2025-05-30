import React, { useState } from "react";
import "./App.css";

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
  "Zusammenfassung": ""
};

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    arbeitstag: "", einsatzort: "", arbeitsverantwortlicher: "", einsatzkraefte: "",
    ansprechpartner_name: "", ansprechpartner_tel: "", ersthelfer: "", rettungspunkt_auto: "",
    witterung: "", temperatur: "", niederschlag: "", wind: "", sicht: "",
    verkehrsrecht: false, absperrung: false, posten: false,
    psa_geprueft: false, psa_getragen: false, psa_bemerkung: "",
    maschinen: [{ art: "", bediener: "" }], gefaehrdungen: [],
    massnahmen_eingeleitet: false, massnahmen_unterwiesen: false, unterschrift: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleMaschinenChange = (i, field, val) => {
    const maschinen = [...formData.maschinen];
    maschinen[i][field] = val;
    setFormData((prev) => ({ ...prev, maschinen }));
  };

  const addMaschine = () => {
    setFormData((prev) => ({
      ...prev,
      maschinen: [...prev.maschinen, { art: "", bediener: "" }]
    }));
  };

  const toggleGefaehrdung = (item) => {
    setFormData((prev) => ({
      ...prev,
      gefaehrdungen: prev.gefaehrdungen.includes(item)
        ? prev.gefaehrdungen.filter((g) => g !== item)
        : [...prev.gefaehrdungen, item]
    }));
  };

  const goToStep = (label) => {
    const index = steps.indexOf(label);
    if (index >= 0) setStep(index);
  };

  const renderStep = () => {
    if (steps[step] === "Zusammenfassung") {
      return (
        <div className="summary">
          {Object.entries(formData).map(([key, value]) => {
            const label = Object.entries(fieldMap).find(([, v]) => v === key)?.[0] || key;
            const display = Array.isArray(value)
              ? value.map(v => typeof v === "object" ? `${v.art} (${v.bediener})` : v).join(", ")
              : typeof value === "boolean" ? (value ? "Ja" : "Nein") : value;
            return (
              <div key={key} onClick={() => goToStep(label)} className="summary-item">
                <b>{label}:</b> {display}
              </div>
            );
          })}
        </div>
      );
    }

    if (steps[step] === "Ansprechpartner Kunde") {
      return (
        <>
          <input type="text" name="ansprechpartner_name" value={formData.ansprechpartner_name} onChange={handleChange} placeholder="Name" />
          <input type="tel" name="ansprechpartner_tel" value={formData.ansprechpartner_tel} onChange={handleChange} placeholder="Telefon" />
        </>
      );
    }

    if (steps[step] === "Maßnahmen") {
      return (
        <>
          <label><input type="checkbox" name="massnahmen_eingeleitet" checked={formData.massnahmen_eingeleitet} onChange={handleChange} /> Maßnahmen eingeleitet?</label>
          <label><input type="checkbox" name="massnahmen_unterwiesen" checked={formData.massnahmen_unterwiesen} onChange={handleChange} /> Maßnahmen unterwiesen?</label>
        </>
      );
    }

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
    <div className="form-container">
      <h1>{steps[step]}</h1>
      {renderStep()}
      <div className="btns">
        {step > 0 && <button onClick={() => setStep(step - 1)}>Zurück</button>}
        {step < steps.length - 1 && <button onClick={() => setStep(step + 1)}>Weiter</button>}
      </div>
    </div>
  );
}

export default App;
