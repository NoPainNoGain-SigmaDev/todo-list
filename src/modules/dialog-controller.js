import { createForm } from "./form-controller";

export function dialogController() {
  const dialog = document.getElementById("dialog");

  
  // format dialog for new todos
  const dialogAddNewTodo = () => {
    dialog.appendChild(createForm().formAddNewTodo());
    console.log("DIALOG NEW TODO");
  };
  // format dialog for new project
  const dialogAddNewProject = () => {
    dialog.appendChild(createForm().formAddNewProject());
    console.log("DIALOG NEW PROJECT");
  };
  // format dialog for expanding a todo
  const dialogExpandTodo = (todo) => {
    dialog.appendChild(createForm().formExpandTodo(todo));
    console.log("DIALOG EXPAND TODO");
  };

  return {
    dialogAddNewTodo,
    dialogAddNewProject,
    dialogExpandTodo,
  };
}
