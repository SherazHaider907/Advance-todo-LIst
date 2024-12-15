const form = document.querySelector('#new-todo-form')
const todoInput = document.querySelector('#todo-input')
const list = document.querySelector('#list')
const templete = document.querySelector('#list-item-template')
// creat a globle variable to storage a key for localStroge
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()
todos.forEach(todo => renderTodo(todo))

list.addEventListener('change', e =>{
    if (!e.target.matches('[data-list-item-checkbox]')) return


    // get the todo that is clicked on 

    const parent = e.target.closest(".list-item")
    const todoId = parent.dataset.todoId
    
    // Toggle the complete property to be equal  to the  checkbox value

    const todo =todos.find(t => t.id === todoId)
    todo.complete = e.target.checked
    // to save over updated todo
    saveTodos()
})


// Delete TOdos
list.addEventListener('click',e =>{
    if(!e.target.matches('[data-button-delete]')) return

    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId
    // remove the todo from the screen
    parent.remove()
    // remove the todo from the list
    todos = todos.filter(todo => todo.id !== todoId)
    // save the new todos
     saveTodos()
})


// Add Todos

// User will type in todo and click to Add todo Button

form.addEventListener('submit', e =>{
    e.preventDefault() 


    const todoName = todoInput.value
    if (todoName === "") return // when todo is empty it do not render 
    const newTodoe = {
        name: todoName,
        complete: false,
        id : new Date().valueOf().toString()
    }
    todos.push(newTodoe)
    // for rendering type todo create a function
    renderTodo(newTodoe)
    saveTodos()
    todoInput.value = ""
})

function renderTodo(todo){
    const templateClone = templete.content.cloneNode(true)
    const listItem = templateClone.querySelector(".list-item")
    listItem.dataset.todoId = todo.id
    const textElement = templateClone.querySelector('[data-list-item-text]')
    textElement.innerText = todo.name
     const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
      checkbox.checked = todo.complete
    list.appendChild(templateClone)
}


// Load Todos
function loadTodos(){
    const todoString = localStorage.getItem(TODOS_STORAGE_KEY)
    return JSON.parse(todoString || "[]"); //parse its take a sting and convet it into java script oject
}


// save todos
// for saving todos we create a function

function saveTodos(){
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))  
    //in localStorage to store a data we use first a key in this the key is "TODOS_STORAGE_KEY" then we store our data and the data must be string
}





// Complete Todos
// it's done


