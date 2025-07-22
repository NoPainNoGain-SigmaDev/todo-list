import { dialogController } from "./dialog-controller";
import { createEl, clear, autoResize } from "./dom-tools";
import { user } from "../index.js";

export function screenController() {
  const dialogCont = dialogController();

  // DOM elements
  const addNewTodo = document.getElementById("add-new-todo");
  const addNewProject = document.getElementById("add-new-project");
  const history = document.getElementById("history");
  const dialog = document.getElementById("dialog");
  const projectsNav = document.getElementById("nav-content");
  const content = document.getElementById("content");
  const username = document.getElementById("username");

  let currentSelectedProject = null;
  let currentlyHistory = false;
  let pastWasHistory = false;

  // ----------- Helper Functions -----------

  const getCurrentProject = () => {
    if (currentlyHistory) {
      return user.getHistory();
    } else {
      const id = currentSelectedProject?.id;
      return user.getProject(id);
    }
  };

  const clickProject = () => {
    const project = projectsNav.querySelector(
      `[data-id="${currentSelectedProject?.dataset.id}"]`
    );
    project.click();
  };
  const setCurrentProject = (element) => {
    if (currentSelectedProject) {
      currentSelectedProject.classList.remove("selected-project");
      if (pastWasHistory) {
        currentlyHistory = false;
      } else {
        const icon = currentSelectedProject.querySelector(".project-info i");
        icon.classList.replace("fa-folder-open", "fa-folder-closed");
      }
    }
    currentSelectedProject = element;
    currentSelectedProject.classList.add("selected-project");

    if (currentlyHistory) {
      pastWasHistory = true;
    } else {
      pastWasHistory = false;
      const icon = currentSelectedProject.querySelector(".project-info i");
      icon.classList.replace("fa-folder-closed", "fa-folder-open");
    }
  };

  const createProjectElement = (project) => {
    const icon = createEl("i", { className: "fa-regular fa-folder-closed" });
    const title = createEl("h2", { textContent: project.getProjectName() });
    const info = createEl("div", { className: "project-info" }, [icon, title]);

    const trashIcon = createEl("i", { className: "fa-solid fa-trash" });
    const deleteBtn = createEl("button", { className: "project-delete" }, [
      trashIcon,
    ]);
    const tools = createEl("div", { className: "project-tools" }, [deleteBtn]);

    const container = createEl(
      "div",
      {
        className: "project hover-effect",
        id : project.getId(),
      },
      [info, tools]
    );

    container.dataset.id = project.getId();
    return container;
  };

  const updateProjectNav = () => {
    clear(projectsNav);
    user.getProjects().forEach((project) => {
      projectsNav.appendChild(createProjectElement(project));
    });
  };

  const createTodoElement = (todo) => {
    let disableToggleCompleted = false;
    if (currentlyHistory) disableToggleCompleted = true;
    const priorityBtn = createEl(
      "button",
      {
        className: `toggle-completed priority-${todo.getPriority()}`,
        disabled: disableToggleCompleted,
      },
      [createEl("i", { className: "fa-solid fa-check hidden" })]
    );

    const title = createEl("p", {
      className: "todo-title",
      textContent: todo.getTitle(),
    });
    let iconClassName = "fa-trash";
    if (currentlyHistory) {
      iconClassName = "fa-rotate-left";
    }

    const trashBtn = createEl("button", { className: "delete" }, [
      createEl("i", { className: `fa-solid ${iconClassName}` }),
    ]);

    const topRow = createEl("div", { className: "level-1-info" }, [
      priorityBtn,
      title,
      trashBtn,
    ]);

    const elements = [topRow];

    if (todo.getDescription().trim()) {
      elements.push(
        createEl("div", { className: "level-2-info" }, [
          createEl("p", {
            className: "description",
            textContent: todo.getDescription(),
          }),
        ])
      );
    }

    const bottomRowContent = [];

    if (todo.getDueDate().trim()) {
      bottomRowContent.push(
        createEl("div", { className: "date-container" }, [
          createEl("i", { className: "fa-regular fa-calendar-minus" }),
          createEl("p", {
            className: "date",
            textContent: todo.getDueDate(),
          }),
        ])
      );
    }

    if (currentlyHistory) {
      bottomRowContent.push(
        createEl("div", { className: "location" }, [
          createEl(
            "i", 
            {className : "fa-regular fa-folder"}
          ),
          createEl("p", {
            className: "location-title",
            textContent: user.getProject(todo.getLocation()).getProjectName(),
          }),
        ])
      );
    }

    const bottomRow = createEl(
      "div",
      { className: "level-3-info" },
      bottomRowContent
    );

    if (bottomRowContent.length) elements.push(bottomRow);

    const container = createEl(
      "div",
      {
        className: "todo-container",
      },
      elements
    );

    container.dataset.id = todo.getId();
    return container;
  };

  const updateProjectContent = (project) => {
    clear(content);
    const projectTitle = createEl("input", {
      className: "project-title",
      value: project.getProjectName(),
    });

    projectTitle.addEventListener("change", ()=>{
      if(projectTitle.value !== project.getProjectName()){
        project.updateProjectName(projectTitle.value);
        updateProjectNav();
        const selector = `${project.getId()}`;
        setCurrentProject(document.getElementById(selector));
      }
    });

    const container = createEl(
      "div",
      {
        className: "project-container scroll-container",
        id: "project-container",
      },
      [projectTitle]
    );

    container.dataset.id = project.getId();

    project.getProjectContent().forEach((todo) => {
      container.appendChild(createTodoElement(todo));
    });

    content.appendChild(container);
    addProjectContainerListeners(container);
  };

  const addProjectContainerListeners = (container) => {
    container.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest(".toggle-completed");
      const deleteBtn = e.target.closest(".delete");
      const todoContainer = e.target.closest(".todo-container");
      if (!(todoContainer && todoContainer.dataset)) return;
      const todoId = todoContainer.dataset.id;
      const currentProject = getCurrentProject();
      const currentProjectId = currentProject.getId();
      const todoObj = currentProject.getTodo(todoId);

      if (deleteBtn) {
        //delete button acts like restore
        if(currentlyHistory){
          dialogCont.dialogRestore(todoObj, todoObj.getLocation());
        }else{
          dialogCont.dialogDelete(todoId, currentProjectId);
        }
        dialog.showModal();
        dialog.addEventListener("close", () => {
          updateProjectContent(currentProject);
        });
        return;
      }

      if (toggleBtn) {
        user.addToHistory(todoObj);
        user.deleteFromProject(todoId, currentProjectId);
        updateProjectContent(currentProject);
        return;
      }

      if (todoContainer) {
        const todoId = todoContainer.dataset.id;
        let todo = "";
        if (currentlyHistory) {
          todo = user.getHistory().getTodo(todoId);
          dialogCont.dialogExpandTodo(todo);
          const form = document.getElementById("form");
          [...form.elements].forEach((el) => {
            if (el.id === "dialog-close") {
            } else {
              el.disabled = true;
            }
          });
        } else {
          todo = getCurrentProject().getTodo(todoId);
          dialogCont.dialogExpandTodo(todo);
        }
        dialog.showModal();
        autoResize(dialog.querySelector("#description"));
        dialog.addEventListener("close", () => {
          updateProjectContent(getCurrentProject());
        });
      }
    });
  };

  // ----------- Event Listeners -----------

  addNewProject.addEventListener("click", () => {
    dialogCont.dialogAddNewProject();
    dialog.showModal();

    dialog.addEventListener(
      "close",
      () => {
        updateProjectNav();
        clickProject();
      },
      { once: true }
    );
  });

  addNewTodo.addEventListener("click", () => {
    dialogCont.dialogAddNewTodo();
    dialog.showModal();

    dialog.addEventListener(
      "submit",
      () => {
        updateProjectContent(getCurrentProject());
      },
      { once: true }
    );
  });

  projectsNav.addEventListener("click", (e) => {
    const clickedProject = e.target.closest(".project");
    if (!clickedProject) return;

    setCurrentProject(clickedProject);
    updateProjectContent(getCurrentProject());
  });

  history.addEventListener("click", () => {
    currentlyHistory = true;
    const clickedProject = history;
    if (!clickedProject) return;

    setCurrentProject(clickedProject);
    updateProjectContent(user.getHistory());
  });

  username.addEventListener("change", ()=>{
    if(username.value !== user.userName()){
      user.newUserName(username.value);
    }else{
      
    }
  });

  // ----------- App Load -----------

  updateProjectNav();
  currentSelectedProject = projectsNav.querySelector(":scope > .project");
  clickProject();
  history.dataset.id = user.getHistory().getId();
}
