export function createProject(name = "ToDo List") {
  const projectTodos = [];
  const id = crypto.randomUUID();

  const getProjectName = () => name;
  const getProjectContent = () => projectTodos;
  const addTodo = (newTodo) => projectTodos.push(newTodo);
  const getId = () => id;
  const removeTodo = (todoId) => {
    const targetTodo = projectTodos.findIndex(
      (todo) => todo.getId() === todoId
    );
    projectTodos.splice(targetTodo, 1);
  };

  return {
    getProjectName,
    getProjectContent,
    addTodo,
    removeTodo,
    getId,
  };
}
