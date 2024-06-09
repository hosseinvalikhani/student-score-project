import userData from "./addRow.js";
import { createRow } from "./addRow.js";
import { editLocalItem } from "./allFunctionModule.js";
const apiUrl = "http://localhost:3000/posts";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const table = document.querySelector(".myTab");
let number;

let dataNumber;
export function editFunc(button) {
  number = button.id;
  dataNumber = button.dataset.btn;
  console.log("data number:", dataNumber);

  modal.classList.remove("hidden");
  modal.classList.add("block");
  overlay.classList.remove("hidden");
  overlay.classList.add("block");

  document.querySelector(".nameModal").value = userData[number - 1].stuName;
  document.querySelector(".courseModal").value = userData[number - 1].course;
  document.querySelector(".scoreModal").value = userData[number - 1].score;
}
export function done() {
  let stuName = document.querySelector(".nameModal").value;
  let course = document.querySelector(".courseModal").value;
  let score = document.querySelector(".scoreModal").value;
  console.log(
    stuName === userData[number - 1].stuName ||
      course === userData[number - 1].course ||
      score === userData[number - 1].score
  );

  if (
    stuName === userData[number - 1].stuName &&
    course === userData[number - 1].course &&
    score === userData[number - 1].score
  ) {
    alert("Nothing Changed! please edit data");
    return;
  }

  fetch(`${apiUrl}/${dataNumber}`, {
    // Assuming the URL includes the ID to update the specific record
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: `${number}`,
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
    .then((updatedUserData) => {
      // Process the updated user data
      console.log("Updated User Data:", updatedUserData);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });

  const count = userData.length;
  console.log("user length is:");
  const part1 = userData.slice(0, number - 1);

  part1.push({ stuName, course, score });
  const part2 = userData.slice(number, count);

  const updatedUserData = part1.concat(part2);

  // Assuming userData is an array and modifying its contents directly
  userData.length = 0; // Clear the original array
  userData.push(...updatedUserData);
  // localStorage.setItem('userData', JSON.stringify(userData));
  // localData(userData);
  // editLocalItem(number, stuName, course, score);

  // editLocalItem(number, stuName, course, 'ali');

  document.querySelector(".nameModal").value = "";
  document.querySelector(".courseModal").value = "";
  document.querySelector(".scoreModal").value = "";

  table.innerHTML = "";

  createRow();
  modal.classList.remove("block");
  modal.classList.add("hidden");

  overlay.classList.remove("block");
  overlay.classList.add("hidden");
}

export function cancel() {
  document.querySelector(".nameModal").value = "";
  document.querySelector(".courseModal").value = "";
  document.querySelector(".scoreModal").value = "";

  modal.classList.remove("block");
  modal.classList.add("hidden");

  overlay.classList.remove("block");
  overlay.classList.add("hidden");
}
