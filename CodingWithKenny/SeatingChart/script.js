const seats = document.querySelectorAll('.seat')
const groups = document.querySelectorAll('.group')
const button = document.querySelector('#button')
const delete_button = document.querySelector('#delete_button')
const student_name_input = document.querySelector('#student_name_input')
const name_list = document.querySelector('#name_list')
const dropdown_menu = document.querySelector('#select_class')
const amount_of_students = document.querySelector('#amount_of_students')

let total_students = 0
let selectedPeroid

let period_1_students = []
let period_2_students = []
let period_3_students = []
let period_4_students = []

let curr_ids_and_names = []
let current_saved_students = []
let new_student_element

window.addEventListener('DOMContentLoaded', () => {
    let selectedPeroid = document.querySelector('#select_class').value
    dropdown_menu.value = localStorage.getItem('current_period')

    if(localStorage.getItem('current_period')) {
        selectedPeroid = localStorage.getItem('current_period')
        dropdown_menu.value = selectedPeroid
    }
    let storedData = JSON.parse(localStorage.getItem('stored_data'))
    let currentSavedStudents = JSON.parse(localStorage.getItem(selectedPeroid))

    if(currentSavedStudents !== null){
        current_saved_students = currentSavedStudents
        total_students = current_saved_students.length
        displayStudentNames()
    }
    if(storedData!==null){
        storedData.forEach(data => {
            let element=document.querySelector(`[data-seat-id=${data.seat_ID}]`)
            element.textContent=data.name
        });
    }
    student_name_input.addEventListener('keydown', (e)=>{
        if(e.key==='Enter'&&student_name_input.value===''){
            alert("You didn't input anything...")
        }else if(e.key==='Enter'&&student_name_input.value!==''){
            if(total_students>=24){
                alert("You've reached the maximum capacity!")
                return
            }
            total_students++
            current_saved_students.push(student_name_input.value)
            localStorage.setItem(selectedPeroid, JSON.stringify(current_saved_students))
            localStorage.setItem('stored_data', JSON.stringify(getCurrentIdsAndNames()))
            displayStudentNames()
            student_name_input.value=''
        }
    })

    function randomizeSeats(){
        let storedPeriodSelected=JSON.parse(localStorage.getItem(selectedPeroid))
        let studentsCopy=[...storedPeriodSelected] // 이거 결과가 궁금하다...
        console.log("studentsCopy: "+studentsCopy)
        total_students=storedPeriodSelected.length
        for(let i=0;i<seats.length;i++){
            let randomStudent=studentsCopy[Math.floor(Math.random()*studentsCopy.length)]
            seats[i].textContent=randomStudent
            let index=studentsCopy.indexOf(randomStudent)
            studentsCopy.splice(index,1)
        }
        curr_ids_and_names=getCurrentIdsAndNames()
        localStorage.setItem('stored_data', JSON.stringify(curr_ids_and_names))
    }

    function getCurrentIdsAndNames(){
        let idsAndNames=[]
        for(let i=0;i<seats.length;i++){
            idsAndNames.push({name:seats[i].textContent, seat_ID:seats[i].dataset.seatId})
        }
        console.log('idsAndNames: '+idsAndNames)
        return idsAndNames//이거 궁금하다
    }

    function displayStudentNames(){
        name_list.innerHTML=''
        current_saved_students.forEach(name=>{
            new_student_element=document.createElement('li')
            new_student_element.setAttribute('class','name_list_item')
            new_student_element.textContent=name
            name_list.appendChild(new_student_element)
        })
    }

    button.addEventListener('click', randomizeSeats)
    delete_button.addEventListener('click', ()=>{
        alert('Class has been deleted')
        localStorage.removeItem(selectedPeroid)
        localStorage.removeItem('stored_data')
        total_students=0
        current_saved_students=[]
        name_list.innerHTML=''
    })
    dropdown_menu.addEventListener('change',()=>{
        selectedPeroid=dropdown_menu.value
        total_students=0
        current_saved_students=JSON.parse(localStorage.getItem(selectedPeroid))||[]
        displayStudentNames()
    })
})