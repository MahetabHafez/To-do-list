document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const tasksList = document.getElementById('tasks-list');

    // Load from LocalStorage
    let tasks = JSON.parse(localStorage.getItem('cool_tasks')) || [];

    function saveAndRender() {
        localStorage.setItem('cool_tasks', JSON.stringify(tasks));
        render();
    }

    function render() {
        tasksList.innerHTML = "";
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'is-done' : ''}`;

            const circle = document.createElement('div');
            circle.className = 'status-circle';
            circle.innerHTML = task.completed ? '✓' : '';
            circle.onclick = () => toggleTask(task.id);

            const span = document.createElement('span');
            span.className = `task-text ${task.completed ? 'completed-text' : ''}`;
            span.innerText = task.text;
            span.onclick = () => toggleTask(task.id);

            const delBtn = document.createElement('button');
            delBtn.className = 'delete-btn';
            delBtn.innerText = 'Delete';
            delBtn.onclick = () => deleteTask(task.id);

            li.appendChild(circle);
            li.appendChild(span);
            li.appendChild(delBtn);
            tasksList.appendChild(li);
        });
    }

    window.toggleTask = function(id) {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveAndRender();
    }

    window.deleteTask = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        saveAndRender();
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = todoInput.value.trim();
        if (!val) return;

        tasks.push({ id: Date.now(), text: val, completed: false });
        saveAndRender();
        todoInput.value = "";
    });

    render();
});
