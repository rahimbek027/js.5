document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const showAllBtn = document.getElementById('showAllBtn');
    const showCompletedBtn = document.getElementById('showCompletedBtn');
    const showUncompletedBtn = document.getElementById('showUncompletedBtn');

    let taskCounter = 1;

    loadTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskValue = taskInput.value.trim();

        if (taskValue) {
            if (taskList.children.length < 7) {
                addTask(taskValue, taskCounter);
                taskCounter++;
                taskInput.value = '';
            } else {
                alert('7 tadan ortiq malumot kiritish mumkin emas');
            }
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    showAllBtn.addEventListener('click', () => filterTasks('all'));
    showCompletedBtn.addEventListener('click', () => filterTasks('completed'));
    showUncompletedBtn.addEventListener('click', () => filterTasks('uncompleted'));

    function addTask(taskValue, taskNumber) {
        const li = document.createElement('li');
        li.dataset.taskNumber = taskNumber;

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
        saveTasks();
    }

    window.toggleComplete = (button) => {
        const li = button.parentElement.parentElement;
        li.classList.toggle('completed');
        saveTasks();
    };

    window.deleteTask = (button) => {
        const li = button.parentElement.parentElement;
        taskList.removeChild(li);
        reassignTaskNumbers();
        saveTasks();
    };

    window.editTask = (button) => {
        const li = button.parentElement.parentElement;
        const taskText = li.querySelector('.task-text').textContent;
        const taskNumber = li.dataset.taskNumber;

        localStorage.setItem('editTask', JSON.stringify({ taskNumber, taskText }));
        window.location.href = 'edit.html';
    };

    function reassignTaskNumbers() {
        const tasks = taskList.querySelectorAll('li');
        taskCounter = 1;
        tasks.forEach(task => {
            const taskNumber = task.querySelector('.task-number');
            taskNumber.textContent = `${taskCounter}.`;
            task.dataset.taskNumber = taskCounter;
            taskCounter++;
        });
    }

    function filterTasks(filter) {
        const tasks = taskList.querySelectorAll('li');
        tasks.forEach(task => {
            switch (filter) {
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? '' : 'none';
                    break;
                case 'uncompleted':
                    task.style.display = !task.classList.contains('completed') ? '' : 'none';
                    break;
                default:
                    task.style.display = '';
            }
        });
    }

    function saveTasks() {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(task => ({
            text: task.querySelector('.task-text').textContent,
            completed: task.classList.contains('completed'),
            taskNumber: task.dataset.taskNumber
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            savedTasks.forEach(task => {
                addTask(task.text, task.taskNumber);
                taskCounter = Math.max(taskCounter, parseInt(task.taskNumber, 10) + 1);
            });
        }
    }
});
