//Kumpulkan semua UI element
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos")

//ini adalah kumpulan evenListener

immediateLoadEventLister();

function immediateLoadEventLister() {

    //Mendapatkan todos dari localstorage dan render di browser
    document.addEventListener("DOMContentLoaded", getTodos);

    //Ini adalah event untuk menambahkan todo
    todoForm.addEventListener("submit", addTodo);
    //Ini adalah event untuk menghapus 1 todo
    todoList.addEventListener("click", deleteTodo);
    //Ini adalah event untuk menghapus semua todo
    clearButton.addEventListener("click", clearTodos);
    //Ini adalah untuk menFilter Todo
    filterInput.addEventListener("keyup", filterTodos);
}

//Reusable codes

function createTodoElement(value) {
    // membuat li element
    const li = document.createElement("li")
    //Menambahkan class pada element li
    li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1"
    //Menambahkan children ke dalam elemnt li
    li.appendChild(document.createTextNode(value))
    
    //Membuat delete button
    const a = document.createElement("a");

    //Memberi properti untuk element
    a.href = "#"
    a.className = "badge badge-danger delete-todo"
    a.innerHTML = "Delete";

    // Menyelipkan element a ke element li
    li.appendChild(a)

    //Memasukkan element li yang telah di buat dengan javascript
    //kedalam elemnt todolist
    todoList.appendChild(li)
}
function getItemFromLocalStorage() {
   let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

//Ini adalah DOM Function

function getTodos() {
    const todos = getItemFromLocalStorage();
    todos.forEach((todo) =>{
        createTodoElement(todo)

    })
}

function addTodo(e) {
    e.preventDefault();

    if (todoInput.value) {
        createTodoElement(todoInput.value)
        addTodoLocalStorage(todoInput.value)
        
        todoInput.value = ""
    }else {
        alert("Tulis sebuah todo")
    }

   
    
  
}

function addTodoLocalStorage(todoInputValue){
    const todos = getItemFromLocalStorage();
    
    todos.push(todoInputValue)

    localStorage.setItem("todos", JSON.stringify(todos))
}

function deleteTodo(e) {
    e.preventDefault();
   
    if(e.target.classList.contains("delete-todo")) {
        if  (confirm("Apakah anda yakin akan menghapus")) {
            const parent = e.target.parentElement;
        
            parent.remove();

            deleteTodoLocalStorage(parent);
        }
    }
}

function deleteTodoLocalStorage(deleteElement) {
    const todos = getItemFromLocalStorage();

    todos.forEach((todo, index) =>{
        if (deleteElement.firstChild.textContent === todo){
            todos.splice(index, 1)
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {
    todoList.innerHTML = ""
    clearTodoLocalStorage();
}

function clearTodoLocalStorage() {
    localStorage.clear();
}

function filterTodos(e) {
   
        const filterText = e.target.value.toLowerCase();
        const todoItems = document.querySelectorAll(".todo-item")

        todoItems.forEach((item) => {
        const itemText = item.firstChild.textContent.toLocaleLowerCase();

        if (itemText.indexOf(filterText) !== -1) {
            item.setAttribute("style", "display: block;");
        }else {
            item.setAttribute("style","display: none !important;")
        }

        console.log(itemText)

    })
}
     
const chageProjectHeadingTitle = (title) => {
    const projectTitle = document.querySelector("#project-title");
    if (typeof title === 'string'){
        projectTitle.textContent = title;
    }else{
        console.error("Kudu string cuy")
    }
    
}
chageProjectHeadingTitle("Todo List Project")