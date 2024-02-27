document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const addButton = document.getElementById("add_button");
  const incompleteTasks = document.getElementById("incomplete-tasks");
  const completedTasks = document.getElementById("completed-tasks");

  const handleCheckBoxChange = (e) => {
    const isChecked = e.target.checked;
    const taskItem = e.target.parentElement;
    const taskLabel = taskItem.querySelector("label").textContent;

    if (isChecked) {
      completedTasks.prepend(createTaskElement(taskLabel, true));
    } else {
      incompleteTasks.prepend(createTaskElement(taskLabel, false));
    }

    taskItem.remove();
  };

  const handleDelete = (e) => {
    const taskItem = e.target.closest("li");
    taskItem.remove();
  };

  const handleEdit = (e) => {
    const taskItem = e.target.parentElement;
    const taskLabel = taskItem.querySelector("label");
    const currentLabel = taskLabel.textContent;
    const newLabel = prompt("Edit task:", currentLabel);

    if (newLabel !== null && newLabel !== "") {
      taskLabel.textContent = newLabel;
    }
  };

  const createTaskElement = (taskLabel, isChecked) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    const label = document.createElement("label");
    label.textContent = taskLabel;
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    checkbox.addEventListener("change", handleCheckBoxChange);
    deleteButton.addEventListener("click", handleDelete);
    editButton.addEventListener("click", handleEdit);

    return li;
  };

  const addTask = () => {
    const newTask = taskInput.value;
    if (newTask) {
      incompleteTasks.prepend(createTaskElement(newTask, false));
      taskInput.value = ""; 
    }
  };

  addButton.addEventListener("click", addTask);


  document.addEventListener("change", (e) => {
    if (e.target.matches("#incomplete-tasks input[type='checkbox']") || e.target.matches("#completed-tasks input[type='checkbox']")) {
      handleCheckBoxChange(e);
    }
  });

  
});
