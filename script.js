// Tasks Database
let tasks = [
  {
    taskTitle: "Task 1",
    isCompleted: false,
  },
  {
    taskTitle: "Task 2",
    isCompleted: true,
  },
  {
    taskTitle: "Task 3",
    isCompleted: false,
  },
  {
    taskTitle: "Task 4",
    isCompleted: true,
  },
  {
    taskTitle: "Task 5",
    isCompleted: false,
  },
];

let filtedList = [];

// Get HTML Elements
const filterBtns = document.querySelectorAll(".filter-btn");
const tasksList = document.getElementById("tasks");
const addTaskBtn = document.getElementById("add-task");
const deleteAllTaskBtn = document.getElementById("delete-all");

// Create HTML Elements
function createTaskElement(taskTitle, index) {
  let task = document.createElement("li");
  task.classList.add("task");
  task.id = `task-${index}`;

  let taskTitleEle = document.createElement("h3");
  taskTitleEle.innerText = taskTitle;
  taskTitleEle.id = "task-title";
  task.appendChild(taskTitleEle);

  let actions = document.createElement("div");
  task.appendChild(actions);

  let isCompleteBtn = document.createElement("button");
  isCompleteBtn.id = "is-complete";
  isCompleteBtn.setAttribute("onclick", `compeleteTask(${index})`);

  if (filtedList[index].isCompleted === false) {
    task.classList.add("not-complete");
    isCompleteBtn.textContent = "Not Complete";
    isCompleteBtn.style.backgroundColor = "#3498db";
    actions.appendChild(isCompleteBtn);
  } else {
    isCompleteBtn.textContent = "Completed";
    isCompleteBtn.style.backgroundColor = "green";
    task.classList.add("complete");
    actions.appendChild(isCompleteBtn);
  }

  let editBtn = document.createElement("button");
  editBtn.id = "edit";
  editBtn.setAttribute("onclick", `editTask(${index})`);
  editBtn.textContent = "Edit";
  actions.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.id = "delete";
  deleteBtn.setAttribute("onclick", `deleteTask(${index})`);
  deleteBtn.textContent = "Delete";
  actions.appendChild(deleteBtn);

  tasksList.appendChild(task);
}

function createAddTaskBobup() {
  let bobupContainer = document.createElement("div");
  bobupContainer.classList.add("bobup-container");

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  bobupContainer.appendChild(overlay);

  let bobup = document.createElement("div");
  bobup.classList.add("bobup");
  bobupContainer.appendChild(bobup);

  let bobupTitle = document.createElement("h1");
  bobupTitle.classList.add("bobup-title");
  bobupTitle.textContent = "Add Task";
  bobupTitle.style.color = "orange";
  bobup.appendChild(bobupTitle);

  let bobupQuestion = document.createElement("h2");
  bobupQuestion.className = "question";
  bobupQuestion.innerHTML = `What is the <span class="note">task title</span> ?`;
  bobup.appendChild(bobupQuestion);

  let errorMsg = document.createElement("span");
  errorMsg.classList.add("error");
  bobup.appendChild(errorMsg);

  let titleInput = document.createElement("input");
  titleInput.id = "title-input";
  titleInput.type = "text";
  titleInput.autocomplete = "off";
  titleInput.placeholder = "Enter the task title...";
  bobup.append(titleInput);

  let actions = document.createElement("div");
  bobup.append(actions);

  let cancelBtn = document.createElement("button");
  cancelBtn.id = "cancel";
  cancelBtn.textContent = "Cancel";
  actions.appendChild(cancelBtn);

  let addBtn = document.createElement("button");
  addBtn.id = "add";
  addBtn.textContent = "Add";
  actions.appendChild(addBtn);

  document.body.appendChild(bobupContainer);
}

function createDeleteTaskBobup(taskTitle) {
  let bobupContainer = document.createElement("div");
  bobupContainer.classList.add("bobup-container");

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  bobupContainer.appendChild(overlay);

  let bobup = document.createElement("div");
  bobup.classList.add("bobup");
  bobupContainer.appendChild(bobup);

  let bobupTitle = document.createElement("h1");
  bobupTitle.classList.add("bobup-title");
  bobupTitle.textContent = "Delete Task";
  bobupTitle.style.color = "rgb(245, 73, 73)";
  bobup.appendChild(bobupTitle);

  let bobupQuestion = document.createElement("h2");
  bobupQuestion.className = "question";
  bobupQuestion.innerHTML = `Are you sure to <span class="danger">Delete this task</span> ? <span class="warning">Task Title: ${taskTitle}</span>`;
  bobup.appendChild(bobupQuestion);

  let actions = document.createElement("div");
  bobup.append(actions);

  let noBtn = document.createElement("button");
  noBtn.id = "no";
  noBtn.textContent = "No";
  actions.appendChild(noBtn);

  let yesBtn = document.createElement("button");
  yesBtn.id = "yes";
  yesBtn.textContent = "Yes";
  actions.appendChild(yesBtn);

  document.body.appendChild(bobupContainer);
}

function createDeleteAllTasksBobup() {
  let bobupContainer = document.createElement("div");
  bobupContainer.classList.add("bobup-container");

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  bobupContainer.appendChild(overlay);

  let bobup = document.createElement("div");
  bobup.classList.add("bobup");
  bobupContainer.appendChild(bobup);

  let bobupTitle = document.createElement("h1");
  bobupTitle.classList.add("bobup-title");
  bobupTitle.textContent = "Delete All Task";
  bobupTitle.style.color = "rgb(245, 73, 73)";
  bobup.appendChild(bobupTitle);

  let bobupQuestion = document.createElement("h2");
  bobupQuestion.className = "question";
  bobupQuestion.innerHTML = `Are you sure to <span class="danger">Delete all tasks</span> ?`;
  bobup.appendChild(bobupQuestion);

  let actions = document.createElement("div");
  bobup.append(actions);

  let noBtn = document.createElement("button");
  noBtn.id = "no";
  noBtn.textContent = "No";
  actions.appendChild(noBtn);

  let yesBtn = document.createElement("button");
  yesBtn.id = "yes";
  yesBtn.textContent = "Yes";
  actions.appendChild(yesBtn);

  document.body.appendChild(bobupContainer);
}

function createEditTaskBobup() {
  let bobupContainer = document.createElement("div");
  bobupContainer.classList.add("bobup-container");

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  bobupContainer.appendChild(overlay);

  let bobup = document.createElement("div");
  bobup.classList.add("bobup");
  bobupContainer.appendChild(bobup);

  let bobupTitle = document.createElement("h1");
  bobupTitle.classList.add("bobup-title");
  bobupTitle.textContent = "Edit Task";
  bobupTitle.style.color = "orange";
  bobup.appendChild(bobupTitle);

  let bobupQuestion = document.createElement("h2");
  bobupQuestion.className = "question";
  bobupQuestion.innerHTML = `What is the <span class="note">new task title</span> ?`;
  bobup.appendChild(bobupQuestion);

  let errorMsg = document.createElement("span");
  errorMsg.classList.add("error");
  bobup.appendChild(errorMsg);

  let titleInput = document.createElement("input");
  titleInput.id = "title-input";
  titleInput.type = "text";
  titleInput.autocomplete = "off";
  titleInput.placeholder = "Enter the new task title...";
  bobup.append(titleInput);

  let actions = document.createElement("div");
  bobup.append(actions);

  let cancelBtn = document.createElement("button");
  cancelBtn.id = "cancel";
  cancelBtn.textContent = "Cancel";
  actions.appendChild(cancelBtn);

  let confirmBtn = document.createElement("button");
  confirmBtn.id = "confirm";
  confirmBtn.textContent = "Confirm";
  actions.appendChild(confirmBtn);

  document.body.appendChild(bobupContainer);
}

// Add Task in database
function addTask(taskTitle) {
  let taskObj = {
    taskTitle: taskTitle,
    isCompleted: false,
  };

  tasks.push(taskObj);
}

let filter = "all";

// Tasks Filter
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtedList = [];
    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
    filter = btn.dataset.filter;
    renderTasks();
  });
});

// Output the tasks
function renderTasks() {
  tasksList.innerHTML = "";

  if (filter === "complete") {
    filtedList = [];
    tasks.forEach((task) => {
      if (task.isCompleted === true) {
        filtedList.push(task);
      }
    });
  } else if (filter === "not-complete") {
    filtedList = [];
    tasks.forEach((task) => {
      if (task.isCompleted === false) {
        filtedList.push(task);
      }
    });
  } else {
    filtedList = [...tasks];
  }

  // If no tasks
  if (filtedList.length === 0) {
    const h1 = document.createElement("h1");
    h1.className = "no-tasks";
    h1.textContent = "There is no task, yet";
    tasksList.appendChild(h1);
    return;
  }

  let index = 0;
  filtedList.forEach((task) => {
    createTaskElement(task.taskTitle, index);
    index++;
  });
}

// First time render
renderTasks();

// Delete All Tasks
deleteAllTaskBtn.addEventListener("click", () => {
  createDeleteAllTasksBobup();
  const noBtn = document.getElementById("no");
  const bobupContainer = document.querySelector(".bobup-container");

  noBtn.addEventListener("click", () => {
    document.body.removeChild(bobupContainer);
  });

  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", () => {
    document.body.removeChild(bobupContainer);
  });

  const yesBtn = document.getElementById("yes");
  yesBtn.addEventListener("click", () => {
    tasks = [];
    document.body.removeChild(bobupContainer);
    renderTasks();
  });
});

// Delete Task
function deleteTask(index) {
  createDeleteTaskBobup(filtedList[index].taskTitle);
  const noBtn = document.getElementById("no");
  const bobupContainer = document.querySelector(".bobup-container");

  noBtn.addEventListener("click", () => {
    document.body.removeChild(bobupContainer);
  });

  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", () => {
    document.body.removeChild(bobupContainer);
  });

  const yesBtn = document.getElementById("yes");
  yesBtn.addEventListener("click", () => {
    tasks.forEach((task, index2)=>{
      if (task.taskTitle === filtedList[index].taskTitle) {
        tasks.splice(index2, 1);
      }
    })
    filtedList.splice(index, 1);
    document.body.removeChild(bobupContainer);
    renderTasks();
    console.log(filtedList)
  });
}

// Add Task
addTaskBtn.addEventListener("click", () => {
  createAddTaskBobup();

  const bobupContainer = document.querySelector(".bobup-container");
  const errorMsg = document.querySelector(".error");
  const cancelBtn = document.getElementById("cancel");
  const addBtn = document.getElementById("add");
  const inputTitle = document.getElementById("title-input");
  inputTitle.focus();
  const overlay = document.querySelector(".overlay");

  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(bobupContainer);
  });

  overlay.addEventListener("click", () => {
    document.body.removeChild(bobupContainer);
  });

  inputTitle.addEventListener("input", () => {
    errorMsg.style.display = "none";
    errorMsg.textContent = "";
  });

  addBtn.addEventListener("click", () => {
    let re = /\b(\s+)?\w+/i;
    if (inputTitle.value === "") {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Error: The title is empty!";
      return;
    } else if (!re.test(inputTitle.value)) {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Invalid: Invald task title";
      return;
    }
    let title = inputTitle.value;
    addTask(title);
    document.body.removeChild(bobupContainer);
    renderTasks();
  });
});

// Edit Task
function editTask(index) {
  createEditTaskBobup();

  const bobupContainer = document.querySelector(".bobup-container");
  const errorMsg = document.querySelector(".error");
  const cancelBtn = document.getElementById("cancel");
  const confirmBtn = document.getElementById("confirm");
  const inputTitle = document.getElementById("title-input");
  inputTitle.value = filtedList[index].taskTitle;
  inputTitle.focus();

  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(bobupContainer);
  });

  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", () => {
    document.body.removeChild(bobupContainer);
  });

  inputTitle.addEventListener("input", () => {
    errorMsg.style.display = "none";
    errorMsg.textContent = "";
  });

  confirmBtn.addEventListener("click", () => {
    let re = /\b(\s+)?\w+/i;
    if (inputTitle.value === "") {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Error: The title is empty!";
      return;
    } else if (!re.test(inputTitle.value)) {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Invalid: Invald task title";
      return;
    } else if (inputTitle.value == filtedList[index].taskTitle) {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Invalid: Same task title";
      return;
    }
    let title = inputTitle.value;
    filtedList[index].taskTitle = title;
    document.body.removeChild(bobupContainer);
    renderTasks();
  });
}

// Complete Task
function compeleteTask(index) {
  if (filtedList[index].isCompleted === false) {
    filtedList[index].isCompleted = true;
  } else {
    filtedList[index].isCompleted = false;
  }

  renderTasks();
}
