const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

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
  span.style.color = checkbox.checked ? "#ccc" : "#000";
}

// Save the list to local storage
function saveList() {
  const tasks = list.querySelectorAll("li");
  const listArray = [];
  tasks.forEach(task => {
    const checkbox = task.querySelector("input[type='checkbox']");
    const text = task.querySelector("span").textContent;
    const completed = checkbox.checked;
    listArray.push({ text, completed });
  });
  localStorage.setItem("todoList", JSON.stringify(listArray));
}

// Load the list from local storage
function loadList() {
  const listArray = JSON.parse(localStorage.getItem("todoList"));
  if (listArray) {
    listArray.forEach(task => {
      addTask(task.text);
      const li = list.querySelector("li:last-child");
      const checkbox = li.querySelector("input[type='checkbox']");
      checkbox.checked = task.completed;
      updateTask(li);
    });
  }
}
