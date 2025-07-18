import { dialogController } from "./dialog-controller";
import { createEl, clear } from "./dom-tools";
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

  let currentSelectedProject = null;
  let currentlyHistory = false;
  let pastWasHistory = false;

  // ----------- Helper Functions -----------

  const getCurrentProject = () => {
    const id = currentSelectedProject?.dataset.id;
    return user.getProject(id);
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
        pastWasHistory = false;
      } else {
        const icon = currentSelectedProject.querySelector(".project-info i");
        icon.classList.replace("fa-folder-open", "fa-folder-closed");
      }
    }
    currentSelectedProject = element;
    currentSelectedProject.classList.add("selected-project");

    if (currentlyHistory) {
      currentlyHistory = false;
      pastWasHistory = true;
    } else {
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
    const priorityBtn = createEl(
      "button",
      {
        className: `toggle-completed priority-${todo.getPriority()}`,
      },
      [createEl("i", { className: "fa-solid fa-check hidden" })]
    );

    const title = createEl("p", {
      className: "todo-title",
      textContent: todo.getTitle(),
    });
    const trashBtn = createEl("button", { className: "delete" }, [
      createEl("i", { className: "fa-solid fa-trash" }),
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

    if (todo.getDueDate().trim()) {
      elements.push(
        createEl("div", { className: "level-3-info" }, [
          createEl("div", { className: "date-container" }, [
            createEl("i", { className: "fa-regular fa-calendar-minus" }),
            createEl("p", {
              className: "date",
              textContent: todo.getDueDate(),
            }),
          ]),
        ])
      );
    }

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
    const projectTitle = createEl("h1", {
      className: "project-title",
      textContent: project.getProjectName(),
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
      const todoContainer = e.target.closest(".todo-container");

      if (toggleBtn) {
        const projectContainer = document.getElementById("project-container");
        const todo = e.target.closest(".todo-container");
        const todoId = todo.dataset.id;
        const currentProject = getCurrentProject();
        const currentProjectId = currentProject.getId();
        const todoObj = currentProject.getTodo(todoId);

        user.addToHistory(todoObj);
        user.deleteFromProject(todoId, currentProjectId);
        updateProjectContent(currentProject);
        return;
      }

      if (todoContainer) {
        const isInHistory = document.querySelector(".project-title");

        const todoId = todoContainer.dataset.id;
        const todo = getCurrentProject().getTodo(todoId);
        dialogCont.dialogExpandTodo(todo);
        dialog.showModal();
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
    dialog.addEventListener("cancel", () => clear(dialog), { once: true });
  });

  addNewTodo.addEventListener("click", () => {
    dialogCont.dialogAddNewTodo();
    dialog.showModal();

    dialog.addEventListener(
      "submit",
      () => {
        updateProjectContent(getCurrentProject());
        clear(dialog);
      },
      { once: true }
    );

    dialog.addEventListener("cancel", () => clear(dialog), { once: true });
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

  // ----------- App Load -----------

  updateProjectNav();
  currentSelectedProject = projectsNav.querySelector(":scope > .project");
  clickProject();
  history.dataset.id = user.getHistory().getId();
}
