const tasks = [];
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskDescription = taskInput.value.trim();
    //const username = document.getElementById('username-input').value.trim();
    if (taskDescription) {
        tasks.push({
            description: taskDescription,
            completed: false,
            createdAt: new Date(),
            completedAt: null,
        });
        // Clear input field
        taskInput.value = '';

        const formData = new FormData();
        formData.append('task_description', taskDescription);
        /*formData.append('username', username);

        fetch('/add_task', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success){
                updateTaskLists();
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });*/
    }

        updateTaskLists();
}

function markComplete(index) {
    tasks[index].completed = true;
    tasks[index].completedAt = new Date();

    //const formData = new FormData();
    //formData.append('task_index', index);
    /*formData.append('username', document.getElementById('username-input').value.trim());

    fetch('/mark_complete', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success){
            updateTaskLists();
        }
    })
    .catch(error =>{
        console.log('Error:', error);
    });*/

    updateTaskLists();
}

function markIncomplete(index) {
    tasks[index].completed = false;
    tasks[index].completedAt = null;
    

    //const formData = new FormData();
    //formData.append('task_index', index);
    //formData.append('username', document.getElementById('username-input').value.trim());

    /*fetch('/mark_Incomplete', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success){
            updateTaskLists();
        }
    })
    .catch(error =>{
        console.error('Error:', error);
    });*/

    updateTaskLists();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    let formData = new FormData();
    formData.append('task_index', index);
    /*formData.append('username', document.getElementById('username-input').value.trim());

    fetch('/delete_task', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success){
            updateTaskLists();
        }
    })
    .catch(error =>{
        console.log('Error:', error);
    });*/

    updateTaskLists();
}
function editTask(index, newDescription){
    tasks[index].description = newDescription;

    const formData = new FormData();
    formData.append('task_index', index);
    /*formData.append('username', document.getElementById('username-input').value.trim());

    fetch('/edit_task', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success){
            updateTaskLists();
        }
    })
    .catch(error =>{
        console.error('Error:', error);
    });*/

    updateTaskLists();
}
function updateTaskLists() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    // Clear existing lists (moved outside the loop)
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
    // Populate lists with tasks
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskDescription.classList.add('white-book-line');
        listItem.textContent = task.description;
        if (task.completed) {
            listItem.classList.add('completed');
            listItem.innerHTML += ` <button class="btn btn-warning" onclick="markIncomplete(${index})">Undo</button>`;
            completedTasksList.appendChild(listItem);
        } else {
            listItem.innerHTML += ` <button class="btn btn-success" onclick="markComplete(${index})">Done</button>`;
            listItem.innerHTML += ` <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>`;
            listItem.innerHTML += ` <button class="btn btn-secondary" onclick="editTask(${index}, prompt('Edit task:', '${task.description}'))">Edit</button>`;
            pendingTasksList.appendChild(listItem);
        }
        if (task.createdAt) {
            const createdAtText = document.createElement('span');
            createdAtText.textContent = ` (Created: ${formatTimestamp(task.createdAt)})`;
            listItem.appendChild(createdAtText);
        }
        if (task.completedAt) {
            const completedAtText = document.createElement('span');
            completedAtText.textContent = ` (Completed: ${formatTimestamp(task.completedAt)})`;
            listItem.appendChild(completedAtText);
        }
    });
}
function formatTimestamp(timestamp){
    return timestamp.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit', hour12: true,
    });
}
updateTaskLists();