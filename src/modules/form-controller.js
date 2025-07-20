import { createEl, autoResize, closeDialog } from "./dom-tools.js";
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

    //option selection for all avaiable projects
    const projects = [];

    avaiableProjects.forEach((project) => {
      const projectOption = createEl("option", {
        textContent: project.getProjectName(),
      });
      projectOption.dataset.id = project.getId();

      projects.push(projectOption);
    });
    //set first option to the current project
    const indexCurrentProject = projects.findIndex(project=>project.dataset.id === location);
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
        className : `select-priority-${priority}`,
      });

      priorities.push(priorityOption);
    });
    //set first option to the current priority
    const indexCurrentPriority = priorities.findIndex(priority=>priority.textContent === todoPriority);
    const currentPriority = priorities[indexCurrentPriority];
    priorities.splice(indexCurrentPriority, 1);
    priorities.unshift(currentPriority);

    const prioritySelect = createEl(
      "select",
      {
        className: "priority-select",
        id: "priority-select",
      },
      priorities,
    );

    const level2 = createEl("fieldset", { className: "form-level-2" }, [
      dateInput,
      prioritySelect,
    ]);

    const formTop = createEl("div", { className: "form-top" }, [
      level1,
      level2,
    ]);

    const closeBtn = createEl("input", {
      type: "submit",
      id: "dialog-close",
      value: "Close",
      formNoValidate: true,
      autofocus: true,
    });

    const submitBtn = createEl("input", {
      type: "submit",
      className: "hidden",
      id: "form-add-todo",
      value: "Update",
      disabled: true,
      autofocus: true,
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

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      closeDialog();
    });

    return form;
  };

  const formDelete = (todoId, projectId) => {
    const warningIcon = createEl("i", {className : "fa-solid fa-circle-exclamation"});
    const header = createEl("h1", {textContent : "Are you sure?"});
    const subheader = createEl("h2", {textContent : "If you forget it, it’s not on the list anymore."});
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

    const form = createEl("form", {id : "form", className : "form-confirm"}, [
      warningIcon,
      header,
      subheader,
      formActions,
    ]);

    closeBtn.addEventListener("click", () => {
      console.log("NOT DELETE")
      closeDialog();
      return;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      user.deleteFromProject(todoId, projectId);
      console.log("YES DELETE")
      closeDialog();
    });

    return form;
  };

  return {
    formAddNewTodo,
    formAddNewProject,
    formExpandTodo,
    formDelete,
  };
}
