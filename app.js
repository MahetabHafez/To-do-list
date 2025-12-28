const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const tasksList = document.querySelector("#tasks");

todoForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // 1. Create the main list item (li)
    const task = document.createElement("li");
    task.classList.add("task-item");

    // 2. Create the element for the text (span)
    const taskTextElement = document.createElement("span");
    taskTextElement.innerText = taskText;
    taskTextElement.classList.add("task-text");

    // 3. Create the Complete button
    const completeButton = document.createElement("button");
    completeButton.innerText = "Done ✅";
    completeButton.classList.add("complete-btn");
    completeButton.addEventListener("click", () => {
        taskTextElement.classList.toggle("completed"); // Toggles the CSS line-through
    });

    // 4. Create the Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X 🗑️";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
        tasksList.removeChild(task); // Deletes the whole <li> element
    });

    // 5. Assemble the task: li > [span + button + button]
    task.appendChild(taskTextElement);
    task.appendChild(completeButton);
    task.appendChild(deleteButton);
    
    // 6. Add the new task to the list
    tasksList.appendChild(task);
    
    // 7. Clear the input
    todoInput.value = "";
});