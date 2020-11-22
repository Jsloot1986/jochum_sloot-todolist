//selectors
let taskList = document.getElementById('list');
let task = document.getElementById('newTask');
let descriptions = [];
let taskArr = [];
let childrenArr = [];
let changeTask = "N";
let addTask = "Y";
let done = false;
let str = "";
let idP = "";
let pText = "";
let parentElement = "";
let method = {};

const addButton = document.getElementById("add-task");
addButton.addEventListener("click", handleSubmitText);


//Event handlers
async function handleSubmitText(e){
    if (changeTask === "Y"){
        description = newTask.value;
        putTaskToList(id, done, description).then(()=>getTasks());
        changeTask = "N";
        addButton.innerHTML = "Add Task";
    }else {
        description = newTask.value;
        taskArr = Array.from(document.getElementsByClassName("task-item"));
        addTask = "Y";
        taskArr.forEach(element =>{
            childrenArr = Array.from(element.children);
            childrenArr.forEach(element =>{
                if(element.classList.contains("todo-list-item") && 
                (element.textContent.toUpperCase()=== description.toUpperCase())&&
                 (description !== "")) addTask = "N"
            })
        })
        if (addTask === "N"){
            alert ("Task is already in the To do list!");
        } else{
            if (description === "")
            alert("Please fill in your Task!");
            else postTaskToList().then(() => getTasks());
        }
    }
        e.preventDefault();
        newTask.value = "";
}

async function handleCheckedTask(e){
    parentElement = e.target.parentElement;
    childrenArr = Array.from(parentElement.children);
    childrenArr.forEach(item => {
        if (item.classList.contains("checkedbutton")) done = item.checked;
        if (item.classList.contains("id")) id = item.textContent;
        if (item.classList.contains("todo-list-item")){
            if(done === true) item.classList.add("taskDone")
            else{
                if (item.classList.contains("taskDone"))        
                    item.classList.remove("taskDone");                    
            }
        description = item.textContent;
        }
        });
    putTaskToList(id, done, description).then(()=> getTasks());
    e.preventDefault();    
}

async function handleDeleteTask(e){
    parentElement = e.target.parentElement;
    let childrenArr = Array.from(parentElement.children);
    childrenArr.forEach(item => {
        if (item.classList.contains("id")) id = item.textContent;});
        
    deleteTaskFromList(id).then(()=> getTasks());
        e.preventDefault();
}

//Helpers
function makeLi (description, id, done){
    let li = document.createElement("li");
    li.classList.add("task-item");
    let pText = document.createElement("p");
    pText.classList.add("todo-list-item")
    if (done === true) {
        pText.classList.add("taskDone")
    }
    pText.innerHTML = description;
    let checkedButton = document.createElement("input");
    checkedButton.setAttribute("type", "checkbox");
    checkedButton.setAttribute("name", "checkedbutton");
    checkedButton.checked = done;
    checkedButton.classList.add("checkedbutton");
    let deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "./img/trash.png");
    deleteButton.setAttribute("alt", "deletebutton");
    deleteButton.classList.add("deletebutton");
    let idP = document.createElement("p")
    idP.innerHTML = id;
    idP.classList.add("id");
    checkedButton.onclick = done;
    
    li.appendChild(pText);
    li.appendChild(checkedButton);
    li.appendChild(deleteButton);
    li.appendChild(idP);
    taskList.appendChild(li);
}

function changeTasks(e){
    changeTask = 'Y';
    parentElement = e.target.parentElement;
    childrenArr = Array.from(parentElement.children);
    childrenArr.forEach(item => {
        if (item.classList.contains("checkedbutton")) done = item.checked;
        if (item.classList.contains("id")) id= item.textContent;
        if (item.classList.contains("todo-list-item")){
            if (done === true) {
                alert ("This task is already done and can't be changed!")
                changeTask = 'N';
            }else {
                addButton.innerHTML = "Change task";
                newTask.value = item.textContent;
            }
        }
    });
};

function fillTasks(result){
    taskList.innerHTML = "";
    result.forEach(item =>{
        makeLi(item.description, item._id, item.done);
    })
    descriptions = Array.from(document.getElementsByClassName("todo-list-item"));
    let checkItemsArr = Array.from(document.getElementsByClassName("checkedbutton"));
    let deleteButtonsArr = Array.from(document.getElementsByClassName("deletebutton"));
    deleteButtonsArr.forEach(element => element.addEventListener("click", handleDeleteTask));
    checkItemsArr.forEach(element => element.addEventListener("change", handleCheckedTask));
    descriptions.forEach(element => element.addEventListener("click", changeTasks));
    task.value ="";
}
async function getTasks(){
    collectTasks().then((result) => fillTasks(result))
}

getTasks();