function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === '') {
        alert("Please enter a task!");
        return;
    }

    var taskItem = document.createElement("li");
    taskItem.className = "todo-item";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            taskItem.style.textDecoration = "line-through";
        } else {
            taskItem.style.textDecoration = "none";
        }
    });

    var taskText = document.createElement("span");
    taskText.textContent = taskInput.value;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskList.appendChild(taskItem);

    taskInput.value = '';
}