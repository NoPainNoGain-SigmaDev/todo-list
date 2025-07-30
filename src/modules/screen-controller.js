import { dialogController } from "./dialog-controller";
import { createEl, clear, autoResize } from "./dom-tools";
import { user } from "../index.js"; // Ensure user has getCurrentProjectId and updateCurrentProjectId
import { saveUserData } from "./persistence/local-storage-utils.js";
//Date format
import {
  isTomorrow,
  isToday,
  isThisYear,
  format,
  getDay,
  isThisWeek,
  isPast,
  isYesterday,
} from "date-fns";

export function screenController() {
  const dialogCont = dialogController();

  // DOM elements
  const addNewTodo = document.getElementById("add-new-todo");
  const addNewProject = document.getElementById("add-new-project");
  const history = document.getElementById("history");
  const dialog = document.getElementById("dialog");
  const dialogSecondary = document.getElementById("dialog-level-2");
  const projectsNav = document.getElementById("nav-content");
  const content = document.getElementById("content");
  const username = document.getElementById("username");

  // State management (now primarily relies on user.currentProjectId)
  let currentlyHistory = false; // Still useful for history specific logic

  // ----------- Helper Functions -----------

  // Gets the current project object (either a Project or the History object)
  const getCurrentProjectObject = () => {
    if (currentlyHistory) {
      return user.getHistory();
    } else {
      const id = user.getCurrentProjectId();
      return user.getProject(id);
    }
  };

  // Helper to get the DOM element of the currently selected project
  const getCurrentProjectElement = () => {
    const currentId = user.getCurrentProjectId();
    if (currentId === user.getHistory().getId()) {
      // Check if history is the current "project"
      return history;
    }
    return document.getElementById(currentId);
  };

  // Updates the visual "selected" state and folder icon for projects
  const setCurrentProjectDisplay = () => {
    // Remove 'selected-project' from all projects and close their folders
    projectsNav.querySelectorAll(".project").forEach((projEl) => {
      projEl.classList.remove("selected-project");
      const icon = projEl.querySelector(".project-info i");
      if (icon) icon.classList.replace("fa-folder-open", "fa-folder-closed");
    });

    // Remove 'selected-project' from history (if it was selected)
    history.classList.remove("selected-project");

    // Apply 'selected-project' to the new current project element
    const newSelectedElement = getCurrentProjectElement();
    if (newSelectedElement) {
      newSelectedElement.classList.add("selected-project");
      // If it's a regular project (not history), open its folder icon
      if (newSelectedElement !== history) {
        const icon = newSelectedElement.querySelector(".project-info i");
        if (icon) icon.classList.replace("fa-folder-closed", "fa-folder-open");
      }
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
        id: project.getId(),
      },
      [info, tools]
    );

    return container;
  };

  const updateProjectNav = () => {
    clear(projectsNav);
    user.getProjects().forEach((project) => {
      projectsNav.appendChild(createProjectElement(project));
    });
    setCurrentProjectDisplay(); // Update display after re-rendering nav
  };

  const createTodoElement = (todo) => {
    let disableToggleCompleted = false;
    const subTodosLength = todo.getSubTodos().length;
    const elements = [];
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
    elements.push(topRow);

    const middleRowContent = [];

    if (todo.getDescription().trim()) {
      middleRowContent.push(
        createEl("p", {
          className: "description",
          textContent: todo.getDescription(),
        })
      );
    }

    const middleRow = createEl(
      "div",
      { className: "level-2-info" },
      middleRowContent
    );

    if (middleRowContent.length > 0) elements.push(middleRow);

    const bottomRowContent = [];

    if (todo.getSubTodos().length > 1) {
      bottomRowContent.push(
        createEl("div", { className: "sub-todos-counter" }, [
          createEl("i", { className: "fa-regular fa-square-plus" }),
          createEl("p", {
            className: "sub-todos-counter-text",
            textContent: subTodosLength,
          }),
        ])
      );
    }

    if (todo.getDueDate().trim()) {
      let formatedDate = "";
      let date = [...todo.getDueDate()];
      if (date[5] === "0") date.splice(5, 1);
      date = date.join("");

      const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      };

      const todoDate = new Date(date); // Create the Date object ONCE
      let dateClassName = "date-container";

      if (isToday(todoDate)) {
        formatedDate = "Today";
        dateClassName += " date-today";
      } else if (isTomorrow(todoDate)) {
        formatedDate = "Tomorrow";
        dateClassName += " date-tomorrow";
      } else if (isYesterday(todoDate)) {
        formatedDate = "Yesterday";
        dateClassName += " date-yesterday";
      } else if (isPast(todoDate) && isThisYear(todoDate)) {
        formatedDate = format(todoDate, "MMM dd");
        dateClassName += " date-past-this-year";
      } else {
        if (!isThisYear(todoDate)) {
          if (isPast(todoDate)) {
            formatedDate = format(todoDate, "MMM dd yyyy");
            dateClassName += " date-past-other-year";
          } else {
            formatedDate = format(todoDate, "MMM dd yyyy");
            dateClassName += " date-future-other-year";
          }
        } else if (isThisWeek(todoDate)) {
          formatedDate = days[getDay(todoDate)];
          dateClassName += " date-this-week";
        } else {
          formatedDate = format(todoDate, "MMM dd");
          dateClassName += " date-future-this-year";
        }
      }

      bottomRowContent.push(
        createEl("div", { className: dateClassName }, [
          createEl("i", { className: "fa-regular fa-calendar-minus" }),
          createEl("p", {
            className: "date",
            textContent: formatedDate,
          }),
        ])
      );
    }

    if (currentlyHistory) {
      bottomRowContent.push(
        createEl("div", { className: "location" }, [
          createEl("i", { className: "fa-regular fa-folder" }),
          createEl("p", {
            className: "location-title",
            textContent: user.getProject(todo.getLocation())
              ? user.getProject(todo.getLocation()).getProjectName()
              : "Deleted",
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

    let subTodosContainer = null;

    if (subTodosLength > 0) {
      const subTodos = todo.getSubTodos();
      const subTodoElements = [];

      subTodos.forEach((subTodo) => {
        subTodoElements.push(createTodoElement(subTodo));
      });

      subTodosContainer = createEl(
        "div",
        { className: "sub-todo-container" },
        subTodoElements
      );
      elements.push(subTodosContainer);
    }

    const container = createEl(
      "div",
      {
        className: "todo-container",
        id: todo.getId(),
      },
      elements
    );

    return container;
  };

  const updateProjectContent = (project) => {
    clear(content);
    const projectTitle = createEl("input", {
      className: "project-title",
      value: project.getProjectName(),
    });

    projectTitle.addEventListener("change", () => {
      if (projectTitle.value !== project.getProjectName()) {
        project.updateProjectName(projectTitle.value);
        updateProjectNav(); // Re-render nav to show new name
        saveUserData(user);
        // The display will be updated by setCurrentProjectDisplay after updateProjectNav
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
      if (!(todoContainer && todoContainer.id)) return;
      const todoId = todoContainer.id;
      const currentProjectObject = getCurrentProjectObject(); // Get the current project object
      const currentProjectId = currentProjectObject.getId();

      let todoObj = currentProjectObject.getTodo(todoId); // Try to get direct todo or sub-todo from current project

      //delete or restore
      if (deleteBtn) {
        //delete button acts like restore
        if (currentlyHistory) {
          dialogCont.dialogRestore(todoId);
          dialogSecondary.showModal();
        } else {
          dialogCont.dialogDelete(todoId);
          dialog.showModal();
          dialog.addEventListener("close", () => {
            updateProjectContent(currentProjectObject);
          });
        }
        return;
      }
      //mark as completed
      if (toggleBtn) {
        if (currentlyHistory) return;
        user.addToHistory(todoObj);
        user.deleteTodo(todoId);
        saveUserData(user);
        updateProjectContent(currentProjectObject);
        return;
      }
      //expand
      if (todoContainer) {
        dialogCont.dialogExpandTodo(todoObj); // Use the already found todoObj
        dialog.showModal();
        //adjusts the size of the description for stetic purposes
        autoResize(dialog.querySelector("#description"));
        dialog.addEventListener("close", () => {
          updateProjectContent(getCurrentProjectObject());
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
        user.updateCurrentProjectId(
          user.getProjects()[user.getProjects().length - 1].getId()
        ); // Select the newly added project
        setCurrentProjectDisplay();
        updateProjectContent(getCurrentProjectObject());
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
        updateProjectContent(getCurrentProjectObject());
      },
      { once: true }
    );
  });

  projectsNav.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".project-delete");
    const clickedProject = e.target.closest(".project"); // This is the DOM element

    if (deleteBtn) {
      dialogCont.dialogDeleteProject(clickedProject.id);
      dialog.showModal();
      dialog.addEventListener("close", () => {
        if (dialog.returnValue === "cancel") {
          // Do nothing or re-select previous project if it was deleted
        } else {
          updateProjectNav(); // Re-render nav first
          // After deletion, select the first project if the current one was deleted
          if (user.getCurrentProjectId() === clickedProject.id) {
            user.updateCurrentProjectId(user.getProjects()[0].getId());
          }
          setCurrentProjectDisplay(); // Update visual selection
          updateProjectContent(getCurrentProjectObject()); // Load content for the newly selected project
        }
      });
    } else {
      if (!clickedProject) return;
      currentlyHistory = false; // Ensure history mode is off

      // Update the central state
      user.updateCurrentProjectId(clickedProject.id);
      // Update the display based on the central state
      setCurrentProjectDisplay();
      // Load the content for the selected project
      updateProjectContent(getCurrentProjectObject());
    }
  });

  history.addEventListener("click", () => {
    currentlyHistory = true; // Enter history mode
    user.updateCurrentProjectId(user.getHistory().getId()); // Set history ID as current in user model
    setCurrentProjectDisplay(); // Update visual selection to history
    updateProjectContent(user.getHistory()); // Load history content
  });

  username.addEventListener("change", () => {
    if (username.value !== user.userName()) {
      user.newUserName(username.value);
      saveUserData(user);
    }
  });

  // ----------- App Load -----------
  // Initialize current project based on user's model
  // If no project is currently selected in user model, select the first one
  if (!user.getCurrentProjectId()) {
    user.updateCurrentProjectId(user.getProjects()[0].getId());
  }
  if (user.userName() !== "") {
    username.value = user.userName();
  }
  updateProjectNav(); // Render project navigation initially
  setCurrentProjectDisplay(); // Set the visual selection based on currentProjectId
  updateProjectContent(getCurrentProjectObject()); // Load content for the initial selected project
}
