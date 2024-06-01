// Module for managing user data stored in the browser's local storage
export let userData = []; // Exportable array to hold user data

// Import function to create or update rows on the UI
import { createRow } from './addRow.js';

// DOM element selector for the main table where data is displayed
const table = document.querySelector('.myTab');

// Function to save data to localStorage
export async function localData(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem('userData', JSON.stringify(data)); // Store data in localStorage as a string
      resolve(); // Resolve the promise after storing data
    }, 0); // Simulate asynchronous storage with timeout
  });
}
// Function to fetch data from localStorage and populate userData array
export async function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      const storedData = localStorage.getItem('userData'); // Retrieve data from localStorage
      if (storedData) {
        const updatedUserData = JSON.parse(storedData); // Parse the JSON data

        userData.length = 0; // Clear the original array
        userData.push(...updatedUserData); // Populate userData with fetched data
        resolve(userData); // Resolve the promise with updated array
      } else {
        resolve([]); // Resolve with empty array if no data found
      }
    }, 0); // Timeout set to 0 to simulate asynchronous operation
  });
}
// Function to clear all user data from localStorage
export async function clearData() {
  localStorage.removeItem('userData'); // Remove the userData item from localStorage
  alert('Data cleared!'); // Alert user that data has been cleared
  const pagination = document.querySelector('.pagination'); // DOM element selector for pagination
  pagination.innerHTML = ''; // Clear pagination
  table.innerHTML = ''; // Clear table content
  userData.length = 0; // Reset userData array
  createRow(); // Re-create rows to reflect the cleared data state
}

// Function to delete a specific item from userData by its index
export async function deleteLocalItem(idNumber) {
  return new Promise(resolve => {
    setTimeout(() => {
      let myLocalData = localStorage.getItem('userData');
      const tempData = JSON.parse(myLocalData); // Parse the existing data
      console.log('my temp data:', tempData);
      const count = tempData.length; // Get total count of items in the array
      const part1 = tempData.slice(0, idNumber - 1); // Split array before the item to delete
      const part2 = tempData.slice(idNumber, count); // Split array after the item to delete

      const updatedUserData = part1.concat(part2); // Concatenate parts to form updated array
      localStorage.setItem('userData', JSON.stringify(updatedUserData)); // Store updated data in localStorage
      resolve(); // Resolve the promise after completing deletion
    }, 0);
  });
}

// Function to edit an item in the userData array by its index
export async function editLocalItem(number, stuName, course, score) {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        let myLocalData = localStorage.getItem('userData');
        const tempData = JSON.parse(myLocalData); // Parse the existing data
        const count = tempData.length;
        const part1 = tempData.slice(0, number - 1); // Split array before the item to edit
        part1.push({ stuName, course, score }); // Push updated item to the first part
        const part2 = tempData.slice(number, count); // Remaining part after the item

        const updatedUserData = part1.concat(part2); // Concatenate parts to form updated array
        localStorage.setItem('userData', JSON.stringify(updatedUserData)); // Store updated data in localStorage
        resolve(); // Resolve the promise after completing edit
      }, 0);
    });
  } catch (error) {
    console.error('check your code', error); // Catch and log any errors
  }
}
