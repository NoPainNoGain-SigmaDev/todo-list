import { createEl, autoResize, closeDialog } from "./dom-tools";
import {user} from "../index.js";

export function createForm() {
    ///Form for new to dos
  const formAddNewTodo = () => {
    //Form components
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
        createEl("option", { value: "default", textContent: "Priority" }),
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

    const closeBtn = createEl("input", {
      type: "submit",
      id: "dialog-close",
      value: "Close",
      formNoValidate: true,
    });

    const addBtn = createEl("input", {
      type: "submit",
      id: "form-add-todo",
      value: "Add ToDo",
    });

    const projectSelect = createEl(
      "select",
      { className: "project-select", id: "project-select" },
      [
        createEl("option", {
          value: "default",
          textContent: "Things ToDo",
        }),
        createEl("option", { textContent: "Low" }),
        createEl("option", { textContent: "Medium" }),
        createEl("option", { textContent: "High" }),
      ]
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
      dialog.close();
      dialog.innerHTML = "";
      console.log("close");
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
      textContent: "Close"
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

    closeButton.addEventListener("click", ()=>{
        closeDialog();
        return;
    });


    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newProjectName = document.getElementById("title").value;
      user.newProject(newProjectName);

      closeDialog();

      user.self();

    });

    return form;
  };
  const formExpandTodo = (todo, avaiableProjects) => {
    const title = todo.getTitle();
    const description = todo.getDescription();
    const date = todo.getDueDate();
    const priority = todo.getPriority();
    const id = todo.getId();

    const projects = [];

    avaiableProjects.forEach((project) => {
      const projectOption = createEl("option", {
        textContent: project.getTitle(),
      });

      project.push(projectOption);
    });

    const form = createEl("form", { id: "form", dataSet: { todoId: id } }, [
      createEl("div", { className: "form-top" }, [
        createEl("fieldset", { className: "form-level-1" }, [
          createEl("input", {
            id: "title",
            type: "text",
            value: title,
            placeholder: "Wash the dog, it stinks...",
            required: true,
          }),
          createEl("textarea", {
            id: "description",
            textContent: description,
            rows: "1",
            placeholder: "Description",
          }),
        ]),
        createEl("fieldset", { className: "form-level-2" }, [
          createEl("input", { type: "date", id: "date", value: date }),
          createEl(
            "select",
            { className: "priority-select", id: "priority-select" },
            [
              createEl("option", { value: "default", textContent: priority }),
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
          ),
        ]),
      ]),
      createEl("div", { className: "form-bottom" }, [
        createEl("div", { className: "form-actions" }, [
          createEl("input", {
            type: "submit",
            id: "dialog-close",
            value: "Close",
            formNoValidate: true,
            autofocus: true,
          }),
          createEl("input", {
            type: "submit",
            className: "hidden",
            id: "form-add-todo",
            value: "Update",
            disabled: true,
            autofocus: true,
          }),
        ]),
        createEl(
          "select",
          { className: "project-select", id: "project-select" },
          projects
        ),
      ]),
    ]);

    return form;
  };

  return {
    formAddNewTodo,
    formAddNewProject,
    formExpandTodo,
  };
}
