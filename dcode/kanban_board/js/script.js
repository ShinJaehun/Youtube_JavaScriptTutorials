// import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js"
// console.log(KanbanAPI.insertItem(2, "I am new"))

// KanbanAPI.deleteItem(10748)

new Kanban(
    document.querySelector(".kanban")
)