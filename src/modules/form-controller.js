import { createEl, autoResize, closeDialog, clear } from "./dom-tools.js";
import { user } from "../index.js"; // user must have newTodo, getProjects, getProject, etc.

export function createForm() {
  const dialog = document.getElementById("dialog"); // Main dialog
  const dialogSecondary = document.getElementById("dialog-level-2"); // Secondary dialog (for discard/confirm)

  // --- Helper for creating common form elements ---
  const createCloseButton = (dialogToClose) => {
    const btn = createEl("button", {
      type: "button",
      id: "dialog-close",
      value: "Close",
      formNoValidate: true,
      textContent: "Close",
    });
    btn.addEventListener("click", () => {
      // Use the specific dialog to close
      if (dialogToClose) {
        dialogToClose.close();
      } else {
        closeDialog(); // Fallback to global closeDialog if no specific dialog provided
      }
    });
    return btn;
  };

  const createSubmitButton = (id, value) => {
    return createEl("input", {
      type: "submit",
      id: id,
      value: value,
    });
  };

  const createPrioritySelect = (currentPriority = "") => {
    const priorities = ["low", "medium", "high"];
    const options = priorities.map((priority) => {
      const option = createEl("option", {
        textContent: priority,
        className: `select-priority-${priority}`,
        value: priority, // Set value for easy retrieval
      });
      if (priority === currentPriority) {
        option.selected = true; // Pre-select current priority
      }
      return option;
    });

    return createEl(
      "select",
      { className: "priority-select", id: "priority-select" },
      options
    );
  };

  const createProjectSelect = (currentProjectId = null) => {
    const projects = user.getProjects();
    const options = projects.map((project) => {
      const option = createEl("option", {
        textContent: project.getProjectName(),
        value: project.getId(), // Set value for easy retrieval
      });
      if (project.getId() === currentProjectId) {
        option.selected = true; // Pre-select current project
      }
      return option;
    });

    return createEl(
      "select",
      { className: "project-select", id: "project-select" },
      options
    );
  };


  // --- Reusable Todo Element Creation (moved from screenController for expand form) ---
  // If this is already an exported function, just use it directly.
  // Otherwise, defining it here makes it available to formExpandTodo.
  const createTodoElement = (todo) => { // This is a slightly simplified version for display in forms
    const elements = [];
    const priorityBtn = createEl(
      "button",
      {
        className: `toggle-completed priority-${todo.getPriority()}`,
        disabled: true, // Typically disabled in expand form as it's for viewing
      },
      [createEl("i", { className: "fa-solid fa-check hidden" })]
    );

    const title = createEl("p", {
      className: "todo-title",
      textContent: todo.getTitle(),
    });

    // We don't need a delete button here as form actions are at the bottom
    const topRow = createEl("div", { className: "level-1-info" }, [
      priorityBtn,
      title,
    ]);
    elements.push(topRow);

    if (todo.getDescription().trim()) {
      elements.push(
        createEl("p", {
          className: "description",
          textContent: todo.getDescription(),
        })
      );
    }
    
    // Recursive rendering of sub-todos for display within the expand form
    if (todo.getSubTodos().length > 0) {
      const subTodoElements = todo.getSubTodos().map(subTodo => createTodoElement(subTodo));
      elements.push(createEl("div", { className: "sub-todo-container" }, subTodoElements));
    }


    const container = createEl(
      "div",
      {
        className: "todo-container",
        id : todo.getId(),
      },
      elements
    );

    return container;
  };


  ///Form for new todos (and sub-todos)
  const formAddNewTodo = (parentTodoId = null, defaultLocationId = user.getCurrentProjectId()) => {
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

    const prioritySelect = createPrioritySelect("medium"); // Default medium

    const closeBtn = createCloseButton(dialog);
    const addBtn = createSubmitButton("form-add-todo-submit", "Add ToDo");

    const projectSelect = createProjectSelect(defaultLocationId);
    // If we're adding a sub-todo, hide the project selection
    if (parentTodoId) {
        projectSelect.classList.add("hidden"); // or set display: none directly
        projectSelect.disabled = true;
    }


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
        projectSelect, // Visible only for top-level todos
      ]),
    ]);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newTitle = titleInput.value.trim();
      if (!newTitle) {
        alert("Please do not leave the title empty :)");
        return;
      }

      const newDescription = textArea.value;
      const newDate = dateInput.value;
      const newPriority = prioritySelect.value;
      
      // Determine the location and parent based on whether it's a sub-todo or new top-level todo
      let todoLocationId = defaultLocationId;
      let todoParentId = parentTodoId;

      if (!parentTodoId) { // It's a top-level todo being added to a project
          todoLocationId = projectSelect.value;
          todoParentId = null;
      }
      
      const newTodo = user.newTodo(
        newTitle,
        newDescription,
        newDate,
        newPriority,
        todoLocationId, // location: project ID
        todoParentId    // parent: parent todo ID (or null)
      );

      if (todoParentId) {
          // If it's a sub-todo, add it to its parent todo
          const parentObj = user.getProject(todoLocationId).getTodo(todoParentId); // Assuming getTodo is recursive
          if (parentObj) {
              parentObj.addSubTodo(newTodo);
          } else {
              console.error("Parent todo not found for sub-todo creation:", todoParentId);
              // Handle error, maybe add to project root if parent not found
              user.getProject(todoLocationId).addTodo(newTodo);
          }
      } else {
          // It's a top-level todo, add to the selected project
          user.getProject(todoLocationId).addTodo(newTodo);
      }
      dialog.close("submit"); // Pass a return value to indicate successful submission
    });

    textArea.addEventListener("input", () => autoResize(textArea));

    return form;
  };

  //Form for new projects
  const formAddNewProject = () => {
    const titleInput = createEl("input", {
      id: "title",
      type: "text",
      placeholder: "Shopping List",
      required: true,
      autofocus: true,
    });

    const closeButton = createCloseButton(dialog);
    const addButton = createSubmitButton("form-add-project-submit", "Add New");

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

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newProjectName = titleInput.value.trim();
      if (!newProjectName) {
        alert("Please enter a project name.");
        return;
      }
      user.newProject(newProjectName);
      dialog.close("submit");
    });

    return form;
  };


  const formExpandTodo = (todo) => {
    // --- Data Extraction ---
    const { getTitle, getDescription, getDueDate, getPriority, getId, getLocation, getSubTodos, getParent } = todo;
    const currentTitle = getTitle();
    const currentDescription = getDescription();
    const currentDueDate = getDueDate();
    const currentPriority = getPriority();
    const todoId = getId();
    const todoLocation = getLocation();
    const todoParentId = getParent(); // New: get parent ID

    // --- Form Fields ---
    const titleInput = createEl("input", {
      id: "title",
      type: "text",
      value: currentTitle,
      placeholder: "Wash the dog, it stinks...",
      required: true,
    });

    const descriptionArea = createEl("textarea", {
      id: "description",
      textContent: currentDescription,
      rows: "1",
      placeholder: "Description",
    });
    autoResize(descriptionArea);
    descriptionArea.addEventListener("input", () =>
      autoResize(descriptionArea)
    );

    const dateInput = createEl("input", {
      type: "date",
      id: "date",
      value: currentDueDate,
    });

    const prioritySelect = createPrioritySelect(currentPriority);
    const projectSelect = createProjectSelect(todoLocation);

    // If this todo has a parent, hide project selection and show parent todo selection (or just hide it)
    let parentTodoSelect = null;
    if (todoParentId) {
        projectSelect.disabled = true; // Cannot change project if it's a sub-todo
        projectSelect.classList.add("hidden"); // Or hide visually

        // Optional: Add a display for the parent todo's title if desired
        // You might need a user.getTodo(todoParentId) to get the parent's title
        const parentObj = user.getProject(todoLocation).getTodo(todoParentId); // Assuming getTodo is recursive
        if (parentObj) {
            parentTodoSelect = createEl("p", {
                className: "parent-todo-display",
                textContent: `Sub-todo of: ${parentObj.getTitle()}`
            });
        }
    }


    // --- Sub-todo Section ---
    const subTodosElements = getSubTodos().map(subTodo => createTodoElement(subTodo));
    const subTodosContainer = createEl("div", { className: "sub-todos-list-container" }, subTodosElements);

    // Add new sub-todo button
    const addNewSubTodoBtn = createEl("button", {
        type: "button",
        className: "add-new-sub-todo-btn hover-effect",
    }, [
      createEl("i", {className : "fa-solid fa-circle-plus"}),
      createEl("p", {textContent : "Add Sub-Todo"}),
    ]);
    addNewSubTodoBtn.addEventListener("click", () => {
        clear(dialog); // Clear main dialog content
        dialog.appendChild(formAddNewTodo(todoId, todoLocation)); // Pass current todoId as parentId, and its location
        dialog.showModal();
    });

    // --- Form Layout ---
    const level1 = createEl("fieldset", { className: "form-level-1" }, [
      titleInput,
      descriptionArea,
    ]);

    const level2 = createEl("fieldset", { className: "form-level-2" }, [
        dateInput,
        prioritySelect,
        projectSelect,
        parentTodoSelect || createEl("div"), // Render parent info or empty div
    ]);


    // Combined sub-todos section (list + add button)
    const subTodosSection = createEl("div", {className: "form-sub-todos-section"}, [
        createEl("h3", {textContent: "Sub-todos"}),
        subTodosContainer,
        addNewSubTodoBtn,
    ]);


    const formTop = createEl("div", { className: "form-top" }, [
      level1,
      level2,
      subTodosSection, // Include the sub-todos section here
    ]);

    const closeBtn = createCloseButton(dialog);
    closeBtn.textContent = "Close"; // Override text for this form
    closeBtn.autofocus = true;

    const submitBtn = createSubmitButton("form-update-todo-submit", "Update");
    submitBtn.disabled = true;
    submitBtn.classList.add("hidden");


    const formActions = createEl("div", { className: "form-actions" }, [
      closeBtn,
      submitBtn,
    ]);

    const form = createEl(
      "form",
      {
        id: "form",
      },
      [formTop, formActions] // Simplified formBottom as elements are restructured
    );

    form.dataset.id = todoId;

    // --- Change Detection & Submit Button Enablement ---
    let editing = false;
    const checkChanges = () => {
        const hasChanges = (
            titleInput.value !== currentTitle ||
            descriptionArea.value !== currentDescription ||
            dateInput.value !== currentDueDate ||
            prioritySelect.value !== currentPriority ||
            (projectSelect.value !== todoLocation && !projectSelect.disabled)
        );
        editing = hasChanges;
        if (hasChanges) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("hidden");
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add("hidden");
        }
    };
    form.addEventListener("input", checkChanges);
    form.addEventListener("change", checkChanges);


    closeBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default form submission if any
      if (editing) {
        clear(dialogSecondary); // Use dialogSecondary for discard confirmation
        dialogSecondary.appendChild(formDiscard());
        dialogSecondary.showModal();
      } else {
        closeDialog(); // Close main dialog directly
      }
    });

    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const newTitle = titleInput.value.trim();
      const newDescription = descriptionArea.value;
      const newDate = dateInput.value;
      const newPriority = prioritySelect.value;
      const newLocation = projectSelect.value; // Only if not disabled (i.e., not a sub-todo)

      if (!newTitle) {
        alert("Title cannot be empty!");
        return;
      }

      // Update basic properties
      if (currentTitle !== newTitle) todo.updateTitle(newTitle);
      if (currentDescription !== newDescription) todo.updateDescription(newDescription);
      if (currentDueDate !== newDate) todo.updateDueDate(newDate);
      if (currentPriority !== newPriority) todo.updatePriority(newPriority);

      // Handle location change (only if it's a top-level todo or a project change is allowed for sub-todos)
      if (todoLocation !== newLocation && !projectSelect.disabled) {
        // This logic is complex. Ideally, you have a user.moveTodo() method.
        // user.moveTodo(todoId, todoLocation, newLocation, todoParentId);
        //
        // If not, the current approach of copying and deleting is okay but needs to be careful
        // about sub-todos and ensuring all properties are transferred.
        // The current way you're handling subTodos in your original logic (todo.getSubTodos().forEach(subTodo=>subTodo.updateLocation(newLocation));)
        // is okay if you're keeping the same object references.
        // However, if creating a 'copyTodo' means a *new* object graph, then those subTodos
        // need to be *cloned* and re-parented as well. This is why a `moveTodo` in the user model is best.

        // Placeholder for move logic assuming user.moveTodo is implemented
        // user.moveTodo(todoId, todoLocation, newLocation); // Or pass full todo object
        // If not using moveTodo, original logic:
        user.deleteTodo(todoId); // Delete from old project
        // Create a new todo object with the updated location, carrying over all properties and sub-todos
        // This requires your newTodo function to accept subTodos array directly for copying
        const copyTodo = user.newTodo(
            newTitle, // Use potentially updated title
            newDescription, // Use potentially updated description
            newDate, // Use potentially updated date
            newPriority, // Use potentially updated priority
            newLocation, // New location
            todoParentId, // Original parent ID
            getSubTodos() // Pass existing sub-todos
        );
        // Need to add this copyTodo to the new project
        user.addToProject(copyTodo, newLocation); // Add to new project

        // If it was a sub-todo that moved, its parent's subTodos array also needs to be updated.
        // This complexity is why user.moveTodo is a good idea.
      }
      dialog.close("update"); // Indicate successful update
    });

    return form;
  };

  const formDiscard = () => {
    // This form is for the dialogSecondary
    const warningIcon = createEl("i", {
      className: "fa-solid fa-circle-exclamation",
    });
    const header = createEl("h1", { textContent: "Discard changes?" });
    const subheader = createEl("h2", {
      textContent: "The unsaved changes will be discarded.",
    });
    const closeBtn = createCloseButton(dialogSecondary); // Closes secondary dialog
    closeBtn.textContent = "Go Back";

    const submitBtn = createSubmitButton("form-discard-submit", "Discard");

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

    formD.addEventListener("submit", (e) => {
      e.preventDefault();
      dialogSecondary.close(); // Close secondary dialog
      closeDialog(); // Then close the main dialog
    });

    return formD;
  };

  const formDelete = (todoId) => {
    const warningIcon = createEl("i", {
      className: "fa-solid fa-circle-exclamation",
    });
    const header = createEl("h1", { textContent: "Are you sure?" });
    const subheader = createEl("h2", {
      textContent: "If you forget it, it’s not on the list anymore.",
    });
    const closeBtn = createCloseButton(dialog);
    closeBtn.textContent = "Go Back";

    const submitBtn = createSubmitButton("form-delete-submit", "Delete");

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

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // user.deleteTodo(todoId); // This might need parent/project context for deep deletion
      // Assuming deleteTodo knows how to find and delete it
      const currentProjectObject = user.getProject(user.getCurrentProjectId()); // Or get from expand form's context
      if (currentProjectObject) {
          user.deleteTodo(todoId, currentProjectObject.getId());
      } else {
          // Fallback if currentProjectObject isn't reliable, but should be from screenController
          user.deleteTodo(todoId); // Requires a global search in user.js
      }
      dialog.close("delete"); // Indicate successful deletion
    });

    return form;
  };

  const formRestore = (todoObjToRestore) => { // Accept the todo object directly
    const warningIcon = createEl("i", {
      className: "fa-regular fa-circle-check",
    });
    const header = createEl("h1", { textContent: "Want to bring it back?" });
    const subheader = createEl("h2", {
      textContent: "We’ll add a fresh copy of this to-do.",
    });
    const closeBtn = createCloseButton(dialogSecondary);
    closeBtn.textContent = "Go Back";

    const submitBtn = createSubmitButton("form-restore-submit", "Restore");

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

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Determine the target location and parent for the restored todo
      const targetLocationId = user.getProject(todoObjToRestore.getLocation())
        ? todoObjToRestore.getLocation()
        : user.getProjects()[0].getId(); // Default to first project if original project deleted

      const targetParentId = todoObjToRestore.getParent(); // Get parent ID from original todo

      // Create a NEW todo object from the old one's properties
      const restoredTodo = user.newTodo(
        todoObjToRestore.getTitle(),
        todoObjToRestore.getDescription(),
        todoObjToRestore.getDueDate(),
        todoObjToRestore.getPriority(),
        targetLocationId,
        targetParentId, // Pass the original parent ID
        todoObjToRestore.getSubTodos() // Pass all sub-todos for deep copy
      );

      // Add it to the correct place (parent or project)
      if (targetParentId) {
        // If it had a parent, find that parent and add it as a sub-todo
        const parentObj = user.getProject(targetLocationId).getTodo(targetParentId); // Assuming getTodo is recursive
        if (parentObj) {
            parentObj.addSubTodo(restoredTodo);
        } else {
            // Parent not found (e.g., parent was deleted). Add to project root.
            user.addToProject(restoredTodo, targetLocationId);
            // Optionally, update restoredTodo's parent to null if its intended parent is gone
            restoredTodo.updateParent(null);
        }
      } else {
        // No parent, add directly to the project
        user.addToProject(restoredTodo, targetLocationId);
      }
      
      // Optionally remove from history if that's desired behavior after restore
      // user.getHistory().removeTodo(todoObjToRestore.getId()); // You might need this method

      dialogSecondary.close();
      dialog.close("restore"); // Signal main dialog to close and update
    });

    return form;
  };

  const formDeleteProject = (projectId) => {
    const warningIcon = createEl("i", {
      className: "fa-solid fa-circle-exclamation",
    });
    const header = createEl("h1", { textContent: "Delete project?" });
    const subheader = createEl("h2", {
      textContent: "Are you sure you want to delete this entire project?",
    });
    const closeBtn = createCloseButton(dialog);
    closeBtn.textContent = "Go Back";

    const submitBtn = createSubmitButton("form-delete-project-submit", "Delete");

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

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Ensure there's always at least one project.
      // If deleting the last project, re-create "Things ToDo" as default.
      if (user.getProjects().length === 1) {
        user.newProject("Things ToDo 📋"); // Recreate with default name and emoji
      }
      user.deleteProject(projectId);
      dialog.close("deleteProject"); // Indicate successful deletion
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