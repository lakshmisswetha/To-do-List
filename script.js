const createTodo = document.getElementById("create-todo");
const listItems =  document.getElementById("list-items");
const listContainer = document.getElementById("list-container");
const createTodoMessage = document.getElementById("create-todo-message");
const selectTodoMessage = document.getElementById("select-todo-message");
const titleText = document.getElementById("title-text");


function addTask(){
    if (createTodo.value===''){
        alert("Write somethingg !");
    }

    else {
        let li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = createTodo.value;
        listItems.appendChild(li);

        if (li){
            createTodoMessage.style.display = "none";
        }
        

        var imageUrl = "Assets/delete_black.svg"; 
        var hoverUrl = "Assets/delete_red.svg";

        let span = document.createElement("span");
        span.innerHTML = '<img src="' + imageUrl + '" alt="Delete Icon">';
        li.appendChild(span);

        span.addEventListener("mouseenter",()=>{
            var imgElement = span.querySelector("img");
            imgElement.src = hoverUrl;
        })

        span.addEventListener("mouseleave",()=>{
            var imgElement = span.querySelector("img");
            imgElement.src = imageUrl;
        })

    }
    createTodo.value = '';
}



listItems.addEventListener("click",function(e){
    
    if (e.target.tagName === "IMG"){
        e.target.parentElement.parentElement.remove();
        if(e.target.parentElement.parentElement.textContent === titleText.textContent){
            titleText.textContent = "";
            selectTodoMessage.textContent = "Select To-do List";
            selectTodoMessage.style.display = "flex";

        }
        
    }
    else if (e.target.tagName === "LI"){
        titleText.textContent = e.target.textContent;
        selectTodoMessage.style.fontSize = "27px";
        selectTodoMessage.textContent = "Add Todo";
        
    }


    function hasListItems (){
        var itemNum = listItems.querySelectorAll(".todo-item");
        return itemNum.length > 0;
    
    }
    function toggleDefaultMessage (){
        if (hasListItems()){
            createTodoMessage.style.display = "none";
        }
        else {
            createTodoMessage.style.display = "flex";
        }
    }
    toggleDefaultMessage ()

    
},false)

