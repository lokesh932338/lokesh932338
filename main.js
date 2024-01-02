


window.onload = function(){
    var timeInput = document.getElementById("timeText")
    var taskInput = document.getElementById("taskText")
    var addButton = document.getElementById("addTask")
    var createButton = document.getElementById("createWall")
    var maindiv = document.getElementById("maindiv")

    addButton.addEventListener("click",addTask)
    createButton.addEventListener("click",createwall)

    // creating an array to contain all time intervals and their relative task data
    var allTasksArray = new Array()


    function addTask() {
        const time = timeInput.value
        const taskText = taskInput.value

        timeInput.value = ""
        taskInput.value = ""

        const arr = [time,taskText]
        allTasksArray.push(arr)

    }

    function createwall() {
        // removing all the existing items to have a clean webpage
        timeInput.remove()
        taskInput.remove()
        addButton.remove()
        createButton.remove()

        var wall = document.createElement("div")
        wall.id = "wall"

        var downloadButton = document.createElement("Button")
        downloadButton.textContent = "Download"
        downloadButton.id = "downloadbutton"
        downloadButton.addEventListener('click',downloader)

        maindiv.appendChild(wall)
        maindiv.appendChild(downloadButton)

        allTasksArray.forEach(element => {
            let task = document.createElement("div")
            task.classList.toggle("taskContainer")

            let dateLabel = document.createElement("div")
            let taskLabel = document.createElement("div")

            dateLabel.classList.toggle("dateLabelClass")
            taskLabel.classList.toggle("taskLabelClass")

            dateLabel.textContent = element[0]
            taskLabel.textContent = element[1]

            task.appendChild(taskLabel)
            task.appendChild(dateLabel)

            wall.appendChild(task)
        });

    }

    function downloader() {
        let wall = document.getElementById("wall")
        domtoimage.toBlob(wall)
            .then(function(blob){
                window.saveAs(blob,"wall.png")
            })
        
    }

}
