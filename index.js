
let taskName = document.getElementById("task_name")
let description = document.getElementById("description")
let msg = document.getElementById("msg")
let taskContainer = document.getElementById("task-container")
let emptyTask = document.getElementById("empty-task")
let saveBtn = document.getElementById("save-btn")
let addBtn = document.getElementById("add-btn")
let deleteAll = document.getElementById("deleteAll")
let data = []

taskName.addEventListener("textInput", () => {
    if (taskName.value.length >= 1) {
        msg.innerHTML = ''
    } else {
        false
    }
})


let editTask = (index) => {
    let saveIndex = document.getElementById("save-index")
    data = JSON.parse(localStorage.getItem("data"))
    saveIndex.value = index
    taskName.value = data[index].taskName
    description.value = data[index].description
    saveBtn.style.display = "block"
    addBtn.style.display = "none"
}
let deleteTask = (index) => {
    data = JSON.parse(localStorage.getItem("data"))
    data.splice(index, 1)
    localStorage.setItem("data", JSON.stringify(data))
    createPost()
}
function deleteAllTask() {
    data = JSON.parse(localStorage.getItem("data"))
    data.length = 0
    localStorage.setItem("data", JSON.stringify(data))
    createPost()
}
let createPost = () => {
    taskContainer.innerHTML = ""
    data.map((value, index) => {
        return (taskContainer.innerHTML += `
        <div class="task" >
        <h4>${index+1}</h4>
            <div class="task-content">
                <h4>${value.taskName}</h4>
                <p>${value.description}</p>
            </div>
            <div class="action">
                <button type="submit" onclick="editTask(${index})" class="edit-btn">Edit</button>
                <button type="submit" onclick="deleteTask(${index})" class="delete-btn">Delete</button>
             </div>
        </div>
        `)
    })
    if (data.length > 0) {
        deleteAll.innerHTML = `<button type="submit" onclick="deleteAllTask()" class="delete-btn">Delete All</button>`
    } else {
        deleteAll.innerHTML = ``
    }
    emptyTask.innerHTML = `<h5 class="empty">Available Task (${data.length})</h5>`
    taskName.value = ""
    description.value = ""
}


let acceptData = () => {
    data.push({
        taskName: taskName.value,
        description: description.value
    })
    localStorage.setItem("data", JSON.stringify(data))
    createPost()
}


let formValidation = () => {
    if (taskName.value === "") {
        msg.innerHTML = `<h5>Enter Task Name<h5>`
    } else {
        acceptData()
    }
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    formValidation()
})

saveBtn.addEventListener("click", (e) => {
    e.preventDefault()
    data = JSON.parse(localStorage.getItem("data"))
    let saveIndex = document.getElementById("save-index").value
    console.log();
    data[saveIndex].taskName = taskName.value
    data[saveIndex].description = description.value
    localStorage.setItem("data", JSON.stringify(data))
    addBtn.style.display = "block"
    saveBtn.style.display = "none"
    createPost()
})

data = JSON.parse(localStorage.getItem("data")) || []
createPost()

