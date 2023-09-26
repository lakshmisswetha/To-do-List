const createTodo = document.getElementById("create-todo");
const listItems =  document.getElementById("list-items");
const listContainer = document.getElementById("list-container");
const createTodoMessage = document.getElementById("create-todo-message");
const selectTodoMessage = document.getElementById("select-todo-message");
const titleText = document.getElementById("title-text");
const taskItemContainer = document.getElementById("task-items-container");




const imageUrl = "Assets/delete_black.svg"; 
const hoverUrl = "Assets/delete_red.svg";
var taskArray = [];

showData()

document.querySelector("#create-todo").addEventListener("keydown",(e)=>{
if(e.key === "Enter" ){
    e.preventDefault();
    addTask();
}
})

function addTask(){
    
    
    if (createTodo.value===''){
        alert("Write somethingg !");
    }
    else if (document.querySelector(".list-head").style.display === "none"){
        alert("Cannot Add Task ")
    }

    else {
        let li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = createTodo.value;
        listItems.appendChild(li);

        if (li){
            createTodoMessage.style.display = "none";
        }
        

       

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
    saveData()
}





if (listItems.innerHTML!=""){
    createTodoMessage.style.display="none";
}else{
    createTodoMessage.style.display="flex";
}




listItems.addEventListener("click",function(e){
    
    if (e.target.tagName === "IMG"){
        e.target.parentElement.parentElement.textContent;
        deleteTaskGroup(e.target.parentElement.parentElement.textContent);
        e.target.parentElement.parentElement.remove();
        saveData();

        

        if(e.target.parentElement.parentElement.textContent === titleText.textContent){
            titleText.textContent = "";
            taskItemContainer.innerHTML='';
            selectTodoMessage.textContent = "Select To-do List";
            selectTodoMessage.style.display = "flex";
        }
        
        
    }
    else if (e.target.tagName === "LI"){
        titleText.textContent = e.target.textContent;
        taskItemContainer.innerHTML = "";
        selectTodoMessage.textContent = "Add Todo";
       

        var tasksDataArray = getTasksData();
        var len = tasksDataArray.length;
        for (let i=0; i<len; i++){
            if (tasksDataArray[i].taskName === e.target.textContent){
                var num = tasksDataArray[i].itemsName.length;
                var index = i;
                
            }
            else{
                selectTodoMessage.style.fontSize = "27px";
                selectTodoMessage.textContent = "Add Todo";
                selectTodoMessage.style.display = "flex";
            }
        }
        for (let i = 0; i < num; i++){
            addTaskItem();
            
            var inputFields = document.querySelectorAll(".item-name"); 
            inputFields[i].value = tasksDataArray[index].itemsName[i].name; 
            inputFields[i].blur();
            var checkbox = document.querySelectorAll(".checkbox");
            checkbox[i].checked = tasksDataArray[index].itemsName[i].checked;
            var input = document.querySelectorAll(".item-name");
            if(checkbox[i].checked){
                input[i].style.textDecoration = "line-through";
            }else{
                input[i].style.textDecoration = "none";
            }
            
        }


        

        
        
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




//creating new task items  on clicking the plus button
function addTaskItem(){
    if (titleText.textContent === ""){
        alert("Select a To-do to add task!!");
        return;
    }
    

    selectTodoMessage.style.display = "none";

    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.style.display = "flex";

    const inputFields = document.createElement("div");
    inputFields.className = "input-fields";

    const checkbox = document.createElement("input");
    checkbox.className = "checkbox";
    checkbox.setAttribute("type", "checkbox");
    inputFields.appendChild(checkbox);

    const form = document.createElement("form");
    form.className = "task-form";

    const input = document.createElement("input");
    input.setAttribute("type", "text");
	input.className = "item-name";
    input.placeholder = "enter your task";
    input.focus();
    
   

    const deleteTask = document.createElement("img");
    deleteTask.className = "del-task-item";
    deleteTask.src = "Assets/delete_black.svg";

    form.appendChild(input);
    
    inputFields.appendChild(checkbox);
    inputFields.appendChild(form);
    taskItem.appendChild(inputFields);
    taskItem.appendChild(deleteTask);
    taskItemContainer.appendChild(taskItem);
    input.focus();
    
    
    checkbox.addEventListener("change",()=>{
        if(checkbox.checked){
            input.style.textDecoration = "line-through";
            var taskArray = getTasksData();
            for (let i=0; i<taskArray.length; i++){
                if (taskArray[i].taskName === titleText.textContent){
                    for(let j=0; j<taskArray[i].itemsName.length; j++){
                        if (taskArray[i].itemsName[j].name === input.value){
                            taskArray[i].itemsName[j].checked = true;
                        }
                    }
                }
            }
        }
        else {
            input.style.textDecoration = "none";
            var taskArray = getTasksData();
            for (let i=0; i<taskArray.length; i++){
                if (taskArray[i].taskName === titleText.textContent){
                    for(let j=0; j<taskArray[i].itemsName.length; j++){
                        if (taskArray[i].itemsName[j].name === input.value){
                            taskArray[i].itemsName[j].checked = false;
                        }
                    }
                }
            }

        }

       


        localStorage.setItem("tasksData", JSON.stringify(taskArray));
    })  



    taskItem.addEventListener("click",function(e){

        if (e.target.tagName === "IMG"){
            e.target.parentElement.remove();
            if (taskItemContainer.innerHTML===""){
                selectTodoMessage.style.display = "flex";
            }
            var tasksData = getTasksData();
            var titleText = document.querySelector("#title-text")
            var taskToUpdate = tasksData.find(task=>task.taskName === titleText.textContent);
            if (taskToUpdate){
                
                for(let i=0; i<taskToUpdate.itemsName.length; i++){
                    taskToUpdate.itemsName = taskToUpdate.itemsName.filter(item => item.name !== e.target.closest('.task-item').querySelector('.item-name').value);
                }
                
                localStorage.setItem("tasksData",JSON.stringify(tasksData));
            }
        }        
    })

    
    



}


document.querySelector(".plus-btn").addEventListener("click",()=>{

    addTaskItem();
    
})

//delete entire taskitem details from localstorage on clicking del btn on left
function deleteTaskGroup(taskGroupToDelete){
    var tasksDataArray = getTasksData();
    var idx = -1;
    for (var i=0; i<tasksDataArray.length; i++){
        if (tasksDataArray[i].taskName === taskGroupToDelete){
            idx = i;
            break;
        }
    }

    if (idx!=-1){
        tasksDataArray.splice(idx,1);
        localStorage.setItem("tasksData",JSON.stringify(tasksDataArray))
        
    }
}

function cleanTasks(){
    taskItemContainer.innerHTML = "";
    var tasksData = getTasksData();
    var taskTitle = document.querySelector("#title-text");
    for (let i=0; i<tasksData.length; i++){
        
        if (tasksData[i].taskName === taskTitle.textContent){
            tasksData[i].itemsName=[];
            
        }
    }
    
    localStorage.setItem("tasksData",JSON.stringify(tasksData));
    selectTodoMessage.style.fontSize = "27px";
    selectTodoMessage.textContent = "Add Todo";
    selectTodoMessage.style.display = "flex";
}




document.querySelector("#task-items-container").addEventListener("submit",(e)=>{
    e.preventDefault();  
    
    saveItems ();
    e.target.querySelector(".item-name").blur(); 
    
});

//storing taskname : [item1, item2, ..] in task array  
function saveItems () {

    var taskName = titleText.textContent;
    

    if (taskName && document.activeElement.value) {

        var taskArray = getTasksData();

        var existingTask = taskArray.find(task => task.taskName === titleText.textContent);
        if (existingTask){
            if(!existingTask.itemsName.includes(document.activeElement.value)){
                existingTask.itemsName.push({
                    name: document.activeElement.value,
                    checked: false
                });
            }
            else{
                alert("Task already exists ! ")
            }
            
        }else{
            var newTask = {
                taskName : taskName,

                itemsName : [
                    {
                        name : document.activeElement.value,
                        checked : false
                    }
                ]
            };
            taskArray.push(newTask);
        }
        localStorage.setItem("tasksData",JSON.stringify(taskArray));
    }

}






function searchOnL () {
    document.querySelector(".list-head").style.display = "none";
    document.querySelector(".search-list").style.display = "flex";

}

function searchOffL () {
    searchInput.value = "";
    document.querySelector(".list-head").style.display = "flex";
    document.querySelector(".search-list").style.display = "none";
    document.querySelector("#notFound").style.display="none";
    searchTask();

}
var searchInput = document.querySelector(".search-input");
function searchTask (){
    
    var searchTerm = searchInput.value.toLowerCase();
    var taskItems = listItems.querySelectorAll(".todo-item");
    var found = false;
    if (searchInput.value===""){
        document.querySelector("#notFound").style.display="none";
    }

    taskItems.forEach(function (taskItem){
        var taskText = taskItem.textContent.toLowerCase();
        if (taskText.includes(searchTerm)){
            taskItem.style.display = "flex";
            found = true;
        }else{
            taskItem.style.display = "none";
        }
    })

    if ((found === false) || (listContainer.innerHTML ==="")){
        document.querySelector("#notFound").style.display="flex";
    }
    else if(listContainer.innerHTML != ""){
        document.querySelector("#notFound").style.display="none";
    }
    
}
searchInput.addEventListener("input",searchTask);


//searching items of a particular task

var taskItemSearch = document.querySelector(".task-item-search")

function searchTaskItem(){
    
    var taskContent = document.getElementById("task-content");
    var searchItem = taskItemSearch.value.toLowerCase();
    var tasksItem = taskItemContainer.querySelectorAll(".task-item");
    var res = false;
    if (taskItemSearch.value===""){
        document.querySelector("#result-not-found").style.display="none";        
    }
        
    for (var i =0; i<tasksItem.length; i++){
        var taskItemName = tasksItem[i].getElementsByClassName("item-name")[0];
        var taskText = taskItemName.value.toLowerCase();

        
        if (taskText.includes(searchItem)){
            tasksItem[i].style.display = "flex";
            res = true;
        } else {
            tasksItem[i].style.display = "none";
        }
    }


    if ((res === false) || (taskContent.innerHTML ==="")){
        document.querySelector("#result-not-found").style.display="flex";
    }
    else if(taskContent.innerHTML != ""){        
        document.querySelector("#result-not-found").style.display="none";
    }
    
}

taskItemSearch.addEventListener("input",searchTaskItem);



function searchOnR(){
    if (document.getElementById("select-todo-message").style.display != "none"){
        alert("Select a To-Do List");
    }
    else{
        document.querySelector(".task-title").style.display = "none";
        document.querySelector(".search-task-items").style.display = "flex";
    }
    
}
function searchOffR(){
    taskItemSearch.value = "";
    document.querySelector(".search-task-items").style.display = "none";
    document.querySelector(".task-title").style.display = "flex";
    document.querySelector("#result-not-found").style.display="none";
    searchTaskItem();

}




function saveData(){
    localStorage.setItem("data",listItems.innerHTML)
}
function showData(){
    listItems.innerHTML = localStorage.getItem("data");
    
    
}


function getTasksData() {
    var tasksData = localStorage.getItem("tasksData");
    return JSON.parse(tasksData) || [];
  }




 


