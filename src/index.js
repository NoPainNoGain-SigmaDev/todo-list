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
const thingsToDoId = projects[0].getId();
const dailyTasksId = projects[1].getId();
const quickRunsId = projects[2].getId();
const creativeId = projects[3].getId();

// --- Things ToDo (Default) ---
// All todos here belong to 'thingsToDoId' project
user.addToProject(
  user.newTodo(
    "Pay bills 💸",
    "Check utilities and credit cards",
    "2025-07-28",
    "high",
    thingsToDoId, // location: project ID
    null // parent: no parent
  ),
  thingsToDoId
);
user.addToProject(
  user.newTodo(
    "Schedule dentist appointment",
    "",
    "",
    "medium",
    thingsToDoId,
    null
  ),
  thingsToDoId
);
user.addToProject(
  user.newTodo("Call mom", "", "", "low", thingsToDoId, null),
  thingsToDoId
);
user.addToProject(
  user.newTodo(
    "Research new laptop 💻",
    "Look at reviews for MacBook Air vs. Dell XPS",
    "2025-08-01",
    "medium",
    thingsToDoId,
    null
  ),
  thingsToDoId
);

// --- Daily Tasks ---
// All todos here belong to 'dailyTasksId' project
const groceriesTodo = user.newTodo(
  "Grocery Shopping 🛒",
  "Plan meals for the week and buy ingredients",
  "2025-07-2025",
  "high",
  dailyTasksId, // location: project ID
  null
);
user.addToProject(groceriesTodo, dailyTasksId);
// Sub-todos of groceriesTodo
groceriesTodo.addSubTodo(
  user.newTodo("Milk", "", "", "low", dailyTasksId, groceriesTodo.getId())
); // location: project ID, parent: parent todo ID
groceriesTodo.addSubTodo(
  user.newTodo("Eggs", "", "", "low", dailyTasksId, groceriesTodo.getId())
);
groceriesTodo.addSubTodo(
  user.newTodo("Bread", "", "", "low", dailyTasksId, groceriesTodo.getId())
);
groceriesTodo.addSubTodo(
  user.newTodo("Chicken", "", "", "medium", dailyTasksId, groceriesTodo.getId())
);
groceriesTodo.addSubTodo(
  user.newTodo(
    "Vegetables",
    "",
    "",
    "medium",
    dailyTasksId,
    groceriesTodo.getId()
  )
);

// A simpler daily todo
user.addToProject(
  user.newTodo("Walk the dog 🐕", "", "2025-07-24", "medium", dailyTasksId, null),
  dailyTasksId
);

// Another todo with sub-todos, but fewer details on the main todo, acting like a checklist
const morningRoutineTodo = user.newTodo(
  "Morning Routine Checklist",
  "",
  "",
  "medium",
  dailyTasksId,
  null
);
user.addToProject(morningRoutineTodo, dailyTasksId);
// Sub-todos of morningRoutineTodo
morningRoutineTodo.addSubTodo(
  user.newTodo(
    "Make bed",
    "",
    "",
    "low",
    dailyTasksId,
    morningRoutineTodo.getId()
  )
);
morningRoutineTodo.addSubTodo(
  user.newTodo(
    "Brush teeth",
    "",
    "",
    "low",
    dailyTasksId,
    morningRoutineTodo.getId()
  )
);
morningRoutineTodo.addSubTodo(
  user.newTodo(
    "Have breakfast",
    "",
    "",
    "low",
    dailyTasksId,
    morningRoutineTodo.getId()
  )
);

// --- Quick Runs ---
// All todos here belong to 'quickRunsId' project
const bankVisitTodo = user.newTodo(
  "Bank Visit 🏦",
  "Deposit check and update address",
  "2025-07-26",
  "high",
  quickRunsId, // location: project ID
  null
);
user.addToProject(bankVisitTodo, quickRunsId);
// Sub-todos of bankVisitTodo
bankVisitTodo.addSubTodo(
  user.newTodo(
    "Gather documents",
    "Bank statements, ID",
    "",
    "medium",
    quickRunsId,
    bankVisitTodo.getId()
  )
);
bankVisitTodo.addSubTodo(
  user.newTodo(
    "Check bank hours",
    "",
    "",
    "low",
    quickRunsId,
    bankVisitTodo.getId()
  )
);
bankVisitTodo.addSubTodo(
  user.newTodo(
    "Find parking",
    "",
    "",
    "low",
    quickRunsId,
    bankVisitTodo.getId()
  )
);

// A simple title-only quick run
user.addToProject(
  user.newTodo("Pick up dry cleaning", "", "", "low", quickRunsId, null),
  quickRunsId
);

// Another simple quick run
user.addToProject(
  user.newTodo("Mail package 📦", "", "", "medium", quickRunsId, null),
  quickRunsId
);

// --- Creative ---
// All todos here belong to 'creativeId' project
const novelWritingTodo = user.newTodo(
  "Write Novel Chapter 3 ✍️",
  "Focus on character development for Sarah",
  "2025-08-10",
  "high",
  creativeId, // location: project ID
  null
);
user.addToProject(novelWritingTodo, creativeId);

// Sub-todo for outlining
const outlineTodo = user.newTodo(
  "Outline plot points",
  "",
  "",
  "medium",
  creativeId,
  novelWritingTodo.getId()
); // location: project ID, parent: parent todo ID
novelWritingTodo.addSubTodo(outlineTodo);
// Sub-sub-todos of outlineTodo
outlineTodo.addSubTodo(
  user.newTodo(
    "Chapter summary (1-2 sentences)",
    "",
    "",
    "low",
    creativeId,
    outlineTodo.getId()
  )
); // location: project ID, parent: parent sub-todo ID
outlineTodo.addSubTodo(
  user.newTodo(
    "Key character arcs",
    "",
    "",
    "medium",
    creativeId,
    outlineTodo.getId()
  )
);

// Sub-todo for drafting with fixed sub-sub-todos
const draftTodo = user.newTodo(
  "Draft 500 words",
  "",
  "",
  "high",
  creativeId,
  novelWritingTodo.getId()
);
novelWritingTodo.addSubTodo(draftTodo);
// Sub-sub-todos of draftTodo
draftTodo.addSubTodo(
  user.newTodo(
    "Min 200 words about her past",
    "",
    "",
    "low",
    creativeId,
    draftTodo.getId()
  )
);
draftTodo.addSubTodo(
  user.newTodo(
    "Max 150 words about her family",
    "",
    "",
    "low",
    creativeId,
    draftTodo.getId()
  )
);
draftTodo.addSubTodo(
  user.newTodo(
    "Min 150 words about her feelings",
    "",
    "",
    "low",
    creativeId,
    draftTodo.getId()
  )
);

// Another sub-todo of novelWritingTodo
novelWritingTodo.addSubTodo(
  user.newTodo(
    "Review previous chapter",
    "",
    "",
    "low",
    creativeId,
    novelWritingTodo.getId()
  )
);

// A todo with just a title and priority for brainstorming
user.addToProject(
  user.newTodo("Brainstorm new ideas 💡", "", "", "low", creativeId, null),
  creativeId
);

// Another detailed todo for a skill-based project
const guitarTodo = user.newTodo(
  "Learn new guitar riff 🎸",
  "Practice 'Stairway to Heaven' solo",
  "2025-07-30",
  "medium",
  creativeId, // location: project ID
  null
);
user.addToProject(guitarTodo, creativeId);
// Adding a sub-todo with sub-sub-todos
const section1Todo = user.newTodo(
  "Master Section 1 (0:00-0:30)",
  "",
  "",
  "high",
  creativeId, // location: project ID
  guitarTodo.getId() // parent: parent todo ID
);
guitarTodo.addSubTodo(section1Todo);
// Sub-sub-todos of section1Todo
section1Todo.addSubTodo(
  user.newTodo(
    "Practice scales D minor pentatonic",
    "",
    "",
    "medium",
    creativeId,
    section1Todo.getId()
  )
); // location: project ID, parent: parent sub-todo ID
section1Todo.addSubTodo(
  user.newTodo(
    "Slow tempo drill (60 bpm)",
    "",
    "",
    "low",
    creativeId,
    section1Todo.getId()
  )
);
//End demo

//user.self(); //print user

screenController();
