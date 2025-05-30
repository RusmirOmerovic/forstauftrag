import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function exportToPDF(formData) {
  const docDefinition = {
    content: [
      { text: '📝 Forst-Auftragsformular', style: 'header' },
      { text: '\n' },

      {
        table: {
          widths: ['40%', '60%'],
          body: Object.entries(formData).map(([key, value]) => {
            const label = key.replace(/_/g, ' ').toUpperCase();
            let displayValue = Array.isArray(value)
              ? value.map(v =>
                  typeof v === "object" ? `${v.art} (${v.bediener})` : v
                ).join(", ")
              : typeof value === "boolean"
              ? value ? "Ja" : "Nein"
              : value;
            return [label, displayValue];
          }),
        },
        layout: 'lightHorizontalLines'
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center'
      }
    }
  };

  pdfMake.createPdf(docDefinition).download("forstauftrag.pdf");
}
