import { dialogController } from "./dialog-controller";
import { createEl, clear } from "./dom-tools";
import {user} from "../index.js";

export function screenController() {
  

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


  const updateProjectContent = (project) =>{
    const createTodoElement = (todo) => {
        const priorityButton = createEl("button", {className : `toggle-completed priority-${todo.getPriority()}`},[
            createEl("i", {className : "fa-solid fa-check hidden"}),
        ]);
        const todoTitle =  createEl("p", {className : "todo-title", textContent : todo.getTitle()});
        const deleteButton = createEl("button", {className : "delete"}, [
            createEl("i", {className : "fa-solid fa-trash"}),
        ]); 
        const todoDescription = createEl("p", {className : "description", textContent : todo.getDescription(),});
        const todoDate = createEl("div", {className : "date-container"}, [
            createEl("i", {className : "fa-regular fa-calendar-minus"}),
            createEl("p", {className : "date", textContent : todo.getDueDate()}),
        ]);

        const todoContent = [];
        todoContent.push(createEl("div", {className : "level-1-info"}, [priorityButton, todoTitle, deleteButton]));

        if(!(todo.getDescription().trim() === "")){
          todoContent.push(createEl("div", {className : "level-2-info"}, [todoDescription]));
        }
        if(!(todo.getDueDate().trim() === "")){
          todoContent.push(createEl("div", {className : "level-3-info"}, [todoDate]));
        }


        const todoElement = createEl("div", {className : "todo-container"}, todoContent);

        return todoElement;
    }

    const projectName = createEl("h1", {className : "project-title", textContent : project.getProjectName()});
    const projectId = project.getId();
    const todos = project.getProjectContent();
    

    const projectContent = createEl("div", {className : "project-container scroll-container", id : "project-container",}, [
        projectName,
    ]);
    projectContent.dataset.id = projectId;
    todos.forEach(todo=> projectContent.appendChild(createTodoElement(todo)));

    
    content.appendChild(projectContent);
  }


  addNewTodo.addEventListener("click", () => {
    dialogCont.dialogAddNewTodo();
    dialog.showModal();
    dialog.addEventListener("submit", ()=>{
      clear(content);
      updateProjectContent(user.getProject(currentSelectedProject.id));
    });
    dialog.addEventListener("cancel", ()=>{clear(dialog)});
  });

  addNewProject.addEventListener("click", () => {
    dialogCont.dialogAddNewProject();
    dialog.showModal();

    dialog.addEventListener("close", updateProjectNav);
    dialog.addEventListener("cancel", ()=>{clear(dialog)});
  });

  projectsNav.addEventListener("click", (e)=>{
    clear(content);
    //adding color to the selected project
    currentSelectedProject = projectsNav.querySelector(".selected-project");
    if(currentSelectedProject){
        currentSelectedProject.classList.remove("selected-project");
        const folderIcon = currentSelectedProject.querySelector(".project-info i");
        folderIcon.classList.remove("fa-folder-open");
        folderIcon.classList.add("fa-folder-closed");
    
    }
    
    currentSelectedProject = e.target.closest(".project");
    currentSelectedProject.classList.toggle("selected-project");
    const folderIcon = currentSelectedProject.querySelector(".project-info i");
    folderIcon.classList.remove("fa-folder-closed");
    folderIcon.classList.add("fa-folder-open");
    
    //expanding the selected project in the  content section as a project container
    updateProjectContent(user.getProject(currentSelectedProject.id));

  });


  //app first load

  updateProjectNav();
  let currentSelectedProject = projectsNav.querySelector(":scope > *");
  currentSelectedProject.click();
  
};