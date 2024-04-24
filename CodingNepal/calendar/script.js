const currentDate = document.querySelector(".current-date")
const daysTag = document.querySelector(".days")
const prevNextIcon = document.querySelectorAll(".icons span")

var date = new Date()
var currYear = date.getFullYear()
var currMonth = date.getMonth()

// console.log(date, currYear, currMonth)

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    // get the last date of month
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate()
    // console.group(lastDateOfMonth)

    // get the first day of month
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay()

    // get the last date of previous month
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate()

    // get the last day of month
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay()

    var liTag = ""

    // create li of previous month last days
    for (let i=firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`
    }

    // create li of all days of current month
    for (let i=1; i <= lastDateOfMonth; i++) {
        // console.log(i)
        var isToday = i === date.getDate() 
            && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear()
            ? "active" : ""

        liTag += `<li class="${isToday}">${i}</li>`
    }

    // create li of next month first days
    for (let i = lastDayOfMonth; i < 6; i++ ) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`
     }

    currentDate.innerText = `${months[currMonth]} ${currYear}`
    daysTag.innerHTML = liTag
}

renderCalendar()

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        // console.log(icon)
        
        currMonth = icon.id === "prev" ? currMonth -1 : currMonth +1

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth)
            currYear = date.getFullYear()
            currMonth = date.getMonth() 
        } else {
            date = new Date()
        }


        renderCalendar()
    })
})