// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("my-form");
  
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    const name = nameInput.value;
    const email = emailInput.value;

    // Check if localStorage is available
    if (typeof(Storage) !== "undefined") {
      // Retrieve the existing data from localStorage
      let userData = localStorage.getItem("userData");
      
      // If no existing data, initialize an empty array
      if (!userData) {
        userData = [];
      } else {
        userData = JSON.parse(userData);
      }

      // Add the new user data to the array
      userData.push({ name, email });

      // Store the updated data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Clear the form inputs
      nameInput.value = "";
      emailInput.value = "";

      // Provide a success message
      const msgDiv = document.querySelector(".msg");
      msgDiv.textContent = "User data stored successfully.";
    } else {
      alert("localStorage is not supported in this browser.");
    }
  });
});
