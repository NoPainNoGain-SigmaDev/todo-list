import "./styles/global.css";
import "./styles/side-bar.css";
import "./styles/content.css";
import "./styles/dialog-add-new-todo.css";
import { createUser } from "./modules/create-user.js";
import { screenController } from "./modules/screen-controller.js";

const collapseSideBar = document.getElementById("collapse-side-bar");
const showSideBar = document.getElementById("show-side-bar");
const sideBar = document.getElementById("side-bar");
const content = document.getElementById("content");

collapseSideBar.addEventListener("click", () => {
  sideBar.classList.toggle("hidden");
  content.style.width = "100vw";
  showSideBar.classList.toggle("hidden");
});
showSideBar.addEventListener("click", () => {
  sideBar.classList.toggle("hidden");
  content.style.width = "calc(100vw - 280px)";
  showSideBar.classList.toggle("hidden");
});

//new user or stored user data SINGLETON USER
export const user = createUser();
//DEMO
// New Projects
// projects[0] is "Things ToDo" by default
user.newProject("Daily Tasks");
user.newProject("Errands");
user.newProject("Creative Projects");

const projects = user.getProjects();
const thingsToDoId = projects[0].getId();     // "Things ToDo" (default)
const dailyTasksId = projects[1].getId();     // "Daily Tasks"
const errandsId = projects[2].getId();        // "Errands"
const creativeProjectsId = projects[3].getId(); // "Creative Projects"

// --- Things ToDo (Default) ---
// General tasks, some with descriptions, some simple
user.addToProject(user.newTodo("Pay bills", "Check utilities and credit cards", "2025-07-28", "high", thingsToDoId), thingsToDoId);
user.addToProject(user.newTodo("Schedule dentist appointment", "", "", "medium", thingsToDoId), thingsToDoId);
user.addToProject(user.newTodo("Call mom", "", "", "low", thingsToDoId), thingsToDoId);
user.addToProject(user.newTodo("Research new laptop", "Look at reviews for MacBook Air vs. Dell XPS", "2025-08-01", "medium", thingsToDoId), thingsToDoId);

// --- Daily Tasks ---
// A main todo with a description, due date, and sub-todos for a shopping list
const groceriesTodo = user.newTodo("Grocery Shopping", "Plan meals for the week and buy ingredients", "2025-07-25", "high", dailyTasksId);
user.addToProject(groceriesTodo, dailyTasksId);
groceriesTodo.addSubTodo(user.newTodo("Milk", "", "", "low"));
groceriesTodo.addSubTodo(user.newTodo("Eggs", "", "", "low"));
groceriesTodo.addSubTodo(user.newTodo("Bread", "", "", "low"));
groceriesTodo.addSubTodo(user.newTodo("Chicken", "", "", "medium"));
groceriesTodo.addSubTodo(user.newTodo("Vegetables", "", "", "medium"));

// A simpler daily todo
user.addToProject(user.newTodo("Walk the dog", "", "2025-07-24", "medium", dailyTasksId), dailyTasksId);

// Another todo with sub-todos, but fewer details on the main todo, acting like a checklist
const morningRoutineTodo = user.newTodo("Morning Routine Checklist", "", "", "medium", dailyTasksId);
user.addToProject(morningRoutineTodo, dailyTasksId);
morningRoutineTodo.addSubTodo(user.newTodo("Make bed", "", "", "low"));
morningRoutineTodo.addSubTodo(user.newTodo("Brush teeth", "", "", "low"));
morningRoutineTodo.addSubTodo(user.newTodo("Have breakfast", "", "", "low"));

// --- Errands ---
// A todo with full details and sub-todos for a multi-step errand
const bankVisitTodo = user.newTodo("Bank Visit", "Deposit check and update address", "2025-07-26", "high", errandsId);
user.addToProject(bankVisitTodo, errandsId);
bankVisitTodo.addSubTodo(user.newTodo("Gather documents", "Bank statements, ID", "", "medium"));
bankVisitTodo.addSubTodo(user.newTodo("Check bank hours", "", "", "low"));
bankVisitTodo.addSubTodo(user.newTodo("Find parking", "", "", "low"));

// A simple title-only errand
user.addToProject(user.newTodo("Pick up dry cleaning", "", "", "low", errandsId), errandsId);

// Another simple errand
user.addToProject(user.newTodo("Mail package", "", "", "medium", errandsId), errandsId);

// --- Creative Projects ---
// A detailed todo with sub-todos for a complex project
const novelWritingTodo = user.newTodo("Write Novel Chapter 3", "Focus on character development for Sarah", "2025-08-10", "high", creativeProjectsId);
user.addToProject(novelWritingTodo, creativeProjectsId);
novelWritingTodo.addSubTodo(user.newTodo("Outline plot points", "", "", "medium"));
novelWritingTodo.addSubTodo(user.newTodo("Draft 500 words", "", "", "high"));
novelWritingTodo.getSubTodos()[1].addSubTodo(user.newTodo("Min 200 words about her past", "", "", "low"));
novelWritingTodo.getSubTodos()[1].addSubTodo(user.newTodo("Max 150 words about her family", "", "", "low"));
novelWritingTodo.getSubTodos()[1].addSubTodo(user.newTodo("Min 150 words about her feelings", "", "", "low"));
novelWritingTodo.addSubTodo(user.newTodo("Review previous chapter", "", "", "low"));

// A todo with just a title and priority for brainstorming
user.addToProject(user.newTodo("Brainstorm new ideas", "", "", "low", creativeProjectsId), creativeProjectsId);

// Another detailed todo for a skill-based project
user.addToProject(user.newTodo("Learn new guitar riff", "Practice 'Stairway to Heaven' solo", "2025-07-30", "medium", creativeProjectsId), creativeProjectsId);


user.self();

screenController();
