// src/utils/pdfExport.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId, filename = "formularexport.pdf") => {
  const input = document.getElementById(elementId);

  if (!input) {
    console.error("Element nicht gefunden:", elementId);
    return;
  }

  const canvas = await html2canvas(input, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4"
  });

  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save(filename);
};
