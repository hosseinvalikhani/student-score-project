'use strict';
let userData = [];

let deleteBtn = [];

// let stuName = document.querySelector('.name').value;
// let course = document.querySelector('.course').value;
// let score = document.querySelector('.score').value;
// userData.push({ stuName, course, score });
const table = document.querySelector('.myTab');
const body = document.querySelector('body');
// console.log(body);
// console.log(table);
const saveData = function () {
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
  // deleteBtn = [];
  // let dBtn = document.querySelectorAll(".delBtn");
  // deleteBtn.push(dBtn);
  // dBtn.forEach((myBtn, i) =>
  //   document
  //     .querySelector(`.del-btn-${i + 1}`)
  //     .addEventListener("click", function () {
  //       delRow(`${i}`);
  //     })
  // );
  // console.log(dBtn);
  // console.log(deleteBtn);

  // console.log("slm", document.getElementById("btn-1"));
  // const deleteFunc = function () {};
  // deleteBtn.forEach((btn, i) =>
  //   btn.addEventListener("click", () => console.log("hi"))
  // );
};

// function delRow(index) {
//   // console.log(userData[index]);
//   userData.splice(index, 1);
//   console.log(userData);
//   document.querySelector(`.del-btn-${index + 1}`);
//   createTable();
// }

// const createTable = function () {
//   // table.innerHTML = "";

//   userData.forEach((s, i) => {
//     addRow(i);
//   });
//   table.insertAdjacentHTML("beforeend", rowText);
//   let dBtn = document.querySelectorAll(".delBtn");
//   dBtn.forEach((myBtn, i) =>
//     document
//       .querySelector(`.del-btn-${i + 1}`)
//       .addEventListener("click", function () {
//         delRow(`${i}`);
//       })
//   );
// };

const createRow = function () {
  userData.forEach((s, i) => {
    addRow(i);
  });

  // console.log(rowText);
  table.insertAdjacentHTML('beforeend', rowText);

  // console.log(userData);
};
let rowText = '';
rowText += `<div class="myTab flex flex-col gap-2 items-center justify-center px-8">
<div class="flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
        <p class="w-36">Student Number</p>
        <p class="w-36">Student Name</p>
        <p class="w-36">Course Subject</p>
        <p class="w-36">Score</p>
        <p class="w-36">&nbsp;</p>
        
      </div>`;
const addRow = function (index) {
  // console.log(userData[index].score,userData[index].course, userData[index].stuName);
  rowText += `<div class="row flex items-center px-4 rounded-md gap-8 h-12 min-h-12 backColor mt-2"
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
  } w-16 bg-red-700" onclick = "remove(this)">delete</button>
        <button id="${index + 1}" data-btn="${
    index + 1
  }" class="editBtn w-16 bg-blue-300" onclick = "editFunc(this)">edit</button>
    </p>
    
    </div>`;

  document.querySelector('.name').value = '';
  document.querySelector('.course').value = '';
  document.querySelector('.score').value = '';

  // const btn1 = document.getElementById(".btn-1");
  // btn1.addEventListener("click", () => {
  //   console.log("kirkhar");
  // });

  // const text = 'hirad'
  // table.insertAdjacentHTML("beforeend", text);

  // console.log(rowText);

  // userData[i].forEach((s)=>console.log(s.score,s.stuName,s.course));
};

const btn = document.querySelector('.btn');
btn.addEventListener('click', saveData);

function remove(button) {
  let number = button.id;
  // let row = document.getElementById(`row${number}`);
  // row.remove();
  let count = userData.length;
  const part1 = userData.slice(0, number - 1);
  console.log(part1);
  const part2 = userData.slice(number, count);
  console.log(part2);
  userData = part1.concat(part2);
  console.log(userData);

  table.innerHTML = '';
  // console.log(table);
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

let number;
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

function editFunc(button) {
  modal.classList.remove('hidden');
  modal.classList.add('block');
  overlay.classList.remove('hidden');
  overlay.classList.add('block');

  number = button.id;
}
function done() {
  // const modal = document.querySelector('.modal');
  let count = userData.length;
  let stuName = document.querySelector('.nameModal').value;
  let course = document.querySelector('.courseModal').value;
  let score = document.querySelector('.scoreModal').value;
  const part1 = userData.slice(0, number - 1);

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
  // const modal = document.querySelector('.modal');
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
// console.log("slm", document.getElementById("btn-1"));

// const deleteRow = function(e){
//     console.log(e.target);
//     rowText = '';
//     createRow();

// }
// const delBtn = document.querySelectorAll('.delBtn');
// delBtn.addEventListener('click', () => console.log('delete clicked'));

// const remove = function(){
//     userData.shift();
//     rowText = '';
//     console.log(userData);
//     createRow();
// }
// const rembtn = document.querySelector('.rem');
// rembtn.addEventListener('click', remove);

// document.addEventListener('DOMContentLoaded', (event) => {
//   // Function to handle the click event on the 'add' button
//   document.querySelector('.bg-midGreen').addEventListener('click', () => {
//     // Get the input values

//     // Add the values to the array
//     userData.push({ name, course, score });

//     // Update the table with the new data
//     updateTable();
//   });
// });

// Function to create/update the table with user data
// function updateTable() {
//   // Create a table if it doesn't exist
//   let table = document.querySelector('table') || document.createElement('table');
//   table.innerHTML = ''; // Clear the table

//   // Create the header row
//   let headerRow = table.insertRow();
//   let headers = ['Name', 'Course', 'Score'];
//   headers.forEach(headerText => {
//     let header = document.createElement('th');
//     header.textContent = headerText;
//     headerRow.appendChild(header);
//   });

//   // Add data to the table
//   userData.forEach(item => {
//     let row = table.insertRow();
//     Object.values(item).forEach(text => {
//       let cell = row.insertCell();
//       cell.textContent = text;
//     });
//   });

//   // Append the table to the body or update the existing table
//   document.body.appendChild(table);
// }
