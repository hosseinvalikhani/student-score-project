// Importing necessary modules and data structures
import userData from './addRow.js'; // Import the userData array
import { createRow, createPagination } from './addRow.js'; // Import functions to update UI after data operations
import { deleteLocalItem, getData, localData } from './allFunctionModule.js'; // Import data manipulation functions

// DOM element selections for the delete modal and the overlay
const modalDlt = document.querySelector('.modal--delete'); // Delete confirmation modal
const overlay = document.querySelector('.overlay'); // Overlay that appears with modals
let idNumber; // Variable to store the ID of the data item to be deleted
const table = document.querySelector('.myTab'); // Main data display table

// Function to open the delete confirmation modal
export function openDeleteModal(button) {
  modalDlt.classList.remove('hidden'); // Show the delete modal
  modalDlt.classList.add('flex'); // Ensure the modal is displayed as a flex container
  overlay.classList.remove('hidden'); // Show the overlay
  overlay.classList.add('block'); // Ensure the overlay is displayed as a block
  idNumber = button.id; // Store the ID from the button used to trigger the modal

  modalDlt.innerHTML = ''; // Clear any previous contents of the modal

  // HTML content for the delete confirmation modal, showing details of the item to delete
  let modalHtml = `<button class="close-modal" onclick="cancelDlt()">&times;</button>
    <div
      class="flex flex-col justify-center items-center px-4 rounded-md gap-8 mt-2"
    >
      <p class="font-poppins">Are you sure?</p>
      <p class="w-36"><span>Name: </span>${userData[idNumber - 1].stuName}</p>
      <p class="w-36"><span>Course: </span>${userData[idNumber - 1].course}</p>
      <p class="w-36"><span>Score: </span>${userData[idNumber - 1].score}</p>
      <p class="w-36 flex gap-4">
        <button class="delBtn del-btn-${idNumber} w-16 bgRed" onclick="cancelDlt()">
          Cancel
        </button>
        <button class="editBtn w-16 backColor2" onclick="remove()">
          Yes
        </button>
      </p>
    </div>`;

  modalDlt.insertAdjacentHTML('beforeend', modalHtml); // Insert the HTML into the modal
}

// Function to cancel the delete action and hide the modal
export function cancelDlt() {
  modalDlt.classList.remove('flex'); // Hide the modal
  modalDlt.classList.add('hidden');
  overlay.classList.remove('block'); // Hide the overlay
  overlay.classList.add('hidden');
}

// Function to execute the deletion of the item
export async function remove() {
  setTimeout(() => {
    // Delay to simulate asynchronous behavior
    const count = userData.length; // Get the current count of items in userData
    const part1 = userData.slice(0, idNumber - 1); // Array slice before the item to delete
    const part2 = userData.slice(idNumber, count); // Array slice after the item to delete
    const updatedUserData = part1.concat(part2); // Concatenate parts to update the userData array

    userData.length = 0; // Clear the original userData array
    userData.push(...updatedUserData); // Push the updated array back into userData

    deleteLocalItem(idNumber); // Call to delete the item from local storage

    table.innerHTML = ''; // Clear the table display
    createRow(); // Recreate the rows for the table
    createPagination(); // Update the pagination

    modalDlt.classList.remove('flex'); // Hide the modal
    modalDlt.classList.add('hidden');
    overlay.classList.remove('block'); // Hide the overlay
    overlay.classList.add('hidden');
  }, 1000); // 1-second delay
}
