document.addEventListener('DOMContentLoaded', () => {
    const editTaskInput = document.getElementById('editTaskInput');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    const editTaskData = JSON.parse(localStorage.getItem('editTask'));
    if (editTaskData) {
        editTaskInput.value = editTaskData.taskText;
    }

    saveTaskBtn.addEventListener('click', () => {
        const updatedText = editTaskInput.value.trim();
        if (updatedText) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const taskIndex = tasks.findIndex(task => task.taskNumber === editTaskData.taskNumber);
            if (taskIndex !== -1) {
                tasks[taskIndex].text = updatedText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            localStorage.removeItem('editTask');
            window.location.href = 'index.html'; 
        }
    });

    cancelBtn.addEventListener('click', () => {
        localStorage.removeItem('editTask'); 
        window.location.href = 'index.html'; 
    });
});
