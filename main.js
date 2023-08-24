document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("my-form");
  const usersList = document.getElementById("users");

  // Load existing data from localStorage
  const storedData = JSON.parse(localStorage.getItem("userData")) || [];

  // Function to display users on page
  function displayUsers() {
    usersList.innerHTML = ""; // Clear previous list items
    storedData.forEach((user, index) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} | ${user.email} | ${user.number}`;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editUser(index));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteUser(index));

      li.appendChild(editButton);
      li.appendChild(deleteButton);

      usersList.appendChild(li);
    });
  }

  // Initial display of users on page load
  displayUsers();

  // Edit user function
  function editUser(index) {
    const user = storedData[index];
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const numberInput = document.getElementById("number");

    nameInput.value = user.name;
    emailInput.value = user.email;
    numberInput.value = user.number;

    // Remove the edited user from the list
    storedData.splice(index, 1);

    // Update localStorage
    localStorage.setItem("userData", JSON.stringify(storedData));

    // Update displayed user list
    displayUsers();
  }

  // Delete user function
  function deleteUser(index) {
    // Remove the user from the list
    storedData.splice(index, 1);

    // Update localStorage
    localStorage.setItem("userData", JSON.stringify(storedData));

    // Update displayed user list
    displayUsers();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const numberInput = document.getElementById("number");

    const name = nameInput.value;
    const email = emailInput.value;
    const number = numberInput.value;

    if (name && email && number) {
      const newUser = {
        name: name,
        email: email,
        number: number,
      };

      storedData.push(newUser);

      // Save updated data to localStorage
      localStorage.setItem("userData", JSON.stringify(storedData));

      // Update displayed user list
      displayUsers();

      // Clear input fields
      nameInput.value = "";
      emailInput.value = "";
      numberInput.value = "";

      // Show success message
      const msgDiv = document.querySelector(".msg");
      msgDiv.textContent = "User added successfully!";
      setTimeout(() => {
        msgDiv.textContent = "";
      }, 2000);
    } else {
      alert("Please fill in all the fields.");
    }
  });
});
