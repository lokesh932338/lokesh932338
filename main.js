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
        const num = Math.floor(Math.random() * 3) + 1;
        wall.style.background = `var(--background${num})`



        var downloadButton = document.createElement("Button")
        downloadButton.textContent = "Download"
        downloadButton.id = "downloadbutton"
        downloadButton.addEventListener('click',downloader)

        maindiv.appendChild(wall)
        maindiv.appendChild(downloadButton)

        allTasksArray.forEach(element => {
            let task = document.createElement("div")
            task.classList.toggle("taskContainer")
            // code to randomly select the background of task
            // as currently there are 3 background styles
            const num = Math.floor(Math.random() * 3) + 1;
            task.style.background = `var(--background${num})`
            wall.style.background = `var(--background${num})`




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
        // setting the dimentions of the elements
        const screenWidth = window.screen.width
        const screenHeight = window.screen.height
        const noOfTasks = allTasksArray.length
        // i know these are numbers but as of now px will be automatically added by the browsers and i don't know any way around now...

        // wall.style.width = screenWidth
        // wall.style.height = screenHeight

        if (screenWidth <= 650) {
            
            const taskContainerHeight = Math.floor(screenHeight/noOfTasks)
            
            
            const sheet = window.document.styleSheets[0]
            sheet.insertRule(`
            @media (max-width: 650px){
                #wall {
                    margin: 0;
                    padding: 0;
                    grid-template-columns: 1fr;
                    height: 750px;
                    width: ${screenWidth};
                }
            
                .taskContainer {
                    padding: 0px;
                    margin: 0px;
                    height: ${taskContainerHeight}px;
                    // width: ${screenWidth}px;
                
                }
                .taskLabelClass {
                    margin: auto;
                    padding: ${taskContainerHeight/12}px 0 0 0;
                    font-size: ${taskContainerHeight/3}px;
                    
                    
                }
                .dateLabelClass {
                    margin: auto;
                    padding: 0 0 ${taskContainerHeight/12}px 0;
                    font-size: ${taskContainerHeight/6}px
                    
                }
            }
            `, sheet.cssRules.length)
        }else{
            const taskContainerHeight = Math.floor(screenHeight/Math.ceil(noOfTasks/2)) -20
            const taskContainerWidth = Math.floor(screenWidth/2) - 50
            const sheet = window.document.styleSheets[0]
            sheet.insertRule(`
            @media (max-width: 4000px){
                #wall {
                    margin: 0;
                    padding: 0;
                    grid-template-columns: 1fr 1fr;
                    height: ${screenHeight};
                    width: ${screenWidth};
                
                }
            
                .taskContainer {
                    padding: 0px;
                    margin: 10px;
                    height: ${taskContainerHeight}px;
                    width: ${taskContainerWidth}px;
                
                }
                .taskLabelClass {
                
                    margin: auto;
                    padding: ${taskContainerHeight/12}px 0 0 0;
                    font-size: ${taskContainerHeight/3}px;
                    
                    
                }
                .dateLabelClass {
                    margin: auto;
                    // display: block;
                    padding: 0 0 ${taskContainerHeight/12}px 0;
                    font-size: ${taskContainerHeight/6}px
                    
                }
            }
            `, sheet.cssRules.length)
        }

    }

    function downloader() {
        let wall = document.getElementById("wall")
        domtoimage.toBlob(wall)
            .then(function(blob){
                window.saveAs(blob,"wall.png")
            })
        
    }

}
