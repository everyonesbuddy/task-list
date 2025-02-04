//Define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners call
loadEventListeners();

//Load all event listeners function
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask);

    //clear task event
    clearBtn.addEventListener('click', clearTasks);

    //filter task event
    filter.addEventListener('keyup', filterTasks)
}

//get task from ls
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
        const li = document.createElement('li');

        //Add class
        li.className = 'collection-item';

        //create text node and append to li
        li.appendChild(document.createTextNode(task));

        //create new link element
        const link = document.createElement('a');

        //Add class
        link.className = 'delete-item secondary-content';

        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        //Append the link to the li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

    });
}

//Add Task function
function addTask(e) {
    if (taskInput.value === ''){
        alert ('Add a task');
    }

    //create li element
    const li = document.createElement('li');

    //Add class
    li.className = 'collection-item';

    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');

    //Add class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to the li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

//store task function
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task function

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove from ls function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks')=== null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear task function
function clearTasks() {
    taskList.innerHTML = '';


    //clear task from ls
    clearTasksFromLocalStorage();
}

//clear task from LS function
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


//filter task function
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display ='block';
        } else {
            task.style.display ='none';
        }
    });
}