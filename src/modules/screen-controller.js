import { createUser } from "./create-user";
import { dialogController } from "./dialog-controller";


export function screenController(pastUser) {
  //new user or stored user data
  const user = pastUser? pastUser : createUser();

  //demo
  window.user = user;
  console.log(user.userName());
  user.addToProject(user.newTodo("TEST 1"));
  user.newProject("CHECKLIST PROJECT");
  const newP = user.getProjects()[1].getId();
  user.addToProject(user.newTodo(), newP);
  const newT = user.getProjects()[1].getProjectContent()[0];
  newT.updateDescription("Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
  newT.updatePriority("high");
  newT.updateDueDate("2025-12-25");
  newT.addToChecklist(user.newChecklistItem("Checklist item"));
  newT.addToChecklist(user.newChecklistItem("Checklist item"));
  newT.addToChecklist(user.newChecklistItem("Checklist item"));
  newT.addToChecklist(user.newChecklistItem("Checklist item"));
  newT.addToChecklist(user.newChecklistItem("Checklist item"));
  newT.addToChecklist(user.newChecklistItem("Checklist item"));

  user.self();
  //end demo

  //DOM elements
  const addNewTodo = document.getElementById("add-new-todo");
  const addNewProject = document.getElementById("add-new-project");
  const collapseSideBar = document.getElementById("collapse-side-bar");
  const showSideBar = document.getElementById("show-side-bar");
  const sideBar = document.getElementById("side-bar");
  const dialog = document.getElementById("dialog");
  const content = document.getElementById("content");
  
  const dialogCont = dialogController();


 

  addNewTodo.addEventListener("click", () => {
    dialogCont.dialogAddNewTodo();
    dialog.showModal();
  });

  

  addNewProject.addEventListener("click", () => {
    dialogCont.dialogAddNewProject();
    dialog.showModal();
  });

  collapseSideBar.addEventListener("click", ()=>{
    sideBar.classList.toggle("hidden");
    content.style.width = "100vw";
    showSideBar.classList.toggle("hidden");
  });
   showSideBar.addEventListener("click", ()=>{
        sideBar.classList.toggle("hidden");
        content.style.width = "calc(100vw - 280px)";
        showSideBar.classList.toggle("hidden");
    });

};


// dialogCont.dialogExpandTodo(newT);
//     const textarea = document.getElementById("description");
//     textarea.addEventListener("input", () => autoResize(textarea));

//     dialog.showModal();
//     autoResize(textarea)