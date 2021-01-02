//selectors
const todoList = document.getElementById('list');
const todo = document.getElementById('newTodo');
const childrenArr = (e) => Array.from(e.target.parentElement.children);

let checkTodo = false;
let putTodo = true;
let done = false;

const addButton = document.getElementById("add-todo");
addButton.addEventListener("click", handleSubmitButton);

//Event handlers
function handleSubmitButton(e){
    if (checkTodo === true){
        description = newTodo.value;
        putTodoToList(id, done, description).then(()=>getTodos());
        checkTodo = false;
        addButton.innerHTML = "Add Todo";
    }else {
        description = newTodo.value;
        const todoArr = Array.from(document.getElementsByClassName("todo-item"));
        putTodo = true;
        todoArr.forEach(element =>{
            const childrenArr = Array.from(element.children);
            childrenArr.forEach(element =>{
                if(element.classList.contains("todo-list-item") && 
                (element.textContent.toUpperCase()=== description.toUpperCase())&&
                 (description !== "")) putTodo = false
            })
        })
        if (putTodo === false){
            alert ("Todo is already in the list!");
        } else{
            if (description === "")
            alert("Please fill in your todo!");
            else postTodoToList().then(() => getTodos());
        }
    }
        e.preventDefault();
        newTodo.value = "";
}

function handleCheckedTodo(e) {
    childrenArr(e).forEach(item => {
        if (item.classList.contains("checkedbutton")) done = item.checked;
        if (item.classList.contains("id")) id = item.textContent;
        if (item.classList.contains("todo-list-item")) {
            if (done === true) item.classList.add("todoDone")
            else {
                if (item.classList.contains("todoDone"))
                    item.classList.remove("todoDone");
            }
            description = item.textContent;
        
        }
    });
    putTodoToList(id, done, description).then(() => getTodos());
    e.preventDefault();

}
        
    function handleDeleteTodo(e) {
        childrenArr(e).forEach(item => {
            if (item.classList.contains("id")) id = item.textContent;
        });
        
        deleteTodoFromList(id).then(() => getTodos());
        e.preventDefault();
    }
            
    function handleChangeTodo(e){
            checkTodo = true;
            childrenArr(e).forEach(item => {
                if (item.classList.contains("checkedbutton")) done = item.checked;
                if (item.classList.contains("id")) id = item.textContent;
                if (item.classList.contains("todo-list-item")) {
                    if (done === true) {
                        alert("This todo is already done and can't be changed!")
                        checkTodo = false;
                    } else {
                        addButton.innerHTML = "Change todo";
                        newTodo.value = item.textContent;
                    }
                }
            }); e.preventDefault();    
    }

//Helpers
const makeTodo = (description, id, done)=>{
    const li = document.createElement("li");
    li.classList.add("todo-item");
    const pText = document.createElement("p");
    pText.classList.add("todo-list-item")
    if (done === true) {
        pText.classList.add("todoDone")
    }
    pText.innerHTML = description;
    const checkedButton = document.createElement("input");
    checkedButton.setAttribute("type", "checkbox");
    checkedButton.setAttribute("name", "checkedbutton");
    checkedButton.checked = done;
    checkedButton.classList.add("checkedbutton");
    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "./img/trash.png");
    deleteButton.setAttribute("alt", "deletebutton");
    deleteButton.classList.add("deletebutton");
    const idP = document.createElement("p")
    idP.innerHTML = id;
    idP.classList.add("id");
    checkedButton.onclick = done;
    
    li.appendChild(pText);
    li.appendChild(checkedButton);
    li.appendChild(deleteButton);
    li.appendChild(idP);
    todoList.appendChild(li);
}

const makeTodos =(result) =>{
    todoList.innerHTML = "";
    result.forEach(item =>{
        makeTodo(item.description, item._id, item.done);
    })
    const descriptions = Array.from(document.getElementsByClassName("todo-list-item"));
    const checkItemsArr = Array.from(document.getElementsByClassName("checkedbutton"));
    const deleteButtonsArr = Array.from(document.getElementsByClassName("deletebutton"));
    deleteButtonsArr.forEach(element => element.addEventListener("click", handleDeleteTodo));
    checkItemsArr.forEach(element => element.addEventListener("change", handleCheckedTodo));
    descriptions.forEach(element => element.addEventListener("click", handleChangeTodo));
    todo.value ="";
}
const getTodos =()=>{
    fetchResult().then((result) => makeTodos(result))
}

getTodos()