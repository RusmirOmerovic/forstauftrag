import React, { useState } from 'react';

export default function Notfallplan() {
  const [open, setOpen] = useState(false);

  const notfallinfos = [
    {
      title: 'Verhalten bei Unfällen',
      content: `1. Ruhe bewahren
2. Menschen retten – Ersthelfer informieren
3. Unfallgefahr beseitigen, Erste Hilfe leisten
4. Notruf wählen: 112
5. Vorgesetzte informieren
6. Betriebsarzt kontaktieren`
    },
    {
      title: 'Verhalten im Brandfall',
      content: `1. Ruhe bewahren
2. Menschen retten
3. Brand melden: 112
4. Feuerwehr informieren
5. Verhaltensanforderungen:
  - Gefahrenbereich verlassen
  - Behinderten helfen
  - Gekennzeichnete Rettungswege benutzen
  - Keine Aufzüge benutzen
  - Verqualmte Räume gebückt verlassen
  - Türen & Fenster schließen
  - Entstehungsbrand bekämpfen
  - Sammelplatz aufsuchen
  - Feuerwehr einweisen & Anweisungen folgen`
    },
    {
      title: 'Wichtige Rufnummern',
      content: `Polizei: 112
Giftnotruf: 030/19240
Sicherheitsfachkraft: Martin Haindl, 0160/96315705
Firma Schweiger, Büro: 08081/955855-0
info@schweiger-transporte.com`
    }
  ];

  return (
    <div className="relative inline-block ml-4 w-full">
      <button
        onClick={() => setOpen(!open)}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        🚨 Notfallplan
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-full max-w-6xl bg-white border border-gray-300 rounded shadow-lg z-50 p-6 text-sm overflow-x-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {notfallinfos.map((info, idx) => (
              <div key={idx} className="flex-1 bg-gray-50 border-l-4 border-red-500 p-4 rounded shadow-sm min-w-[300px]">
                <h4 className="font-bold text-red-700 mb-2 text-base border-b pb-1">{info.title}</h4>
                <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">{info.content}</pre>
              </div>
            ))}
          </div>
          <div className="text-right mt-4">
            <button onClick={() => setOpen(false)} className="text-sm text-blue-500 underline">
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
