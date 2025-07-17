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

user.addToProject(user.newTodo("Buy groceries", "Milk, eggs, chicken, rice", "2025-07-20", "medium"), id0);
user.addToProject(user.newTodo("Fix the leaky faucet", "Call maintenance or get a wrench", "2025-07-21", "low"), id0);


user.addToProject(user.newTodo("Pack phone charger"), id1);
user.addToProject(user.newTodo("Turn off lights"), id1);
user.addToProject(user.newTodo("Lock the door"), id1);


user.addToProject(user.newTodo("Toilet paper"), id2);
user.addToProject(user.newTodo("Shampoo"), id2);
user.addToProject(user.newTodo("Apples"), id2);


user.addToProject(user.newTodo("Write English essay", "Topic: Climate Change", "2025-07-22", "high"), id3);
user.addToProject(user.newTodo("Study for math quiz", "Practice algebra problems", "2025-07-23", "medium"), id3);
user.addToProject(user.newTodo("Read history chapter", "Chapter 4: Ancient Rome", "2025-07-24", "low"), id3);




screenController();
