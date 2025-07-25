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
user.newProject("Daily Tasks 🗓️");
user.newProject("Quick Runs 🏃");
user.newProject("Creative 🎨");

const projects = user.getProjects();
const thingsToDoId = projects[0].getId(); // Correctly reference the existing default project
const dailyTasksId = projects[1].getId();
const quickRunsId = projects[2].getId();
const creativeId = projects[3].getId();

// --- Things ToDo (Default) ---
// General tasks, some with descriptions, some simple
user.addToProject(
  user.newTodo(
    "Pay bills 💸",
    "Check utilities and credit cards",
    "25-07-28", // Using 'YY-MM-DD' for shorter dates as per common practice, if your system handles it
    "high",
    thingsToDoId
  ),
  thingsToDoId
);
user.addToProject(
  user.newTodo("Schedule dentist appointment", "", "", "medium", thingsToDoId),
  thingsToDoId
);
user.addToProject(
  user.newTodo("Call mom", "", "", "low", thingsToDoId),
  thingsToDoId
);
user.addToProject(
  user.newTodo(
    "Research new laptop 💻",
    "Look at reviews for MacBook Air vs. Dell XPS",
    "25-08-01",
    "medium",
    thingsToDoId
  ),
  thingsToDoId
);

// --- Daily Tasks ---
// A main todo with a description, due date, and sub-todos for a shopping list
const groceriesTodo = user.newTodo(
  "Grocery Shopping 🛒",
  "Plan meals for the week and buy ingredients",
  "25-07-25",
  "high",
  dailyTasksId
);
user.addToProject(groceriesTodo, dailyTasksId);
groceriesTodo.addSubTodo(user.newTodo("Milk", "", "", "low", groceriesTodo.getId()));
groceriesTodo.addSubTodo(user.newTodo("Eggs", "", "", "low", groceriesTodo.getId()));
groceriesTodo.addSubTodo(user.newTodo("Bread", "", "", "low", groceriesTodo.getId()));
groceriesTodo.addSubTodo(user.newTodo("Chicken", "", "", "medium", groceriesTodo.getId()));
groceriesTodo.addSubTodo(user.newTodo("Vegetables", "", "", "medium", groceriesTodo.getId()));

// A simpler daily todo
user.addToProject(
  user.newTodo("Walk the dog 🐕", "", "25-07-24", "medium", dailyTasksId),
  dailyTasksId
);

// Another todo with sub-todos, but fewer details on the main todo, acting like a checklist
const morningRoutineTodo = user.newTodo(
  "Morning Routine Checklist",
  "",
  "",
  "medium",
  dailyTasksId
);
user.addToProject(morningRoutineTodo, dailyTasksId);
morningRoutineTodo.addSubTodo(user.newTodo("Make bed", "", "", "low", morningRoutineTodo.getId()));
morningRoutineTodo.addSubTodo(user.newTodo("Brush teeth", "", "", "low", morningRoutineTodo.getId()));
morningRoutineTodo.addSubTodo(user.newTodo("Have breakfast", "", "", "low", morningRoutineTodo.getId()));

// --- Quick Runs ---
// A todo with full details and sub-todos for a multi-step quick run
const bankVisitTodo = user.newTodo(
  "Bank Visit 🏦",
  "Deposit check and update address",
  "25-07-26",
  "high",
  quickRunsId
);
user.addToProject(bankVisitTodo, quickRunsId);
bankVisitTodo.addSubTodo(
  user.newTodo("Gather documents", "Bank statements, ID", "", "medium", bankVisitTodo.getId())
);
bankVisitTodo.addSubTodo(user.newTodo("Check bank hours", "", "", "low", bankVisitTodo.getId()));
bankVisitTodo.addSubTodo(user.newTodo("Find parking", "", "", "low", bankVisitTodo.getId()));

// A simple title-only quick run
user.addToProject(
  user.newTodo("Pick up dry cleaning", "", "", "low", quickRunsId),
  quickRunsId
);

// Another simple quick run
user.addToProject(
  user.newTodo("Mail package 📦", "", "", "medium", quickRunsId),
  quickRunsId
);

// --- Creative ---
// A detailed todo with sub-todos for a complex project
const novelWritingTodo = user.newTodo(
  "Write Novel Chapter 3 ✍️",
  "Focus on character development for Sarah",
  "25-08-10",
  "high",
  creativeId
);
user.addToProject(novelWritingTodo, creativeId);

// Sub-todo for outlining
const outlineTodo = user.newTodo("Outline plot points", "", "", "medium", novelWritingTodo.getId());
novelWritingTodo.addSubTodo(outlineTodo);
// Sub-sub-todos for outlining
outlineTodo.addSubTodo(user.newTodo("Chapter summary (1-2 sentences)", "", "", "low", outlineTodo.getId()));
outlineTodo.addSubTodo(user.newTodo("Key character arcs", "", "", "medium", outlineTodo.getId()));

// Sub-todo for drafting with fixed sub-sub-todos
const draftTodo = user.newTodo("Draft 500 words", "", "", "high", novelWritingTodo.getId());
novelWritingTodo.addSubTodo(draftTodo);
draftTodo.addSubTodo(user.newTodo("Min 200 words about her past", "", "", "low", draftTodo.getId()));
draftTodo.addSubTodo(user.newTodo("Max 150 words about her family", "", "", "low", draftTodo.getId()));
draftTodo.addSubTodo(user.newTodo("Min 150 words about her feelings", "", "", "low", draftTodo.getId()));

// Another sub-todo
novelWritingTodo.addSubTodo(user.newTodo("Review previous chapter", "", "", "low", novelWritingTodo.getId()));

// A todo with just a title and priority for brainstorming
user.addToProject(
  user.newTodo("Brainstorm new ideas 💡", "", "", "low", creativeId),
  creativeId
);

// Another detailed todo for a skill-based project
const guitarTodo = user.newTodo(
  "Learn new guitar riff 🎸",
  "Practice 'Stairway to Heaven' solo",
  "25-07-30",
  "medium",
  creativeId
);
user.addToProject(guitarTodo, creativeId);
// Adding a sub-todo with sub-sub-todos
const section1Todo = user.newTodo(
  "Master Section 1 (0:00-0:30)",
  "",
  "",
  "high",
  guitarTodo.getId()
);
guitarTodo.addSubTodo(section1Todo);
section1Todo.addSubTodo(user.newTodo("Practice scales D minor pentatonic", "", "", "medium", section1Todo.getId()));
section1Todo.addSubTodo(user.newTodo("Slow tempo drill (60 bpm)", "", "", "low", section1Todo.getId()));
//End demo

//user.self(); //print user

screenController();
