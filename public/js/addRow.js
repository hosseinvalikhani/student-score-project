let rowText = '';

// btn.addEventListener('click', addRow);

const btn = document.querySelector('.btn');
const table = document.querySelector('.myTab');
btn.addEventListener('click', saveData);
let userData = [];
const inputEmpty = document.querySelector('.input--Empty--text');

rowText = `
  <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
          <p class="w-36">Student Number</p>
          <p class="w-36">Student Name</p>
          <p class="w-36">Course Subject</p>
          <p class="w-36">Score</p>
          <p class="w-36">&nbsp;</p>

        </div>`;

export function remDan() {
  inputEmpty.classList.remove('flex');
  inputEmpty.classList.add('hidden');
}

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
  userData.forEach((data, i) => {
    addRow(i);
  });
  table.innerHTML = '';

  table.insertAdjacentHTML('beforeend', rowText);
}

function addRow(index) {
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
