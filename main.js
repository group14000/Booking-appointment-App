document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("my-form");
  const usersList = document.getElementById("users");

  // Load existing data from localStorage
  const storedData = JSON.parse(localStorage.getItem("userData")) || [];

  // Display existing data on page load
  storedData.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} | ${user.email} | ${user.number}`;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteUser(index));
    
    li.appendChild(deleteButton);
    usersList.appendChild(li);
  });

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

      // Display the new user on the page
      const li = document.createElement("li");
      li.textContent = `${name} | ${email} | ${number}`;
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteUser(storedData.length - 1));
      
      li.appendChild(deleteButton);
      usersList.appendChild(li);

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

  function deleteUser(index) {
    storedData.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(storedData));
    usersList.innerHTML = "";
    
    storedData.forEach((user, idx) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} | ${user.email} | ${user.number}`;
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteUser(idx));
      
      li.appendChild(deleteButton);
      usersList.appendChild(li);
    });
  }
});
