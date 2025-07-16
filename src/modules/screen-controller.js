import { dialogController } from "./dialog-controller";
import { createEl, clear } from "./dom-tools";
import {user} from "../index.js";

export function screenController() {
  
 
  

  //admin controll window.user = user;

  //demo
console.log(user.userName());
user.newProject("Checklist");
user.newProject("Shopping List");
user.newProject("Homework");

const p = user.getProjects();
const id0 = p[0].getId();
const id1 = p[1].getId();
const id2 = p[2].getId();
const id3 = p[3].getId();

user.addToProject(user.newTodo("Buy groceries", "Milk, eggs, chicken, rice", "2025-07-20", "medium"), id0);
user.addToProject(user.newTodo("Weekly supplies", "Toilet paper, trash bags, soap", "2025-07-17", "low"), id0);
user.addToProject(user.newTodo("Buy groceries again", "Fruits, snacks, pasta, olive oil", "2025-07-21", "medium"), id0);
user.addToProject(user.newTodo("Restock weekly items", "Detergent, toothpaste, sponges", "2025-07-18", "low"), id0);
user.addToProject(user.newTodo("Buy groceries", "Milk, eggs, chicken, rice", "2025-07-20", "medium"), id0);
user.addToProject(user.newTodo("Weekly supplies", "Toilet paper, trash bags, soap", "2025-07-17", "low"), id0);
user.addToProject(user.newTodo("Buy groceries again", "Fruits, snacks, pasta, olive oil", "2025-07-21", "medium"), id0);
user.addToProject(user.newTodo("Restock weekly items", "Detergent, toothpaste, sponges", "2025-07-18", "low"), id0);
user.addToProject(user.newTodo("Buy groceries", "Milk, eggs, chicken, rice", "2025-07-20", "medium"), id0);
user.addToProject(user.newTodo("Weekly supplies", "Toilet paper, trash bags, soap", "2025-07-17", "low"), id0);
user.addToProject(user.newTodo("Buy groceries again", "Fruits, snacks, pasta, olive oil", "2025-07-21", "medium"), id0);
user.addToProject(user.newTodo("Restock weekly items", "Detergent, toothpaste, sponges", "2025-07-18", "low"), id0);
user.addToProject(user.newTodo("Buy groceries", "Milk, eggs, chicken, rice", "2025-07-20", "medium"), id0);
user.addToProject(user.newTodo("Weekly supplies", "Toilet paper, trash bags, soap", "2025-07-17", "low"), id0);
user.addToProject(user.newTodo("Buy groceries again", "Fruits, snacks, pasta, olive oil", "2025-07-21", "medium"), id0);
user.addToProject(user.newTodo("Restock weekly items", "Detergent, toothpaste, sponges", "2025-07-18", "low"), id0);
user.addToProject(user.newTodo("Buy groceries", "Milk, eggs, chicken, rice", "2025-07-20", "medium"), id0);
user.addToProject(user.newTodo("Weekly supplies", "Toilet paper, trash bags, soap", "2025-07-17", "low"), id0);
user.addToProject(user.newTodo("Buy groceries again", "Fruits, snacks, pasta, olive oil", "2025-07-21", "medium"), id0);
user.addToProject(user.newTodo("Restock weekly items", "Detergent, toothpaste, sponges", "2025-07-18", "low"), id0);

user.addToProject(user.newTodo("Chores checklist", "Do laundry, vacuum room", "2025-07-16", "high"), id1);
user.addToProject(user.newTodo("Pack for trip", "Socks, charger, headphones, passport", "2025-07-18", "medium"), id1);
user.addToProject(user.newTodo("Weekend cleaning", "Wipe windows, clean fridge, sweep porch", "2025-07-19", "medium"), id1);
user.addToProject(user.newTodo("Trip prep tasks", "Charge power bank, prepare clothes", "2025-07-17", "high"), id1);

user.addToProject(user.newTodo("Study math", "Ch. 5 – Derivatives and applications", "2025-07-19", "high"), id2);
user.addToProject(user.newTodo("English essay", "Write 3 paragraphs about Hamlet", "2025-07-20", "medium"), id2);
user.addToProject(user.newTodo("Chemistry notes", "Summarize atomic structure lecture", "2025-07-18", "medium"), id2);
user.addToProject(user.newTodo("History review", "Timeline of WWI events", "2025-07-21", "high"), id2);

user.addToProject(user.newTodo("Refactor UI", "Clean up sidebar and make mobile-friendly", "2025-07-17", "low"), id3);
user.addToProject(user.newTodo("Fix checklist bug", "Checklist items not saving correctly", "2025-07-15", "high"), id3);
user.addToProject(user.newTodo("Optimize loading", "Add lazy loading to project previews", "2025-07-19", "medium"), id3);
user.addToProject(user.newTodo("Debug form state", "Values reset when dialog reopens", "2025-07-16", "high"), id3);
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

        const todoElement = createEl("div", {className : "todo-container"}, [
            createEl("div", {className : "level-1-info"}, [priorityButton, todoTitle, deleteButton]),
            createEl("div", {className : "level-2-info"}, [todoDescription]),
            createEl("div", {className : "level-3-info"}, [todoDate]),
        ]);

        return todoElement;
    }

    const projectName = createEl("h1", {className : "project-title", textContent : project.getProjectName()});
    const projectId = project.getId();
    const todos = project.getProjectContent();
    

    const projectContent = createEl("div", {className : "project-container scroll-container", id : "project-container", dataSet : {dataId : projectId}}, [
        projectName,
    ]);
    todos.forEach(todo=> projectContent.appendChild(createTodoElement(todo)));

    
    content.appendChild(projectContent);
  }


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
    clear(content);
    //adding color to the selected project
    const currentSelectedProject = projectsNav.querySelector(".selected-project");
    if(currentSelectedProject){
        currentSelectedProject.classList.remove("selected-project");
    }
    
    const newSelectedProject = e.target.closest(".project");
    newSelectedProject.classList.toggle("selected-project");
    console.log(user.getProject(newSelectedProject.id));

    updateProjectContent(user.getProject(newSelectedProject.id));

    //expanding the selected project in the  content section as a project container

  });

  updateProjectNav();
  const firstChild = projectsNav.querySelector(":scope > *");
  firstChild.click();
  
};