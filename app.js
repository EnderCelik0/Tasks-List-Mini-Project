// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD ALL EVENT LISTENERS

// dom load event
document.addEventListener('DOMContentLoaded', getTasks);

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);

// Get Tasks from Local Storage

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and appen to li
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

//  add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please Add a Task');
  } else {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and appen to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in local
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';
  }
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove From LS

function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you Sure')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LocaL storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function clearTask() {
  // taskList.innerHTML = ''

  // faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value;

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent.toLowerCase();

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
