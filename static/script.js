const tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
        tasks.push({
            description: taskDescription,
            completed: false,
            createdAt: new Date(),
            completedAt: null,
        });

        // Clear input field
        taskInput.value = '';

        // Update task lists
        updateTaskLists();
    }
}
// Function to mark a task as complete
function markComplete(index) {
    tasks[index].completed = true;
    tasks[index].completedAt = new Date();
    updateTaskLists();
}

// Function to mark a task as incomplete
function markIncomplete(index) {
    tasks[index].completed = false;
    tasks[index].completedAt = null;
    updateTaskLists();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskLists();
}
function editTask(index, newDescription){
    tasks[index].description = newDescription;
    updateTaskLists;
}
// Function to update the task lists in the HTML
function updateTaskLists() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    // Clear existing lists
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    // Populate lists with tasks
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.description;

        if (task.completed) {
            listItem.classList.add('completed');
            listItem.innerHTML += ` <button onclick="markIncomplete(${index})">Undo</button>`;
            completedTasksList.appendChild(listItem);
        } else {
            listItem.innerHTML += ` <button onclick="markComplete(${index})">Done</button>`;
            listItem.innerHTML += ` <button onclick="deleteTask(${index})">Delete</button>`;
            listItem.innerHTML += `<button onclick="editTask(${index})">Edit</button>`;
            pendingTasksList.appendChild(listItem);
        }
        if (task.createdAt){
            const createdAtText = document.createElement('span');
            createdAtText.textContent = `(created: ${formatTimestamp(task.createdAt)})`;
            listItem.appendChild(createdAtText);
        }
        if (task.completedAt){
            const completedAtText = document.createElement('span');
            completedAtText.textContent = `(completed: ${formatTimestamp(task.completedAt)})`;
            listItem.appendChild(completedAtText);
        }
    });
}
function formatTimestamp(timestamp){
    return timestamp.toLocalString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit', hour12: true,
    });
}
updateTaskLists();