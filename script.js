document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let taskCounter = 1; 

    addTaskBtn.addEventListener('click', () => {
        const taskValue = taskInput.value.trim();
        if (taskValue) {
            if (taskList.children.length < 7) {
                addTask(taskValue, taskCounter);
                taskCounter++; 
                taskInput.value = '';
            } else {
                alert('7 tadan kop malumot kiritip bolmaydi');
            }
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    function addTask(taskValue, taskNumber) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-number">${taskNumber}.</span> 
            <span class="task-text">${taskValue}</span>
            <div>
                <button class="complete" onclick="toggleComplete(this)">✔️</button>
                <button class="delete" onclick="deleteTask(this)">🗑️</button>
                <button class="edit" onclick="editTask(this)">✏️</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    window.toggleComplete = (button) => {
        const li = button.parentElement.parentElement;
        li.classList.toggle('completed');
    };

    window.deleteTask = (button) => {
        const li = button.parentElement.parentElement;
        taskList.removeChild(li);
        reassignTaskNumbers();
    };

    window.editTask = (button) => {
        const li = button.parentElement.parentElement;
        const spanText = li.querySelector('.task-text');
        const newTask = prompt('Tahrirlash:', spanText.textContent);
        if (newTask) {
            spanText.textContent = newTask;
        }
    };

    function reassignTaskNumbers() {
        const tasks = taskList.querySelectorAll('li');
        taskCounter = 1; 
        tasks.forEach(task => {
            const taskNumber = task.querySelector('.task-number');
            taskNumber.textContent = `${taskCounter}.`;
            taskCounter++;
        });
    }
});
