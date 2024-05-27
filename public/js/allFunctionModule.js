export let userData = [];
import { createRow } from './addRow.js';
const table = document.querySelector('.myTab');

export async function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const updatedUserData = JSON.parse(storedData);
        // console.log('my update user data is', updatedUserData);
        userData.length = 0; // Clear the original array
        userData.push(...updatedUserData);
        resolve(userData);
      } else {
        resolve([]);
      }
    }, 0);
  });
}

export async function localData(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem('userData', JSON.stringify(data));
      resolve();
    }, 0);
  });
}

export async function clearData() {
  localStorage.removeItem('userData');
  alert('Data cleared!');
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';
  table.innerHTML = '';
  userData.length = 0;
  createRow();
}

export async function deleteLocalItem(idNumber) {
  return new Promise(resolve => {
    setTimeout(() => {
      let myLocalData = localStorage.getItem('userData');
      const tempData = JSON.parse(myLocalData);
      console.log('my temp data:', tempData);
      const count = tempData.length;
      console.log('length of temp data', count);
      const part1 = tempData.slice(0, idNumber - 1);
      console.log('part 1 is:', part1);

      const part2 = tempData.slice(idNumber, count);
      console.log('part 2 is:', part2);

      const updatedUserData = part1.concat(part2);
      console.log('update data is:', updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      resolve();
    }, 0);
  });
}

export async function editLocalItem(number, stuName, course, score) {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        let myLocalData = localStorage.getItem('userData');
        const tempData = JSON.parse(myLocalData);
        console.log('my temp data:', tempData);
        const count = tempData.length;
        console.log('length of temp data', count);
        const part1 = tempData.slice(0, number - 1);
        console.log('part 1 is:', part1);

        part1.push({ stuName, course, score });
        const part2 = tempData.slice(number, count);
        console.log('part 2 is:', part2);

        const updatedUserData = part1.concat(part2);
        console.log('update data is:', updatedUserData);
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
      }, 0);
    });
  } catch (error) {
    console.error('check your code', error);
  }
}
