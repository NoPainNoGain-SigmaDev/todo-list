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
//Demo
user.newProject("Checklist");
user.newProject("Shopping List");
user.newProject("Homework");

const p = user.getProjects();
const id0 = p[0].getId(); // "Things ToDo" (already exists)
const id1 = p[1].getId(); // Checklist
const id2 = p[2].getId(); // Shopping List
const id3 = p[3].getId(); // Homework

// ---- Things ToDo ----
user.addToProject(user.newTodo("Buy groceries", "Milk, eggs, chicken, rice", "2025-07-20", "medium", id0), id0);
user.addToProject(user.newTodo("Fix the leaky faucet", "Call maintenance or get a wrench", "2025-07-21", "low", id0), id0);
user.addToProject(user.newTodo("Email landlord", "Regarding parking issue", "2025-07-22", "medium", id0), id0);
user.addToProject(user.newTodo("Backup phone", "Upload photos to cloud", "2025-07-22", "low", id0), id0);
user.addToProject(user.newTodo("Update resume", "Add DoorDash experience", "2025-07-25", "high", id0), id0);

// ---- Checklist ----
user.addToProject(user.newTodo("Pack phone charger", "", "", "low", id1), id1);
user.addToProject(user.newTodo("Turn off lights", "", "", "low", id1), id1);
user.addToProject(user.newTodo("Lock the door", "", "", "low", id1), id1);
user.addToProject(user.newTodo("Feed the cat", "", "", "medium", id1), id1);
user.addToProject(user.newTodo("Turn off stove", "", "", "high", id1), id1);
user.addToProject(user.newTodo("Close windows", "", "", "low", id1), id1);
user.addToProject(user.newTodo("Bring ID card", "", "", "medium", id1), id1);
user.addToProject(user.newTodo("Water plants", "", "", "low", id1), id1);
user.addToProject(user.newTodo("Unplug electronics", "", "", "medium", id1), id1);

// ---- Shopping List ----
user.addToProject(user.newTodo("Toilet paper", "", "", "medium", id2), id2);
user.addToProject(user.newTodo("Shampoo", "", "", "low", id2), id2);
user.addToProject(user.newTodo("Apples", "", "", "medium", id2), id2);
user.addToProject(user.newTodo("Rice", "", "", "low", id2), id2);
user.addToProject(user.newTodo("Ground beef", "", "", "medium", id2), id2);
user.addToProject(user.newTodo("Milk", "", "", "medium", id2), id2);
user.addToProject(user.newTodo("Cereal", "", "", "low", id2), id2);
user.addToProject(user.newTodo("Coffee", "", "", "high", id2), id2);
user.addToProject(user.newTodo("Trash bags", "", "", "low", id2), id2);


// ---- Homework ----
user.addToProject(user.newTodo("Write English essay", "Topic: Climate Change", "2025-07-22", "high", id3), id3);
user.addToProject(user.newTodo("Study for math quiz", "Practice algebra problems", "2025-07-23", "medium", id3), id3);
user.addToProject(user.newTodo("Read history chapter", "Chapter 4: Ancient Rome", "2025-07-24", "low", id3), id3);
user.addToProject(user.newTodo("Complete science lab", "Write observations", "2025-07-25", "high", id3), id3);
user.addToProject(user.newTodo("Review vocabulary", "Spanish Chapter 3", "2025-07-24", "medium", id3), id3);
user.addToProject(user.newTodo("Prepare presentation", "Slides about photosynthesis", "2025-07-26", "high", id3), id3);
user.addToProject(user.newTodo("Finish art project", "Bring it to school Monday", "2025-07-27", "medium", id3), id3);
user.addToProject(user.newTodo("Organize backpack", "", "", "low", id3), id3);
user.addToProject(user.newTodo("Check grades online", "", "", "low", id3), id3);


screenController();
