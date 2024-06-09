import { getData, addToDataBase } from "./allFunctionModule.js";
import userData from "./allFunctionModule.js";
// import userData from "./script.js";
let pageNumber = 0;

let r;

let rowText = "";

const apiUrl = "http://localhost:3000/posts";
const idGen = "http://localhost:3000/idGenerator";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
let indexData = 1;
// fetch id to db
function databaseGet() {
  fetch(idGen)
    .then(handleResponse)
    .then((data) => {
      console.log("data length is:", data.length);
      indexData = data.length;
      console.log("index data is:", indexData);
    });
}
databaseGet();

function idGenerator() {
  fetch(idGen, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: 0 }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((newUserData) => {});
}

const btn = document.querySelector(".btn");
const table = document.querySelector(".myTab");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalDlt = document.querySelector(".modal--delete");

overlay.addEventListener("click", () => {
  modal.classList.remove("block");
  modal.classList.add("hidden");

  overlay.classList.remove("block");
  overlay.classList.add("hidden");

  modalDlt.classList.remove("flex");
  modalDlt.classList.add("hidden");
});

const pagination = document.querySelector(".pagination");

let numberOfPage;
export function createPagination() {
  pagination.innerHTML = "";
  let buttons = "";
  numberOfPage = Math.floor((userData.length - 1) / 10);
  for (let i = 0; i < numberOfPage + 1; i++) {
    if (userData.length === 0) {
      break;
    }
    buttons += `<button class="bg-blue-300 w-8 h-8" id='${
      i + 1
    }' onclick="goToPage(this)" >${i + 1}</button>`;
  }
  pagination.insertAdjacentHTML("beforeend", buttons);
}

createPagination();

let z;
export function goToPage(button) {
  rowText = `
  <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
          <p class="w-36">Student Number</p>
          <p class="w-36">Student Name</p>
          <p class="w-36">Course Subject</p>
          <p class="w-36">Score</p>
          <p class="w-36">&nbsp;</p>
          
        </div>`;

  pageNumber = button.id - 1;
  localStorage.setItem("page", JSON.stringify(pageNumber));

  // pageNumber = button ? button.id - 1 : Math.floor((userData.length - 1) / 10);
  // createRow();

  userData.slice(pageNumber * 10, (pageNumber + 1) * 10).forEach((data, i) => {
    addRow(pageNumber * 10 + i);
  });
  table.innerHTML = "";

  table.insertAdjacentHTML("beforeend", rowText);
}

function init() {
  fetch(apiUrl)
    .then(handleResponse)
    .then((data) => {
      const updatedUserData = data;
      console.log("data is:", data);

      userData.length = 0; // Clear the original array
      userData.push(...updatedUserData);

      console.log("user data is:", userData);
      pageNumber = JSON.parse(localStorage.getItem("page"));
      createPagination();
      createRow();
    });
  console.log("user data is:", userData);
}

init();

function activePage() {
  z = 1;
  pageNumber = Math.floor((userData.length - 1) / 10);
  localStorage.setItem("page", JSON.stringify(pageNumber));
}
const inputEmpty = document.querySelector(".input--Empty--text");

rowText = `
  <div class="test flex items-center px-4 gap-8 h-12 border border-black bg-midGreen">
          <p class="w-36">Student Number</p>
          <p class="w-36">Student Name</p>
          <p class="w-36">Course Subject</p>
          <p class="w-36">Score</p>
          <p class="w-36">&nbsp;</p>

        </div>`;

btn.addEventListener("click", saveData);

export function remDan() {
  inputEmpty.classList.remove("flex");
  inputEmpty.classList.add("hidden");
}

function addData(indexData, stuName, course, score) {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: `${indexData}`,
      stuName: `${stuName}`,
      course: `${course}`,
      score: `${score}`,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((newUserData) => {});
}

function saveData() {
  let stuName = document.querySelector(".name").value;
  let course = document.querySelector(".course").value;
  let score = document.querySelector(".score").value;

  if (
    document.querySelector(".name").value === "" ||
    document.querySelector(".course").value === "" ||
    document.querySelector(".score").value === ""
  ) {
    alert("fill all input");

    return 0;
  }

  userData.push({ stuName, course, score });

  // Save updated array back to local storage as a JSON string
  // localData(userData);

  addData(indexData, stuName, course, score);
  idGenerator();

  if ((z = 1)) {
    activePage();
  }
  alert("Data saved!");

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

  userData.slice(pageNumber * 10, (pageNumber + 1) * 10).forEach((data, i) => {
    addRow(pageNumber * 10 + i);
  });

  table.innerHTML = "";

  table.insertAdjacentHTML("beforeend", rowText);

  createPagination();
}

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
      
      data-btn="${userData[index].id}"
      class="delBtn del-btn-${index + 1} w-16 bg-red-700"
      onclick="openDeleteModal(this)"
    >
      delete
    </button>
    <button
      id="${index + 1}"
      data-btn="${userData[index].id}"
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

  document.querySelector(".name").value = "";
  document.querySelector(".course").value = "";
  document.querySelector(".score").value = "";
  return rowText;
}
export default userData;
