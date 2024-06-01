// Importing necessary functions and data array from the 'allFunctionModule.js' file
import { getData, userData } from './allFunctionModule.js';

// Selecting DOM elements for buttons used to trigger download actions
const downloadPdfBtn = document.querySelector('#download-pdf');
const downloadCsvBtn = document.querySelector('#download-csv');

// Function to download the user data as a PDF document
export async function downloadPDF() {
  if (!window.jspdf) {
    console.error('jsPDF is not loaded.'); // Error handling if jsPDF library is not loaded
    return;
  }
  const { jsPDF } = window.jspdf; // Destructure jsPDF from window object

  const doc = new jsPDF(); // Create a new PDF document
  const data = await getData(); // Fetch data to be included in the PDF

  // Map user data to a format suitable for the PDF table
  const tableData = data.map((item, index) => [
    index + 1,
    item.stuName,
    item.course,
    item.score,
  ]);

  // Define columns for the PDF table
  const tableColumns = [
    'Student Number',
    'Student Name',
    'Course Subject',
    'Score',
  ];

  // Create a table in the PDF document
  doc.autoTable({
    head: [tableColumns], // Table header
    body: tableData, // Table body
    startY: 20, // Starting Y position of the table
    theme: 'grid', // Table theme
    headStyles: { fillColor: [22, 160, 133] }, // Header fill color
    bodyStyles: { fillColor: [171, 219, 227] }, // Body fill color
    alternateRowStyles: { fillColor: [240, 240, 240] }, // Alternate row fill color
  });

  doc.save('user_data.pdf'); // Save the PDF with the filename 'user_data.pdf'
}

// Function to download the user data as a CSV file
export function downloadCSV() {
  let csvContent = 'data:text/csv;charset=utf-8,'; // Initialize CSV content with header
  csvContent += 'Student Number,Student Name,Course Subject,Score\n'; // Add header row

  // Add each user data item as a row in the CSV
  userData.forEach((item, index) => {
    csvContent += `${index + 1},${item.stuName},${item.course},${item.score}\n`;
  });

  // Encode CSV content for URL
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a'); // Create a link element
  link.setAttribute('href', encodedUri); // Set href to the encoded URI
  link.setAttribute('download', 'user_data.csv'); // Set the download attribute
  document.body.appendChild(link); // Append link to the document body for Firefox compatibility
  link.click(); // Trigger download
  document.body.removeChild(link); // Remove link from document body after triggering download
}

// Add event listeners for PDF and CSV download buttons
downloadPdfBtn.addEventListener('click', await downloadPDF);
downloadCsvBtn.addEventListener('click', downloadCSV);

// Function to toggle accordion display
export function accToggle(button) {
  let x = button.id; // Get ID from the button element
  console.log('Button of index clicked!', x);
  'This is:', button;

  const accFirst = document.querySelector(`.accard--${x}`); // Select the accordion element corresponding to the button

  console.log('Accordion class list:', accFirst.classList);
  accFirst.classList.toggle('flex'); // Toggle 'flex' class
  accFirst.classList.toggle('hidden'); // Toggle 'hidden' class
}
