import userData from './addRow.js';
import { createRow } from './addRow.js';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const table = document.querySelector('.myTab');
let number;
export function editFunc(button) {
  number = button.id;
  modal.classList.remove('hidden');
  modal.classList.add('block');
  overlay.classList.remove('hidden');
  overlay.classList.add('block');

  document.querySelector('.nameModal').value = userData[number - 1].stuName;
  document.querySelector('.courseModal').value = userData[number - 1].course;
  document.querySelector('.scoreModal').value = userData[number - 1].score;
}
export function done() {
  let stuName = document.querySelector('.nameModal').value;
  let course = document.querySelector('.courseModal').value;
  let score = document.querySelector('.scoreModal').value;
  const count = userData.length;
  console.log(count);

  const part1 = userData.slice(0, number - 1);
  console.log(part1);
  part1.push({ stuName, course, score });
  const part2 = userData.slice(number, count);
  console.log(part2);

  const updatedUserData = part1.concat(part2);
  console.log(updatedUserData);

  // Assuming userData is an array and modifying its contents directly
  userData.length = 0; // Clear the original array
  userData.push(...updatedUserData);
  console.log(userData);
  document.querySelector('.nameModal').value = '';
  document.querySelector('.courseModal').value = '';
  document.querySelector('.scoreModal').value = '';

  table.innerHTML = '';

  createRow();
  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}

export function cancel() {
  document.querySelector('.nameModal').value = '';
  document.querySelector('.courseModal').value = '';
  document.querySelector('.scoreModal').value = '';

  modal.classList.remove('block');
  modal.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}
