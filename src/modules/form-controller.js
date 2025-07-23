import { createEl, autoResize, closeDialog, clear } from "./dom-tools.js";
import { user } from "../index.js";

export function createForm() {
  ///Form for new to dos
  const formAddNewTodo = () => {
    //Form components
    //option selection for all avaiable projects
    const avaiableProjects = user.getProjects();
    const projects = [];

    avaiableProjects.forEach((project) => {
      const projectOption = createEl("option", {
        textContent: project.getProjectName(),
      });
      projectOption.dataset.id = project.getId();

      projects.push(projectOption);
    });

    const titleInput = createEl("input", {
      id: "title",
      type: "text",
      placeholder: "Wash the dog, it stinks...",
      required: true,
      autofocus: true,
    });

    const textArea = createEl("textarea", {
      id: "description",
      rows: "1",
      placeholder: "Description",
    });

    const dateInput = createEl("input", {
      type: "date",
      id: "date",
    });

    const prioritySelect = createEl(
      "select",
      { className: "priority-select", id: "priority-select" },
      [
        createEl("option", {
          className: "select-priority-low",
          textContent: "Low",
        }),
        createEl("option", {
          className: "select-priority-medium",
          textContent: "Medium",
        }),
        createEl("option", {
          className: "select-priority-high",
          textContent: "High",
        }),
      ]
    );

    const closeBtn = createEl("button", {
      type: "button",
      id: "dialog-close",
      value: "Close",
      formNoValidate: true,
      textContent: "Close",
    });

    closeBtn.addEventListener("click", () => {
      closeDialog();
      return;
    });

    const addBtn = createEl("input", {
      type: "submit",
      id: "form-add-todo",
      value: "Add ToDo",
    });

    const projectSelect = createEl(
      "select",
      { className: "project-select", id: "project-select" },
      projects
    );

    // Final form element
    const form = createEl("form", { id: "form" }, [
      createEl("div", { className: "form-top" }, [
        createEl("fieldset", { className: "form-level-1" }, [
          titleInput,
          textArea,
        ]),
        createEl("fieldset", { className: "form-level-2" }, [
          dateInput,
          prioritySelect,
        ]),
      ]),
      createEl("div", { className: "form-bottom" }, [
        createEl("div", { className: "form-actions" }, [closeBtn, addBtn]),
        projectSelect,
      ]),
    ]);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputTitle = form.querySelector("#title");
      const inputDescription = form.querySelector("#description");
      const inputDate = form.querySelector("#date");
      const selectPriority = form.querySelector("#priority-select");
      const selectProject = form.querySelector("#project-select");
      const projectId = selectProject.selectedOptions[0].dataset.id;

      if (inputTitle.value.trim() === "") {
        alert("Please do not leave the title empty :)");
        return;
      }

      const newTodo = user.newTodo(
        inputTitle.value,
        inputDescription.value,
        inputDate.value,
        selectPriority.value.toLowerCase(),
        projectId
      );

      user.getProject(projectId).addTodo(newTodo);
      dialog.close();
    });

    textArea.addEventListener("input", () => autoResize(textArea));

    return form;
  };
  //Form for new projects
  const formAddNewProject = () => {
    //Form elements
    const titleInput = createEl("input", {
      id: "title",
      type: "text",
      placeholder: "Shopping List",
      required: true,
      autofocus: true,
    });

    const closeButton = createEl("button", {
      type: "button",
      id: "dialog-close",
      value: "Close",
      formNoValidate: true,
      textContent: "Close",
    });

    const addButton = createEl("input", {
      type: "submit",
      id: "form-add-todo",
      value: "Add New",
    });

    // Final form
    const form = createEl("form", { id: "form" }, [
      createEl("div", { className: "form-top" }, [
        createEl("fieldset", { className: "form-level-1" }, [titleInput]),
      ]),
      createEl("div", { className: "form-bottom" }, [
        createEl("div", { className: "form-actions" }, [
          closeButton,
          addButton,
        ]),
      ]),
    ]);

    closeButton.addEventListener("click", () => {
      closeDialog();
      return;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newProjectName = document.getElementById("title").value;
      user.newProject(newProjectName);

      closeDialog();
    });

    return form;
  };
  const formExpandTodo = (todo) => {
    const title = todo.getTitle();
    const description = todo.getDescription();
    const date = todo.getDueDate();
    const todoPriority = todo.getPriority();
    const id = todo.getId();
    const location = todo.getLocation();
    const avaiableProjects = user.getProjects();
    const dialogDiscard = document.getElementById("dialog-level-2");

    //option selection for all avaiable projects
    const projects = [];

    avaiableProjects.forEach((project) => {
      const projectOption = createEl("option", {
        textContent: project.getProjectName(),
      });
      projectOption.dataset.id = project.getId();
      projectOption.value = project.getId();

      projects.push(projectOption);
    });
    //set first option to the current project
    const indexCurrentProject = projects.findIndex(
      (project) => project.dataset.id === location
    );
    const currentProject = projects[indexCurrentProject];
    projects.splice(indexCurrentProject, 1);
    projects.unshift(currentProject);

    const titleInput = createEl("input", {
      id: "title",
      type: "text",
      value: title,
      placeholder: "Wash the dog, it stinks...",
      required: true,
    });

    const descriptionArea = createEl("textarea", {
      id: "description",
      textContent: description,
      rows: "1",
      placeholder: "Description",
    });
    autoResize(descriptionArea);
    descriptionArea.addEventListener("input", () =>
      autoResize(descriptionArea)
    );

    const level1 = createEl("fieldset", { className: "form-level-1" }, [
      titleInput,
      descriptionArea,
    ]);

    const dateInput = createEl("input", {
      type: "date",
      id: "date",
      value: date,
    });

    //option selection for all avaiable priorities
    const priorities = [];
    const avaiablePriorities = ["low", "medium", "high"];

    avaiablePriorities.forEach((priority) => {
      const priorityOption = createEl("option", {
        textContent: priority,
        className: `select-priority-${priority}`,
      });

      priorities.push(priorityOption);
    });
    //set first option to the current priority
    const indexCurrentPriority = priorities.findIndex(
      (priority) => priority.textContent === todoPriority
    );
    const currentPriority = priorities[indexCurrentPriority];
    priorities.splice(indexCurrentPriority, 1);
    priorities.unshift(currentPriority);

    const prioritySelect = createEl(
      "select",
      {
        className: "priority-select",
        id: "priority-select",
      },
      priorities
    );

    const level2 = createEl("fieldset", { className: "form-level-2" }, [
      dateInput,
      prioritySelect,
    ]);

    const formTop = createEl("div", { className: "form-top" }, [
      level1,
      level2,
    ]);

    const closeBtn = createEl("button", {
      id: "dialog-close",
      textContent: "Close",
      autofocus: true,
    });

    const submitBtn = createEl("input", {
      type: "submit",
      className: "hidden",
      id: "form-add-todo",
      value: "Update",
      disabled: true,
    });

    const formActions = createEl("div", { className: "form-actions" }, [
      closeBtn,
      submitBtn,
    ]);

    const projectSelect = createEl(
      "select",
      {
        className: "project-select",
        id: "project-select",
      },
      projects
    );

    const formBottom = createEl("div", { className: "form-bottom" }, [
      formActions,
      projectSelect,
    ]);

    const form = createEl(
      "form",
      {
        id: "form",
      },
      [formTop, formBottom]
    );

    form.dataset.id = id;

    //check for changes
    const enableSubmit = () => {
      submitBtn.disabled = false;
      submitBtn.classList.remove("hidden");
    };
    let editing = false;
    form.addEventListener("input", () => {
      enableSubmit();
      editing = true;
    });
    form.addEventListener("change", () => {
      editing = true;
    });

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (editing) {
        clear(dialogDiscard);
        dialogDiscard.appendChild(formDiscard());
        dialogDiscard.showModal();
      } else {
        console.log("close main");
        closeDialog();
      }
    });

    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const newTitle = titleInput.value;
      const newDescription = descriptionArea.value;
      const newDate = dateInput.value;
      const newPriority = prioritySelect.value;
      const newLocation = projectSelect.value;

      if (title !== newTitle) todo.updateTitle(newTitle);
      if (description !== newDescription)
        todo.updateDescription(newDescription);
      if (date !== newDate) todo.updateDueDate(newDate);
      if (todoPriority !== newPriority) todo.updatePriority(newPriority);
      if (location !== newLocation) {
        todo.updateLocation(newLocation);
        user.addToProject(todo, newLocation);
        user.deleteFromProject(id, location);
      }

      closeDialog();
    });

    return form;
  };

  const formDiscard = () => {
    const dialogDiscard = document.getElementById("dialog-level-2");
    const warningIcon = createEl("i", {
      className: "fa-solid fa-circle-exclamation",
    });
    const header = createEl("h1", { textContent: "Discard changes?" });
    const subheader = createEl("h2", {
      textContent: "The unsaved changes will be discarted",
    });
    const closeBtn = createEl("button", {
      type: "button",
      id: "dialog-close",
      value: "Close",
      textContent: "Go Back",
    });
    const submitBtn = createEl("input", {
      type: "submit",
      id: "form-add-todo",
      value: "Discard",
    });
    const formActions = createEl("div", { className: "form-actions" }, [
      closeBtn,
      submitBtn,
    ]);

    const formD = createEl("form", { id: "formd", className: "form-confirm" }, [
      warningIcon,
      header,
      subheader,
      formActions,
    ]);

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialogDiscard.close();
      console.log("close second");
      return;
    });

    formD.addEventListener("submit", (e) => {
      e.preventDefault();
      closeDialog();
      dialogDiscard.close();
    });

    return formD;
  };

  const formDelete = (todoId, projectId) => {
    const warningIcon = createEl("i", {
      className: "fa-solid fa-circle-exclamation",
    });
    const header = createEl("h1", { textContent: "Are you sure?" });
    const subheader = createEl("h2", {
      textContent: "If you forget it, it’s not on the list anymore.",
    });
    const closeBtn = createEl("button", {
      type: "button",
      id: "dialog-close",
      value: "Close",
      formNoValidate: true,
      textContent: "Go Back",
    });
    const submitBtn = createEl("input", {
      type: "submit",
      id: "form-add-todo",
      value: "Delete",
    });
    const formActions = createEl("div", { className: "form-actions" }, [
      closeBtn,
      submitBtn,
    ]);

    const form = createEl("form", { id: "form", className: "form-confirm" }, [
      warningIcon,
      header,
      subheader,
      formActions,
    ]);

    closeBtn.addEventListener("click", () => {
      closeDialog();
      return;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      user.deleteFromProject(todoId, projectId);
      closeDialog();
    });

    return form;
  };

  const formRestore = (todo) => {
    const dialogSecondary = document.getElementById("dialog-level-2");
    const warningIcon = createEl("i", {
      className: "fa-regular fa-circle-check",
    });
    const header = createEl("h1", { textContent: "Want to bring it back?" });
    const subheader = createEl("h2", {
      textContent: "We’ll add a fresh copy of this to-do.",
    });
    const closeBtn = createEl("button", {
      type: "button",
      id: "dialog-close",
      value: "Close",
      formNoValidate: true,
      textContent: "Go Back",
    });
    const submitBtn = createEl("input", {
      type: "submit",
      id: "form-add-todo",
      value: "Restore",
    });
    const formActions = createEl("div", { className: "form-actions" }, [
      closeBtn,
      submitBtn,
    ]);

    const form = createEl("form", { id: "form", className: "form-confirm" }, [
      warningIcon,
      header,
      subheader,
      formActions,
    ]);

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialogSecondary.close();
      return;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const copyTodo = user.newTodo(
        todo.getTitle(),
        todo.getDescription(),
        todo.getDueDate(),
        todo.getPriority(),
        user.getProject(todo.getLocation())? todo.getLocation() : user.getProjects()[0].getId(),
      );
      user.addToProject(copyTodo, copyTodo.getLocation());
      dialogSecondary.close();
    });

    return form;
  };

  const formDeleteProject = (projectId) => {
    const warningIcon = createEl("i", {
      className: "fa-solid fa-circle-exclamation",
    });
    const header = createEl("h1", { textContent: "Delete project?" });
    const subheader = createEl("h2", {
      textContent:
        "Are you sure you want to delete this entire project?",
    });
    const closeBtn = createEl("button", {
      type: "button",
      id: "dialog-close",
      value: "Close",
      formNoValidate: true,
      textContent: "Go Back",
    });
    const submitBtn = createEl("input", {
      type: "submit",
      id: "form-add-todo",
      value: "Delete",
    });
    const formActions = createEl("div", { className: "form-actions" }, [
      closeBtn,
      submitBtn,
    ]);

    const form = createEl("form", { id: "form", className: "form-confirm" }, [
      warningIcon,
      header,
      subheader,
      formActions,
    ]);

    closeBtn.addEventListener("click", () => {
      dialog.close("cancel");
      return;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (user.getProjects().length === 1) {
        user.newProject("Things ToDo");
        user.deleteProject(projectId);
      } else {
        user.deleteProject(projectId);
      }

      dialog.close("");
    });

    return form;
  };

  return {
    formAddNewTodo,
    formAddNewProject,
    formExpandTodo,
    formDelete,
    formDiscard,
    formRestore,
    formDeleteProject,
  };
}
