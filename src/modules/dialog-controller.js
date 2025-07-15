import { createForm } from "./create-form";

export function dialogController() {
  const dialog = document.getElementById("dialog");

  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px"; 
  };
  // format dialog for new todos
  const dialogAddNewTodo = () => {
    dialog.appendChild(createForm().formAddNewTodo());
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.innerHTML = "";
      console.log("close");
    });
    const textarea = document.getElementById("description");
    textarea.addEventListener("input", () => autoResize(textarea));
    console.log("DIALOG NEW TODO");
  };
  // format dialog for new project
  const dialogAddNewProject = () => {
    dialog.appendChild(createForm().formAddNewProject());
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.innerHTML = "";
      console.log("close");
    });
    console.log("DIALOG NEW PROJECT");
  };
  // format dialog for expanding a todo
  const dialogExpandTodo = (todo) => {
    dialog.appendChild(createForm().formExpandTodo(todo));
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.innerHTML = "";
      console.log("close");
    });
    console.log("DIALOG EXPAND TODO");
  };

  return {
    dialogAddNewTodo,
    dialogAddNewProject,
    dialogExpandTodo,
  };
}
