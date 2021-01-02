// DOM Selectors
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".todo-btn");
const todoInput = document.querySelector(".todo-input");

// Event handlers
todoButton.addEventListener("click", handleSubmitAddTodo);
todoList.addEventListener("click", handleDeleteTodo);


// Functions
function handleSubmitAddTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    //put todo to list
    postTodoToList(id, done, newTodo).then(() => saveTodos(todoInput.value));
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    // Create checkedbutton
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = `<i class="fas fa-check-square"></i>`;
    checkedButton.classList.add("checked-btn");
    todoDiv.appendChild(checkedButton);
    // Create deletebutton
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Attach final Todo
    todoList.appendChild(todoDiv);
}

function handleDeleteTodo(e) {
    const id = e.target;

    if (id.classList[0] === "delete-btn") {
        const todo = id.parentElement;
        todo.classList.add("fall");
        //remove from API
        deleteTodoFromList(id).then(() => removeTodos(todo));
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }
    if (id.classList[0] === "checked-btn") {
        const todo = id.parentElement;
        todo.classList.toggle("checked");
        putTodoToList(id, done, newTodo).then(() => getTodos)
       
    }
}

function saveTodos(todo) {
    let todos;
    if (url.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(url.getItem("todos"));
    }
        todos.push(todo);
    url.setItem("todos", JSON.stringify(todos)); 
    
}

function removeTodos(todo) {
    let todos;
    if (url.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(url.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    url.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (url.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(url.getItem("todos"))
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        const checkedbutton = document.createElement("button")
        checkedbutton.innerHTML = `<i class="fas fa-check-square"></i>`;
        checkedButton.classList.add("checked-btn");
        todoDiv.appendChild(checkedButton);
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
    });
};