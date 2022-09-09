const addTaskBtn = document.getElementById('add-task-btn'),
deskTaskInput = document.getElementById('description-task'),
todosWrapper = document.querySelector('.todos-wrapper')

let tasks = [];

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(descr){
    this.descr = descr;
    this.complete = false;
}

const createTemplate = (task, index) => {
    return `
    <div class = "todo-item ${task.complete ? ' checked' : ''}" >
                <div class = "description"> ${task.descr}</div>
                <div class="buttons">
                    <input onCLick = "completeTask(${index})" class = "btn-complete" type="checkbox" ${task.complete ? ' checked' : ''}>
                    <button onClick = "deleteTask(${index})" class = "btn-delete">Delete</button>
                </div>
            </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.complete == false);
    const completedTasks = tasks.length && tasks.filter(item => item.complete == true);
    tasks = [...activeTasks,...completedTasks];
}

const updateLocal = () => {
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {

    tasks[index].complete = !tasks[index].complete; 
    if(tasks[index].complete){
        todoItemElems[index].classList.add('checked');
    }else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index)=> {
            todosWrapper.innerHTML += createTemplate(item, index);
        })
    }
    todoItemElems = document.querySelectorAll('.todo-item');
}

fillHtmlList();

addTaskBtn.addEventListener('click', (e) =>{
    if(!deskTaskInput.value == ''){
        tasks.push(new Task(deskTaskInput.value));
        updateLocal();
        fillHtmlList();
        deskTaskInput.value = ('');
    }
   
})


const deleteTask = index => {
    todoItemElems[index].classList.add(`delition`);
        setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },350)
}