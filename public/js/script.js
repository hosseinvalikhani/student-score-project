// export let userData = [];

const apiUrl = "http://localhost:3000/posts";
const jsonServer = fetch("http://localhost:3000/posts");

// Helper function to handle responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const btn = document.querySelector(".btn");

const btnData = document.querySelector(".btn-data");

btn.addEventListener("click", addServerData);
// btnData.addEventListener('click', showServerData);
// showServerData()

function addServerData() {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "1",
      stuName: "hossein",
      course: "riazi",
      score: "10",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((newUserData) => {
      // Process the newly created user data
      console.log("New User Data:", newUserData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Get all users
function showServerData() {
  fetch(apiUrl)
    .then(handleResponse)
    .then((data) => {
      console.log("All users:", data);
      const updatedUserData = data;
      console.log("my update user data is", updatedUserData);
      userData.length = 0; // Clear the original array
      userData.push(...updatedUserData);
      console.log("user data is:", userData);
    });
}

function deleteServerData() {
  fetch(`${apiUrl}/1`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Deleted user:", data);
    })
    .catch((error) => {
      console.error("There was an error deleting the user:", error);
    });
}

// export default userData;
