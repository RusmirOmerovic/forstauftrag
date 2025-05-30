export async function findeNaechstenRettungspunkt(lat, lng) {
    const response = await fetch('/KWF_Rettungspunkte_4747323711491929377.geojson');
    const data = await response.json();
    const punkte = data.features;
  
    let naechster = null;
    let kuerzesteDistanz = Infinity;
  
    for (const punkt of punkte) {
      const [lng2, lat2] = punkt.geometry.coordinates;
      const distanz = Math.sqrt((lat - lat2) ** 2 + (lng - lng2) ** 2); // einfache Näherung
  
      if (distanz < kuerzesteDistanz) {
        kuerzesteDistanz = distanz;
        naechster = punkt;
      }
    }
  
    return naechster?.properties || null;
  }
  