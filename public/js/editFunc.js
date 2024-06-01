// Importing necessary modules and components
import userData from './addRow.js'; // Import userData array from addRow.js module
import { createRow } from './addRow.js'; // Import createRow function for dynamically creating table rows
import { editLocalItem } from './allFunctionModule.js'; // Import functions for data handling from allFunctionModule.js

// Selecting DOM elements for interaction
const modal = document.querySelector('.modal'); // Modal for editing entries
const overlay = document.querySelector('.overlay'); // Overlay for modal display
const table = document.querySelector('.myTab'); // Table where user data is displayed
let number; // Variable to store the index of the current data being edited

// Function to initialize the edit process by setting up the modal with data
export function editFunc(button) {
  number = button.id; // Capture the ID of the button to identify which entry is being edited
  modal.classList.remove('hidden'); // Make the modal visible
  modal.classList.add('block');
  overlay.classList.remove('hidden'); // Display the overlay
  overlay.classList.add('block');

  // Set the values in the modal inputs from userData based on the 'number'
  document.querySelector('.nameModal').value = userData[number - 1].stuName;
  document.querySelector('.courseModal').value = userData[number - 1].course;
  document.querySelector('.scoreModal').value = userData[number - 1].score;
}

// Function to finalize the editing process
export function done() {
  // Capture the new values from the modal
  let stuName = document.querySelector('.nameModal').value;
  let course = document.querySelector('.courseModal').value;
  let score = document.querySelector('.scoreModal').value;

  // Check if data has been changed
  if (
    stuName === userData[number - 1].stuName &&
    course === userData[number - 1].course &&
    score === userData[number - 1].score
  ) {
    alert('Nothing Changed! please edit data');
    return;
  }

  // Preparing to update userData array with new values
  const count = userData.length;
  const part1 = userData.slice(0, number - 1); // Get first part of the array up to the edited item
  part1.push({ stuName, course, score }); // Push new values to the part1 array
  const part2 = userData.slice(number, count); // Get remaining part of the array

  const updatedUserData = part1.concat(part2); // Combine parts with updated item in between

  // Clear the original array and update with new data
  userData.length = 0;
  userData.push(...updatedUserData);

  // Persist the updated data to local storage
  editLocalItem(number, stuName, course, score);

  // Reset modal inputs and close the modal
  document.querySelector('.nameModal').value = '';
  document.querySelector('.courseModal').value = '';
  document.querySelector('.scoreModal').value = '';

  table.innerHTML = ''; // Clear table
  createRow(); // Recreate the rows in the table

  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}

// Function to cancel the editing process and close the modal
export function cancel() {
  // Reset modal inputs
  document.querySelector('.nameModal').value = '';
  document.querySelector('.courseModal').value = '';
  document.querySelector('.scoreModal').value = '';

  // Hide the modal and overlay
  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}
