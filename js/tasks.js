// ======================================
// LUMINO TASKS
// PART 1
// ======================================

// ---------- ELEMENTS ----------

const taskPopup = document.getElementById("taskPopup");
const addTaskBtn = document.getElementById("addTaskBtn");

const saveTaskBtn = document.querySelector(".save-btn");
const cancelTaskBtn = document.querySelector(".cancel-btn");

const taskTitle = document.getElementById("taskTitle");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const taskCategory = document.getElementById("taskCategory");
const taskCompleted = document.getElementById("taskCompleted");

const taskContainer = document.getElementById("taskContainer");

const searchTask = document.getElementById("searchTask");

// ---------- VARIABLES ----------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let taskEditingIndex = null;

// ======================================
// SAVE TO LOCAL STORAGE
// ======================================

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// ======================================
// OPEN POPUP
// ======================================

addTaskBtn.addEventListener("click",()=>{

    taskEditingIndex = null;

    taskTitle.value = "";
    taskDate.value = "";
    taskPriority.value = "High";
    taskCategory.selectedIndex = 0;
    taskCompleted.checked = false;

    taskPopup.style.display = "flex";

});

// ======================================
// CLOSE POPUP
// ======================================

cancelTaskBtn.addEventListener("click",()=>{

    taskPopup.style.display = "none";

});

taskPopup.addEventListener("click",(e)=>{

    if(e.target===taskPopup){

        taskPopup.style.display="none";

    }

});

// ======================================
// SAVE TASK
// ======================================

saveTaskBtn.addEventListener("click",()=>{

    const title = taskTitle.value.trim();

    if(title===""){

        alert("Please enter a task title.");

        return;

    }

    const task={

        title:title,

        date:taskDate.value,

        priority:taskPriority.value,

        category:taskCategory.value,

        completed:taskCompleted.checked

    };

    if(taskEditingIndex===null){

        tasks.push(task);

    }else{

        tasks[taskEditingIndex]=task;

        taskEditingIndex=null;

    }

    saveTasks();

    taskPopup.style.display="none";

    renderTasks();

});

// ======================================
// RENDER TASKS
// ======================================

function renderTasks(search = ""){

    taskContainer.innerHTML = "";

    let filtered = tasks.filter(task =>

        task.title.toLowerCase().includes(search.toLowerCase()) ||

        task.category.toLowerCase().includes(search.toLowerCase())

    );

    if(filtered.length === 0){

        taskContainer.innerHTML = `

            <div class="empty">

                <h2>No Tasks Found</h2>

                <p>Click "New Task" to create one.</p>

            </div>

        `;

        updateDashboard();

        return;

    }

    filtered.forEach((task,index)=>{

        taskContainer.innerHTML += `

        <div class="task-card ${task.priority.toLowerCase()}">

            <div class="task-top">

                <div>

                    <h3 class="${task.completed ? "completed" : ""}">

                        ${task.title}

                    </h3>

                    <small>

                        📅 ${task.date || "No Due Date"}

                    </small>

                </div>

                <span class="priority ${task.priority.toLowerCase()}">

                    ${task.priority}

                </span>

            </div>

            <div class="task-info">

                <span>

                    📂 ${task.category}

                </span>

            </div>

            <div class="task-actions">

                <button class="complete-btn" data-index="${index}" title="Complete">

                    <i class="fa-solid fa-check"></i>

                </button>

                <button class="edit-btn" data-index="${index}" title="Edit">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete-btn" data-index="${index}" title="Delete">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    addCompleteEvents();

    addEditEvents();

    addDeleteEvents();

    updateDashboard();

}

// ======================================
// UPDATE DASHBOARD
// ======================================

function updateDashboard(){

    const total = document.getElementById("totalTasks");

    const completed = document.getElementById("completedTasks");

    const pending = document.getElementById("pendingTasks");

    const high = document.getElementById("highPriorityTasks");

    if(total){

        total.textContent = tasks.length;

    }

    if(completed){

        completed.textContent = tasks.filter(task => task.completed).length;

    }

    if(pending){

        pending.textContent = tasks.filter(task => !task.completed).length;

    }

    if(high){
        high.textContent = tasks.filter(task => task.priority === "High").length;
        
    }

}

// ======================================
// COMPLETE TASK
// ======================================

function addCompleteEvents(){

    const completeButtons = document.querySelectorAll(".complete-btn");

    completeButtons.forEach(button=>{

        button.onclick = ()=>{

            const index = Number(button.dataset.index);

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            renderTasks(searchTask ? searchTask.value : "");

        };

    });

}

// ======================================
// EDIT TASK
// ======================================

function addEditEvents(){

    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(button=>{

        button.onclick = ()=>{

            const index = Number(button.dataset.index);

            taskEditingIndex = index;

            taskTitle.value = tasks[index].title;

            taskDate.value = tasks[index].date;

            taskPriority.value = tasks[index].priority;

            taskCategory.value = tasks[index].category;

            taskCompleted.checked = tasks[index].completed;

            taskPopup.style.display = "flex";

        };

    });

}

// ======================================
// DELETE TASK
// ======================================

function addDeleteEvents(){

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button=>{

        button.onclick = ()=>{

            const index = Number(button.dataset.index);

            if(confirm("Delete this task?")){

                tasks.splice(index,1);

                saveTasks();

                renderTasks(searchTask ? searchTask.value : "");

            }

        };

    });

}

// ======================================
// SEARCH
// ======================================

if(searchTask){

    searchTask.addEventListener("input",()=>{

        renderTasks(searchTask.value);

    });

}

// ======================================
// INITIAL LOAD
// ======================================

renderTasks();