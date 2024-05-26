import userData from './addRow.js';
import { createRow } from './addRow.js';
import { deleteLocalItem, getData, localData } from './allFunctionModule.js';

const modalDlt = document.querySelector('.modal--delete');
const overlay = document.querySelector('.overlay');
let idNumber;
const table = document.querySelector('.myTab');
export function openDeleteModal(button) {
  modalDlt.classList.remove('hidden');
  modalDlt.classList.add('flex');
  overlay.classList.remove('hidden');
  overlay.classList.add('block');
  idNumber = button.id;

  modalDlt.innerHTML = '';

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

  modalDlt.insertAdjacentHTML('beforeend', modalHtml);
}

export function cancelDlt() {
  modalDlt.classList.remove('flex');
  modalDlt.classList.add('hidden');

  overlay.classList.remove('block');
  overlay.classList.add('hidden');
}

export async function remove() {
  setTimeout(() => {
    const count = userData.length;
    console.log(count);

    const part1 = userData.slice(0, idNumber - 1);
    console.log(part1);
    const part2 = userData.slice(idNumber, count);
    console.log(part2);

    const updatedUserData = part1.concat(part2);
    console.log(updatedUserData);
    // Assuming userData is an array and modifying its contents directly
    userData.length = 0; // Clear the original array
    userData.push(...updatedUserData);
    // localData(userData);
    deleteLocalItem(idNumber);

    console.log(userData);

    table.innerHTML = '';
    console.log(table);

    createRow();
    modalDlt.classList.remove('flex');
    modalDlt.classList.add('hidden');

    overlay.classList.remove('block');
    overlay.classList.add('hidden');
  }, 1000);
}
