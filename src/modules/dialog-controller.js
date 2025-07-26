import { createForm } from "./form-controller";
import { clear } from "./dom-tools";

export function dialogController() {
  const dialog = document.getElementById("dialog");
  const dialogSecondary = document.getElementById("dialog-level-2");
  
  // format dialog for new todos
  const dialogAddNewTodo = () => {
    clear(dialog);
    dialog.appendChild(createForm().formAddNewTodo());
  };
  // format dialog for new project
  const dialogAddNewProject = () => {
    clear(dialog);
    dialog.appendChild(createForm().formAddNewProject());
  };
  // format dialog for expanding a todo
  const dialogExpandTodo = (todo) => {
    clear(dialog);
    dialog.appendChild(createForm().formExpandTodo(todo));
  };
  // format dialog for confirm alert
  const dialogDelete = (todoId) => {
    clear(dialog);
    dialog.appendChild(createForm().formDelete(todoId));
  }
  // format dialog for confirm restore alert
  const dialogRestore = (todoId) => {
    clear(dialogSecondary);
    dialogSecondary.appendChild(createForm().formRestore(todoId));
  }
  // format dialog for confirm delete project alert
  const dialogDeleteProject = (projectId) => {
    clear(dialog);
    dialog.appendChild(createForm().formDeleteProject(projectId));
  }

  
  return {
    dialogAddNewTodo,
    dialogAddNewProject,
    dialogExpandTodo,
    dialogDelete,
    dialogRestore,
    dialogDeleteProject,
  };
}
