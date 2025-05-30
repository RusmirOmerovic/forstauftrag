import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
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

  return (
    <FormContext.Provider value={{ step, setStep, formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
