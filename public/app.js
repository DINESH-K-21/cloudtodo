async function loadTasks() {

    const response = await fetch("/api/tasks");

    const tasks = await response.json();

    displayTasks(tasks);
}


function displayTasks(tasks) {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const taskDiv = document.createElement("div");

        taskDiv.className = "task";

        taskDiv.innerHTML = `
            <span>${task.title}</span>

            <button
                class="delete"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>
        `;

        taskList.appendChild(taskDiv);
    });
}


async function addTask() {

    const input = document.getElementById("taskInput");

    const title = input.value.trim();

    if (!title) {
        return;
    }

    await fetch("/api/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title
        })
    });

    input.value = "";

    loadTasks();
}


async function deleteTask(id) {

    await fetch(`/api/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}


loadTasks();