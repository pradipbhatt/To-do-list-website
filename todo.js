const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const floatingActionBtn = document.querySelector(".floating-action-btn");

// Add a new task to the list
form.addEventListener("submit", event => {
  event.preventDefault();
  addTask(input.value);
  input.value = "";
});

// Delete a task from the list
list.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    deleteTask(event.target.parentNode);
  }
});

// Update a task in the list
list.addEventListener("change", event => {
  if (event.target.tagName === "INPUT") {
    updateTask(event.target.parentNode);
  }
});

// Show the floating action button when the list has tasks
list.addEventListener("click", event => {
  const tasks = list.querySelectorAll("li");
  if (tasks.length > 0) {
    floatingActionBtn.classList.remove("hidden");
  }
});

// Hide the floating action button when the list is empty
floatingActionBtn.addEventListener("click", () => {
  floatingActionBtn.classList.add("hidden");
});

// Share the list
floatingActionBtn.addEventListener("click", () => {
  shareList();
});

// Save the list to local storage
window.addEventListener("beforeunload", () => {
  saveList();
});

// Load the list from local storage
window.addEventListener("load", () => {
  loadList();
});

// Add a new task to the list
function addTask(text) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox">
    <span>${text}</span>
    <button>Delete</button>
  `;
  list.appendChild(li);
}

// Delete a task from the list
function deleteTask(task) {
  task.remove();
}

// Update a task in the list
function updateTask(task) {
  const checkbox = task.querySelector("input[type='checkbox']");
  const span = task.querySelector("span");
  span.style.textDecoration = checkbox.checked ? "line-through" : "none";
  span.style.color = checkbox.checked ? "#ccc" : "#222";
  task.classList.toggle("completed", checkbox.checked);
}



    // Save the list to local storage
function saveList() {
    const tasks = list.querySelectorAll("li");
    const data = [];
    tasks.forEach(task => {
      const checkbox = task.querySelector("input[type='checkbox']");
      const text = task.querySelector("span").textContent;
      data.push({
        text: text,
        completed: checkbox.checked
      });
    });
    localStorage.setItem("todo-list", JSON.stringify(data));
  }
  

  const shareBtn = document.querySelector("#share-btn");

// Share the list when the share button is clicked
shareBtn.addEventListener("click", () => {
  shareList();
});

// Share the list
function shareList() {
  const tasks = list.querySelectorAll("li");
  const data = [];
  tasks.forEach(task => {
    const checkbox = task.querySelector("input[type='checkbox']");
    const text = task.querySelector("span").textContent;
    data.push({
      text: text,
      completed: checkbox.checked
    });
  });
  const url = `https://todo-list.com/share?data=${encodeURIComponent(JSON.stringify(data))}`;
  navigator.clipboard.writeText(url);
  alert("The list has been shared! The URL has been copied to your clipboard.");
}
