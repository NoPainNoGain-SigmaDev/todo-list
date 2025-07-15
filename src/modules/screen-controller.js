import { dialogController } from "./dialog-controller";
import { createEl, clear } from "./dom-tools";
import {user} from "../index.js";

export function screenController() {
  
 
  

  //admin controll window.user = user;

  //demo
//   console.log(user.userName());
//   user.addToProject(user.newTodo("TEST 1"));
//   user.newProject("CHECKLIST PROJECT");
//   const newP = user.getProjects()[1].getId();
//   user.addToProject(user.newTodo(), newP);
//   const newT = user.getProjects()[1].getProjectContent()[0];
//   newT.updateDescription("Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
//   newT.updatePriority("high");
//   newT.updateDueDate("2025-12-25");
//   newT.addToChecklist(user.newChecklistItem("Checklist item"));
//   newT.addToChecklist(user.newChecklistItem("Checklist item"));
//   newT.addToChecklist(user.newChecklistItem("Checklist item"));
//   newT.addToChecklist(user.newChecklistItem("Checklist item"));
//   newT.addToChecklist(user.newChecklistItem("Checklist item"));
//   newT.addToChecklist(user.newChecklistItem("Checklist item"));

//   user.self();
  //end demo

  //DOM elements
  const addNewTodo = document.getElementById("add-new-todo");
  const addNewProject = document.getElementById("add-new-project");
  const dialog = document.getElementById("dialog");
  const projectsNav = document.getElementById("nav-content");
  const content = document.getElementById("content");
  
  const dialogCont = dialogController();


  const updateProjectNav = () => {
    const createProjectElement = (project) => {
        return createEl("div", {className : "project hover-effect", id : project.getId()}, [
            createEl("div", {className : "project-info"}, [
                createEl("i", {className : "fa-solid fa-folder-closed"}),
                createEl("h2", { textContent : project.getProjectName()}),
            ]),
            createEl("div", {className : "project-tools"}, [
                createEl("button", {className : "project-delete"}, [
                    createEl("i", {className : "fa-solid fa-trash"}),
                ]),
            ]),
        ]);
    };

    clear(projectsNav);

    const avaiableProjects = user.getProjects();

    avaiableProjects.forEach(project=>{
        projectsNav.appendChild(createProjectElement(project));
    });
  };



  addNewTodo.addEventListener("click", () => {
    dialogCont.dialogAddNewTodo();
    dialog.showModal();
  });

  addNewProject.addEventListener("click", () => {
    dialogCont.dialogAddNewProject();
    dialog.showModal();

    dialog.addEventListener("close", updateProjectNav);
    dialog.addEventListener("cancel", ()=>{clear(dialog)});
  });

  projectsNav.addEventListener("click", (e)=>{
    
    const currentSelectedProject = projectsNav.querySelector(".selected-project");
    if(currentSelectedProject){
        currentSelectedProject.classList.remove("selected-project");
    }

    const newSelectedProject = e.target.closest(".project");
    newSelectedProject.classList.toggle("selected-project");
    console.log(user.getProject(newSelectedProject.id))
  });




  updateProjectNav();
};