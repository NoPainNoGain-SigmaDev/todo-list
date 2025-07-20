import { createForm } from "./form-controller";
import { clear } from "./dom-tools";

export function dialogController() {
  const dialog = document.getElementById("dialog");

  
  // format dialog for new todos
  const dialogAddNewTodo = () => {
    clear(dialog);
    dialog.appendChild(createForm().formAddNewTodo());
    console.log("DIALOG NEW TODO");
  };
  // format dialog for new project
  const dialogAddNewProject = () => {
    clear(dialog);
    dialog.appendChild(createForm().formAddNewProject());
    console.log("DIALOG NEW PROJECT");
  };
  // format dialog for expanding a todo
  const dialogExpandTodo = (todo) => {
    clear(dialog);
    dialog.appendChild(createForm().formExpandTodo(todo));
    console.log("DIALOG EXPAND TODO");
  };
  // format dialog for confirm alert
  const dialogDelete = (todoId, projectId) => {
    clear(dialog);
    dialog.appendChild(createForm().formDelete(todoId, projectId));

  }

  return {
    dialogAddNewTodo,
    dialogAddNewProject,
    dialogExpandTodo,
    dialogDelete,
  };
}
