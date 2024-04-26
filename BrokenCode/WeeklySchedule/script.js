const breakTask = document.getElementById('break')
const gymTask = document.getElementById('gym')
const studyTask = document.getElementById('study')
const tvTask = document.getElementById('tv')
const friendsTask = document.getElementById('friends')
const workTask = document.getElementById('work')
const deselectBtn = document.getElementById('deselect')

const taskContainer = document.querySelector('.task__container')
const scheduleContainer = document.querySelector('.schedule__container')
const resetBtn = document.querySelector('.deleteBtn')
const popUp = document.querySelector('.pop-up__container')
const noBtn = document.getElementById('btn__no')
const yesBtn = document.getElementById('btn__yes')

let selectedColor, active

taskContainer.addEventListener('click', selectTask)
scheduleContainer.addEventListener('click', setColors)
deselectBtn.addEventListener('click', resetTasks)
resetBtn.addEventListener('click', openPopup)
noBtn.addEventListener('click', closePopup)
yesBtn.addEventListener('click', deleteTasks)

// resetBtn 버튼 클릭으로 resetTasks() 이후에 task__name selected는 task__name으로 바뀌는데
// 이 상태에서 scheduleContainer를 클릭해서 selectTask()하면... undefined action? 
// 어떤 건 이전 task가 표시되고 어떤 건 그대로이고... 정확한 분석이 필요!!

function selectTask(e){
    resetTasks()  
    let taskColor = e.target.style.backgroundColor
    switch(e.target.id){
        case 'break':
            activeTask(breakTask, taskColor)
            icon = '<i class="fas fa-couch"></i>'
            break
        case 'gym':
            activeTask(gymTask, taskColor)
            icon = '<i class="fas fa-dumbbell"></i>'
            break
        case 'study':
            activeTask(studyTask, taskColor)
            icon = '<i class="fas fa-book"></i>'
            break
        case 'tv':
            activeTask(tvTask, taskColor)
            icon = '<i class="fas fa-tv"></i>'
            break
        case 'friends':
            activeTask(friendsTask, taskColor)
            icon = '<i class="fas fa-users"></i>'
            break
        case 'work':
            activeTask(workTask, taskColor)
            icon = '<i class="fas fa-briefcase"></i>'
            break
    }
}

function setColors(e){
    if(e.target.classList.contains('task') && active === true) {
        e.target.style.backgroundColor = selectedColor
        e.target.innerHTML = icon
    } else if (e.target.classList.contains('fas') && active === true) {
        e.target.parentElement.style.backgroundColor = selectedColor
        e.target.parentElement.innerHTML = icon
    }
}

function activeTask(task, color) {
    task.classList.toggle('selected')
    if(task.classList.contains('selected')){
        active = true
        selectedColor = color
        return selectedColor
    } else {
        active = false
    }
}

function resetTasks(){
    const allTasks = document.querySelectorAll('.task__name')
    allTasks.forEach((item)=>{
        item.className = 'task__name' //이건 정상적으로 작동하는데
    })
}

function deleteTasks(){
    const tasks = document.querySelectorAll('.task')
    tasks.forEach((item)=>{
        item.innerHTML = ''
        item.style.backgroundColor = 'white'
    })
    closePopup()
}

function openPopup(){
    popUp.style.display = 'flex'
}

function closePopup(){
    popUp.style.display = 'none'
}