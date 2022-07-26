// Define UI vars
// You can use document.querySelector or getElementId()
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all Event Listener
loadEventListener();
// Load all Event Listeners
function loadEventListener() {
//Dom load event
document.addEventListener('DOMContentLoaded', getTasks);
//  Add task event
  form.addEventListener('submit', addTask);
  //Remove tasks event
  tasklist.addEventListener('click', removeTask);
  //Clear tasks evevt
  clearbtn.addEventListener('click', clearTask);
  //Filter task event 
  filter.addEventListener('keyup', filterTask)
}

//Get task from LS
function getTasks() {
  let task;
  if (localStorage.getItem('task') === null ) {
    task = [];
  }else{
    task = JSON.parse(localStorage.getItem('task'))
  }
  task.forEach(function (task) {
     // Create li element
  const li = document.createElement('li');

  // Add class

  li.className = 'collection-item';

// Create text node and apend to li

  li.appendChild(document.createTextNode(task))
// Create new link element
  const link = document.createElement('a');
// Add class
  link.className = 'delete-item secondary-content';
// Add icon HTML
  link.innerHTML = '<i class= "fa fa-remove"></i>';
// Append link to li
  li.appendChild(link);
// Append li to ul
  tasklist.appendChild(li);

  })
}
// Add Task

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');

  // Add class

  li.className = 'collection-item';

// Create text node and apend to li

  li.appendChild(document.createTextNode(taskInput.value))
// Create new link element
  const link = document.createElement('a');
// Add class
  link.className = 'delete-item secondary-content';
// Add icon HTML
  link.innerHTML = '<i class= "fa fa-remove"></i>';
// Append link to li
  li.appendChild(link);
// Append li to ul
  tasklist.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

// Clear input
  taskInput.value = ''; 

  e.preventDefault()

}
function storeTaskInLocalStorage(tasks){
  let task;
  if (localStorage.getItem('task') === null ) {
    task = [];
  }else{
    task = JSON.parse(localStorage.getItem('task'))
  }
  task.push(tasks);

  localStorage.setItem('task', JSON.stringify (task))
}
// Remove Task

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
      //Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let task;
  if (localStorage.getItem('task') === null ) {
    task = [];
  }else{
    task = JSON.parse(localStorage.getItem('task'))
  }

  task.forEach(function(tasks, index){
    if(taskItem.textContent === tasks){
        task.splice(index, 1);
    }
  })

   localStorage.setItem('task', JSON.stringify(task))
}
// Clear Tasks

function clearTask() {
  tasklist.innerHTML = '';

  //Faster
  //--------------
  // while (tasklist.firstChild) {
  //   tasklist.removeChild(tasklist.firstChild);
  // }

  //Clear from LS
  clearTaskFromLocalStorage() 
}

//Clear task from LS
function clearTaskFromLocalStorage() {
  localStorage.clear();
}
//Filter tasks
function filterTask(e){
  const text = e.target.value.toLowerCase(); 
document.querySelectorAll('.collection-item').forEach(
  function(task) {

    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  }
)
}