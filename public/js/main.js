import { getData, userData } from "./allFunctionModule.js";

const downloadPdfBtn = document.querySelector("#download-pdf");
const downloadCsvBtn = document.querySelector("#download-csv");

// export async function downloadPDF() {
//   const { jsPDF } = window.jspdf;

//   const doc = new jsPDF();
//   const data = await getData();

//   let yOffset = 10;
//   doc.text('User Data', 10, yOffset);
//   yOffset += 10;

//   data.forEach((item, index) => {
//     doc.text(
//       `${index + 1}: ${item.stuName} - ${item.course} - ${item.score}`,
//       10,
//       yOffset
//     );
//     yOffset += 10;
//   });

//   doc.save('user_data.pdf');
// }
export async function downloadPDF() {
  if (!window.jspdf) {
    console.error("jsPDF is not loaded.");
    return;
  }
  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();
  const data = await getData();

  // Prepare data for the table
  const tableData = data.map((item, index) => [
    index + 1,
    item.stuName,
    item.course,
    item.score,
  ]);

  // Define table columns
  const tableColumns = [
    "Student Number",
    "Student Name",
    "Course Subject",
    "Score",
  ];
  //   console.log(tableColumns);
  // Create table in PDF
  doc.autoTable({
    head: [tableColumns],
    body: tableData,
    startY: 20,
    theme: "grid", // You can change the theme to 'plain', 'grid', or 'striped'
    headStyles: { fillColor: [22, 160, 133] }, // Change header color
    bodyStyles: { fillColor: [171, 219, 227] }, // Change body color
    alternateRowStyles: { fillColor: [240, 240, 240] }, // Change alternate row color
  });

  doc.save("user_data.pdf");
}
export function downloadCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Student Number,Student Name,Course Subject,Score\n";

  userData.forEach((item, index) => {
    csvContent += `${index + 1},${item.stuName},${item.course},${item.score}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "user_data.csv");
  document.body.appendChild(link); // Required for FF
  link.click();
  document.body.removeChild(link);
}
// console.log(window.jsPDF);
downloadPdfBtn.addEventListener("click", await downloadPDF);
downloadCsvBtn.addEventListener("click", downloadCSV);

export function accToggle(button) {
  // accBtn = button;
  let x = button.id;

  const accFirst = document.querySelector(`.accard--${x}`);
  const accFirst2 = document.querySelector("#accard--1");

  accFirst.classList.toggle("flex");
  accFirst.classList.toggle("hidden");
}
