import { getData, localData, userData } from './allFunctionModule.js';

// Initialization of pagination variables
let pageNumber = 0;
let rowText = '';

// DOM element selectors for interacting with the HTML document
const btn = document.querySelector('.btn');
const table = document.querySelector('.myTab');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalDlt = document.querySelector('.modal--delete');

// Overlay click event handler to hide modal elements
overlay.addEventListener('click', () => {
  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');

  modalDlt.classList.remove('flex');
  modalDlt.classList.add('hidden');
});

// Function to update active page number and store in local storage
function activePage() {
  z = 1;
  pageNumber = Math.floor((userData.length - 1) / 10);
  localStorage.setItem('page', JSON.stringify(pageNumber));
}

const pagination = document.querySelector('.pagination');

let numberOfPage;

// Function to create pagination buttons based on the number of pages
export function createPagination() {
  pagination.innerHTML = '';
  let buttons = '';
  numberOfPage = Math.floor((userData.length - 1) / 10);
  for (let i = 0; i < numberOfPage + 1; i++) {
    if (userData.length === 0) {
      break;
    }
    buttons += `<button class="bg-blue-300 w-8 h-8" id='${
      i + 1
    }' onclick="goToPage(this)" >${i + 1}</button>`;
  }
  pagination.insertAdjacentHTML('beforeend', buttons);
}

createPagination();

let z;
// Function to navigate to a specific page and update table contents accordingly
export function goToPage(button) {
  rowText = `
  <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
          <p class="w-36">Student Number</p>
          <p class="w-36">Student Name</p>
          <p class="w-36">Course Subject</p>
          <p class="w-36">Score</p>
          <p class="w-36">&nbsp;</p>
          
        </div>`;

  console.log('my button is:', button);
  console.log('my button id is:', button.id);
  pageNumber = button.id - 1;
  localStorage.setItem('page', JSON.stringify(pageNumber));
  userData.slice(pageNumber * 10, (pageNumber + 1) * 10).forEach((data, i) => {
    addRow(pageNumber * 10 + i);
  });
  table.innerHTML = '';

  table.insertAdjacentHTML('beforeend', rowText);
}

// Initial setup function to fetch data and configure initial view
async function init() {
  if (JSON.parse(localStorage.getItem('userData'))) {
    const data = await getData();

    pageNumber = JSON.parse(localStorage.getItem('page'));

    createPagination();
    createRow();
  }
}

await init();

const inputEmpty = document.querySelector('.input--Empty--text');

rowText = `
  <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
          <p class="w-36">Student Number</p>
          <p class="w-36">Student Name</p>
          <p class="w-36">Course Subject</p>
          <p class="w-36">Score</p>
          <p class="w-36">&nbsp;</p>

        </div>`;

btn.addEventListener('click', saveData);

// Function to validate input fields and save new data entry
function saveData() {
  let stuName = document.querySelector('.name').value;
  let course = document.querySelector('.course').value;
  let score = document.querySelector('.score').value;

  if (
    document.querySelector('.name').value === '' ||
    document.querySelector('.course').value === '' ||
    document.querySelector('.score').value === ''
  ) {
    alert('fill all input');

    return 0;
  }
  // Update local storage and refresh table view

  // Save updated array back to local storage as a JSON string
  localData(userData);
  if ((z = 1)) {
    activePage();
  }
  alert('Data saved!');

  rowText = `
  <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
          <p class="w-36">Student Number</p>
          <p class="w-36">Student Name</p>
          <p class="w-36">Course Subject</p>
          <p class="w-36">Score</p>
          <p class="w-36">&nbsp;</p>

        </div>`;
  createRow();
}

// Function to construct and display rows based on current data
export function createRow() {
  rowText = `
  <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
          <p class="w-36">Student Number</p>
          <p class="w-36">Student Name</p>
          <p class="w-36">Course Subject</p>
          <p class="w-36">Score</p>
          <p class="w-36">&nbsp;</p>
          
        </div>`;

  userData.slice(pageNumber * 10, (pageNumber + 1) * 10).forEach((data, i) => {
    addRow(pageNumber * 10 + i);
  });
  table.innerHTML = '';
  // console.log(rowText);
  table.insertAdjacentHTML('beforeend', rowText);
  console.log('create row user data is:', userData);
  createPagination();
}

// Function to dynamically add rows to the table
function addRow(index) {
  rowText += `<div
  class="row flex flex-col items-center rounded-md backColor mt-2"
  data-row="${index + 1}"
  id="row${index + 1}"
>
  <div class="row flex items-center px-4 rounded-md gap-8 h-10 backColor mt-2">
    <p class="w-36">${index + 1}</p>

    <p class="w-36">${userData[index].stuName}</p>
    <button
      id="${index + 1}"
      data-btn="1"
      class="delBtn del-btn-${index + 1} w-16 bg-red-700"
      onclick="openDeleteModal(this)"
    >
      delete
    </button>
    <button
      id="${index + 1}"
      data-btn="${index + 1}"
      class="editBtn w-16 bg-blue-300"
      onclick="editFunc(this)"
    >
      edit
    </button>
    <button
      id="${index + 1}"
      data-btn="1"
      class="w-36 bg-blue-400"
      onclick="accToggle(this)"
    >
      Accardion
    </button>
  </div>

  <div
    class="accard--${
      index + 1
    } hidden w-full h-10 items-center justify-evenly bg-blue-200 px-4 rounded-b-md"
    id="accard--1"
  >
    <p class="px-4">Course Subject is:

    ${userData[index].course}</p>

    <p class="px-4"> score is:${userData[index].score}</p>
  </div>
</div>
`;

  document.querySelector('.name').value = '';
  document.querySelector('.course').value = '';
  document.querySelector('.score').value = '';
  return rowText;
}

// Export userData array for potential external use
export default userData;
