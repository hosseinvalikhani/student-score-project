import { getData, localData, userData } from './allFunctionModule.js';

// console.log('get data:', getData);
let rowText = '';

// btn.addEventListener('click', addRow);

const btn = document.querySelector('.btn');
const table = document.querySelector('.myTab');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalDlt = document.querySelector('.modal--delete');

overlay.addEventListener('click', () => {
  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');

  modalDlt.classList.remove('flex');
  modalDlt.classList.add('hidden');
});

// let userData = [];

// setTimeout(() => console.log(userData), 12000);

// if (JSON.parse(localStorage.getItem('userData'))) {
//   getData();
//   createRow();
// }

// export function localData(data) {
//   // localStorage.setItem('userData', JSON.stringify(data));
//   setTimeout(() => localStorage.setItem('userData', JSON.stringify(data)), 0);
// }
// export function getData() {
//   // userData = JSON.parse(localStorage.getItem('userData'));

//   setTimeout(() => {
//     userData = JSON.parse(localStorage.getItem('userData'));
//     console.log(userData);
//   }, 0);
// }
async function init() {
  if (JSON.parse(localStorage.getItem('userData'))) {
    const data = await getData();
    console.log('my get data is:', data);
    createRow();
  }
  // if (!JSON.parse(localStorage.getItem('userData'))) {
  //   userData.length = 0;
  //   console.log('user data is', userData);
  // }
}

await init();

// export async function localData(data) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       localStorage.setItem('userData', JSON.stringify(data));
//       resolve();
//     }, 1000);
//   });
// }

// export async function getData() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       userData = JSON.parse(localStorage.getItem('userData'));
//       console.log(userData);
//       resolve(userData);
//     }, 1000);
//   });
// }

// console.log(JSON.parse(localStorage.getItem('userData')));
// console.log(userData);
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

export function remDan() {
  inputEmpty.classList.remove('flex');
  inputEmpty.classList.add('hidden');
}

// const stuArrays = userData.map(stu => Object.values(stu));
// console.log('student array:', stuArrays);
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
  // userData = '';
  // Retrieve existing data from local storage and parse it to an array
  // userData = JSON.parse(localStorage.getItem('userData')) || [];

  // Add new data to the array
  userData.push({ stuName, course, score });

  // Save updated array back to local storage as a JSON string
  localData(userData);

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

export function createRow() {
  rowText = `
  <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
          <p class="w-36">Student Number</p>
          <p class="w-36">Student Name</p>
          <p class="w-36">Course Subject</p>
          <p class="w-36">Score</p>
          <p class="w-36">&nbsp;</p>
          
        </div>`;

  // userData.slice((pageNumber - 1) * 10, pageNumber*10);
  userData.forEach((data, i) => {
    addRow(i);
  });
  table.innerHTML = '';
  // console.log(rowText);
  table.insertAdjacentHTML('beforeend', rowText);
}

function addRow(index) {
  // console.log('in add row user data is : ', arrayData.userData);

  rowText += `<div class="row flex items-center px-4 rounded-md gap-8 h-12 min-h-12 backColor mt-2 myShadow"
  data-row="${index + 1}" id="row${index + 1}"
  >
    <p class="w-36">${index + 1}</p>
    <p class="w-36">${userData[index].stuName}</p>
    <p class="w-36">${userData[index].course}</p>
    <p class="w-36">${userData[index].score}</p>
    <p class="w-36 flex gap-4">
        <button id="${index + 1}" data-btn="${
    index + 1
  }" class="delBtn del-btn-${
    index + 1
  } w-16 bg-red-700" onclick = "openDeleteModal(this)">delete</button>
        <button id="${index + 1}" data-btn="${
    index + 1
  }" class="editBtn w-16 bg-blue-300" onclick = "editFunc(this)">edit</button>
    </p>
    
    </div>`;

  document.querySelector('.name').value = '';
  document.querySelector('.course').value = '';
  document.querySelector('.score').value = '';
  return rowText;
}
export default userData;
