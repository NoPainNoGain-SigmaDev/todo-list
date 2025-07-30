import "./styles/global.css";
import "./styles/side-bar.css";
import "./styles/content.css";
import "./styles/dialog-add-new-todo.css";
import { createUser } from "./modules/create-user.js";
import { screenController } from "./modules/screen-controller.js";
import { loadUserData, saveUserData } from "./modules/persistence/local-storage-utils.js";
import { loadDemo } from "./modules/demo.js";

const collapseSideBar = document.getElementById("collapse-side-bar");
const showSideBar = document.getElementById("show-side-bar");
const sideBar = document.getElementById("side-bar");
const content = document.getElementById("content");

const mobileMediaQuery = window.matchMedia("(max-width: 768px)");
if (mobileMediaQuery.matches) {
  sideBar.classList.toggle("hidden");
  showSideBar.classList.toggle("hidden");
}

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

//new user or stored user data
let user = null;
const loadedUser = loadUserData();
if (loadedUser) {
  user = loadedUser;
} else {
  user = createUser();
  loadDemo(user);
  console.log("No saved data found, initializing new user.");
}

export { user };
saveUserData(user);

screenController();
