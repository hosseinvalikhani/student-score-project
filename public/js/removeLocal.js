// Function to clear data from local storage
import userData from './addRow.js';
import { createRow } from './addRow.js';
const table = document.querySelector('.myTab');
const clData = document.querySelector('.clearData');

// clData.addEventListener('click', clearData);
export function clearData() {
  localStorage.removeItem('userData');
  console.log(localStorage);
  alert('Data cleared!');
  table.innerHTML = '';
  userData.length = 0;
  console.log(userData);

  createRow();
}

export function arrayData() {
  return userData;
}
