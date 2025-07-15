import { createEl } from "./dom-tools";

export function createForm() {
  const formAddNewTodo = () => {
    const form = createEl("form", { id: "form" }, [
      createEl("div", { className: "form-top" }, [
        createEl("fieldset", { className: "form-level-1" }, [
          createEl("input", {
            id: "title",
            type: "text",
            placeholder: "Wash the dog, it stinks...",
            required: true,
          }),
          createEl("textarea", {
            id: "description",
            rows: "1",
            placeholder: "Description",
          }),
        ]),
        createEl("fieldset", { className: "form-level-2" }, [
          createEl("input", { type: "date", id: "date" }),
          createEl(
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
          }),
          createEl("input", {
            type: "submit",
            id: "form-add-todo",
            value: "Add ToDo",
            autofocus: true,
          }),
        ]),
        createEl(
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
        ),
      ]),
    ]);

    return form;
  };
  const formAddNewProject = () => {
    const form = createEl("form", { id: "form" }, [
      createEl("div", { className: "form-top" }, [
        createEl("fieldset", { className: "form-level-1" }, [
          createEl("input", {
            id: "title",
            type: "text",
            placeholder: "Shopping List",
            required: true,
          }),
        ]),
      ]),
      createEl("div", { className: "form-bottom" }, [
        createEl("div", { className: "form-actions" }, [
          createEl("input", {
            type: "submit",
            id: "dialog-close",
            value: "Close",
            formNoValidate: true,
          }),
          createEl("input", {
            type: "submit",
            id: "form-add-todo",
            value: "Add New",
            autofocus: true,
          }),
        ]),
      ]),
    ]);

    return form;
  };
  const formExpandTodo = (todo, avaiableProjects) => {
    const title = todo.getTitle();
    const description = todo.getDescription();
    const date = todo.getDueDate();
    const priority = todo.getPriority();
    const id = todo.getId();
    
    const projects = [];

    avaiableProjects.forEach(project => {
        const projectOption = createEl(
            "option",
            {
                textContent : project.getTitle(),
            }
        );

        project.push(projectOption);
    });


    const form = createEl("form", { id: "form", dataSet : {todoId : id}  }, [
      createEl("div", { className: "form-top" }, [
        createEl("fieldset", { className: "form-level-1" }, [
          createEl("input", {
            id: "title",
            type: "text",
            value : title,
            placeholder: "Wash the dog, it stinks...",
            required: true,
          }),
          createEl("textarea", {
            id: "description",
            textContent : description,
            rows : "1",
            placeholder: "Description",
          }),
        ]),
        createEl("fieldset", { className: "form-level-2" }, [
          createEl("input", { type: "date", id: "date", value : date,}),
          createEl(
            "select",
            { className: "priority-select", id: "priority-select" },
            [
              createEl("option", { value: "default", textContent: priority, }),
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
            className : "hidden",
            id: "form-add-todo",
            value: "Update",
            disabled : true,
            autofocus: true,
          }),
        ]),
        createEl(
          "select",
          { className: "project-select", id: "project-select" },
          projects,
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
