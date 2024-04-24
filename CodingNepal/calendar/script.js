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

        // let myDate = new Date(currYear, currMonth, e.target.innerHTML)
        // console.log(myDate.getWeek())
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`
    }

    // create li of all days of current month
    for (let i=1; i <= lastDateOfMonth; i++) {
        // console.log(i)
        var isToday = i === date.getDate() 
            && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear()
            ? "active" : ""

        weeks = Math.floor(i/7+1)
        liTag += `<li class="${isToday}">${i}</li>`
    }

    // create li of next month first days
    for (let i = lastDayOfMonth; i < 6; i++ ) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`
     }

    currentDate.innerText = `${months[currMonth]} ${currYear}`
    daysTag.innerHTML = liTag

    const dayLis = document.querySelectorAll(".days li")
    for (let i=0; i<dayLis.length; i++){
        // let originClass = dayLis[i].getAttribute('class')
        dayLis[i].setAttribute("week", Math.floor(i/7))
    }
    console.log(dayLis)

    // dayLis.forEach((dayLi) => console.log(dayLi.innerHTML))

    document.querySelectorAll(".days li").forEach((dayLi) => {
        // let myDate = new Date(currYear, currMonth, dayLi.innerHTML)
        // let myWeek = myDate.getWeek()
        let originClass
        dayLi.addEventListener('mouseover', ()=>{
            // console.log(dayLi.getAttribute("week"))
            let elms = document.querySelectorAll('[week="'+ dayLi.getAttribute("week") +'"]')
            // console.log(elms)
            elms.forEach((e) => {
                originClass = e.getAttribute('class')
                e.setAttribute('class', originClass + ' hover')})
            // dayLi.setAttribute('class', 'hover')
        })

        dayLi.addEventListener('mouseout', ()=>{
            let elms = document.querySelectorAll('[week="'+ dayLi.getAttribute("week") +'"]')
            // console.log(elms)
            elms.forEach((e) => {
                e.setAttribute('class', originClass)})

            // dayLi.setAttribute('class', "")
        })
        
        // dayLi.addEventListener('click', (e) => {
            // console.log(e.target.innerHTML)

            // let weeknum = Math.floor((e.target.innerHTML-1)/7);
            // console.log(weeknum)

            // let myDate = new Date(currYear, currMonth, e.target.innerHTML)
            // console.log(myDate.getWeek())
            
        // })

    })

    
    
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


/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * param int dowOffset
 * return int
 */
// Date.prototype.getWeek = function (dowOffset) {
//     /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
    
//         dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
//         var newYear = new Date(this.getFullYear(),0,1);
//         var day = newYear.getDay() - dowOffset; //the day of week the year begins on
//         day = (day >= 0 ? day : day + 7);
//         var daynum = Math.floor((this.getTime() - newYear.getTime() - 
//         (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
//         var weeknum;
//         //if the year starts before the middle of a week
//         if(day < 4) {
//             weeknum = Math.floor((daynum+day-1)/7) + 1;
//             if(weeknum > 52) {
//                 nYear = new Date(this.getFullYear() + 1,0,1);
//                 nday = nYear.getDay() - dowOffset;
//                 nday = nday >= 0 ? nday : nday + 7;
//                 /*if the next year starts before the middle of
//                   the week, it is week #1 of that year*/
//                 weeknum = nday < 4 ? 1 : 53;
//             }
//         }
//         else {
//             weeknum = Math.floor((daynum+day-1)/7);
//         }
//         return weeknum;
//     };