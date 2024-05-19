'use strict';

// declare array for student data
let userData = [];

//select table
const table = document.querySelector('.myTab');

// select add button
const btn = document.querySelector('.btn');
btn.addEventListener('click', saveData);
const inputEmpty = document.querySelector('.input--Empty--text');

function saveData() {
  if (
    document.querySelector('.name').value === '' ||
    document.querySelector('.course').value === '' ||
    document.querySelector('.score').value === ''
  ) {
    inputEmpty.classList.remove('hidden');
    inputEmpty.classList.add('flex');

    return 0;
  }

  remDan();

  let stuName = document.querySelector('.name').value;
  let course = document.querySelector('.course').value;
  let score = document.querySelector('.score').value;
  userData.push({ stuName, course, score });
  table.innerHTML = '';
  console.log(table);
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

function remDan() {
  inputEmpty.classList.remove('flex');
  inputEmpty.classList.add('hidden');
}
const createRow = function () {
  userData.forEach((data, i) => {
    addRow(i);
  });
  table.insertAdjacentHTML('beforeend', rowText);
};

// let rowText = '';
// rowText += `<div class="myTab flex flex-col gap-2 items-center justify-center px-8">
// <div class="flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
//         <p class="w-36">Student Number</p>
//         <p class="w-36">Student Name</p>
//         <p class="w-36">Course Subject</p>
//         <p class="w-36">Score</p>
//         <p class="w-36">&nbsp;</p>

//       </div>`;
// const addRow = function (index) {
//   // console.log(userData[index].score,userData[index].course, userData[index].stuName);
//   rowText += `<div class="row flex items-center px-4 rounded-md gap-8 h-12 min-h-12 backColor mt-2 myShadow"
//   data-row="${index + 1}" id="row${index + 1}"
//   >
//     <p class="w-36">${index + 1}</p>
//     <p class="w-36">${userData[index].stuName}</p>
//     <p class="w-36">${userData[index].course}</p>
//     <p class="w-36">${userData[index].score}</p>
//     <p class="w-36 flex gap-4">
//         <button id="${index + 1}" data-btn="${
//     index + 1
//   }" class="delBtn del-btn-${
//     index + 1
//   } w-16 bg-red-700" onclick = "openDeleteModal(this)">delete</button>
//         <button id="${index + 1}" data-btn="${
//     index + 1
//   }" class="editBtn w-16 bg-blue-300" onclick = "editFunc(this)">edit</button>
//     </p>

//     </div>`;

//   document.querySelector('.name').value = '';
//   document.querySelector('.course').value = '';
//   document.querySelector('.score').value = '';
// };

const modalDlt = document.querySelector('.modal--delete');
// const modalDltHtml = document.querySelector('.modal--html');
let idNumber;
function openDeleteModal(button) {
  modalDlt.classList.remove('hidden');
  modalDlt.classList.add('flex');
  overlay.classList.remove('hidden');
  overlay.classList.add('block');
  idNumber = button.id;
  console.log(button);
  console.log(idNumber);
  modalDlt.innerHTML = '';
  // let modalHtml = `<div class="flex  flex-col justify-center items-center px-4 rounded-md gap-8 h-12 min-h-12 mt-2"
  //  id="row${idNumber}"
  // >
  //   <p class="font-poppins">Are you sure?</P>
  //   <p class="w-36">${userData[idNumber - 1].stuName}</p>
  //   <p class="w-36">${userData[idNumber - 1].course}</p>
  //   <p class="w-36">${userData[idNumber - 1].score}</p>
  //   <p class="w-36 flex gap-4">
  //       <button id="${idNumber}"
  // }" class="delBtn del-btn-${idNumber} w-16 bg-red-700" onclick = "remove(this)">delete</button>
  //       <button id="${idNumber}" data-btn="${idNumber}" class="editBtn w-16 bg-blue-300" onclick = "editFunc(this)">edit</button>
  //   </p>

  //   </div>`;
  let modalHtml = `<button class="close-modal" onclick="cancelDlt()">&times;</button>
  <div
    class="flex flex-col justify-center items-center px-4 rounded-md gap-8 mt-2"
  >
    <p class="font-poppins">Are you sure?</p>
    <p class="w-36"><span>Name: </span>${userData[idNumber - 1].stuName}</p>
    <p class="w-36"><span>Course: </span>${userData[idNumber - 1].course}</p>
    <p class="w-36"><span>Score: </span>${userData[idNumber - 1].score}</p>
    <p class="w-36 flex gap-4">
      <button
        class="delBtn del-btn-${idNumber} w-16 bgRed"
        onclick="cancelDlt()"
      >
        Cancel
      </button>
      <button class="editBtn w-16 backColor2" onclick="remove()">
        Yes
      </button>
    </p>
  </div>`;
  console.log(modalHtml);
  modalDlt.insertAdjacentHTML('beforeend', modalHtml);
}
function remove() {
  let count = userData.length;
  const part1 = userData.slice(0, idNumber - 1);
  console.log(part1);
  const part2 = userData.slice(idNumber, count);
  console.log(part2);
  userData = part1.concat(part2);
  console.log(userData);

  table.innerHTML = '';
  rowText = `
    <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
            <p class="w-36">Student Number</p>
            <p class="w-36">Student Name</p>
            <p class="w-36">Course Subject</p>
            <p class="w-36">Score</p>
            <p class="w-36">&nbsp;</p>

          </div>`;
  createRow();
  modalDlt.classList.remove('flex');
  modalDlt.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}
function cancelDlt() {
  console.log(modalDlt);
  modalDlt.classList.remove('flex');
  modalDlt.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}
// edit modal
let number;
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

function editFunc(button) {
  number = button.id;
  modal.classList.remove('hidden');
  modal.classList.add('block');
  overlay.classList.remove('hidden');
  overlay.classList.add('block');
  console.log(userData[number - 1].course);
  document.querySelector('.nameModal').value = userData[number - 1].stuName;
  document.querySelector('.courseModal').value = userData[number - 1].course;
  document.querySelector('.scoreModal').value = userData[number - 1].score;
}
function done() {
  let count = userData.length;
  let stuName = document.querySelector('.nameModal').value;
  let course = document.querySelector('.courseModal').value;
  let score = document.querySelector('.scoreModal').value;
  const part1 = userData.slice(0, number - 1);
  console.log(part1);
  part1.push({ stuName, course, score });
  console.log(part1);
  const part2 = userData.slice(number, count);
  console.log(part2);
  userData = part1.concat(part2);
  console.log(userData);
  document.querySelector('.nameModal').value = '';
  document.querySelector('.courseModal').value = '';
  document.querySelector('.scoreModal').value = '';

  table.innerHTML = '';
  console.log(table);
  rowText = `
    <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
            <p class="w-36">Student Number</p>
            <p class="w-36">Student Name</p>
            <p class="w-36">Course Subject</p>
            <p class="w-36">Score</p>
            <p class="w-36">&nbsp;</p>
            
          </div>`;
  createRow();
  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}

function cancel() {
  let stuName = document.querySelector('.nameModal').value;
  let course = document.querySelector('.courseModal').value;
  let score = document.querySelector('.scoreModal').value;

  document.querySelector('.nameModal').value = '';
  document.querySelector('.courseModal').value = '';
  document.querySelector('.scoreModal').value = '';

  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}

function Hider() {
  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}
overlay.addEventListener('click', () => {
  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');

  modalDlt.classList.remove('flex');
  modalDlt.classList.add('hidden');
});
// delete modal
