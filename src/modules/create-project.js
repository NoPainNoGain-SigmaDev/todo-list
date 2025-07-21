export function createProject(name = "ToDo List") {
  const projectTodos = [];
  //crypto.randomUUID() does not work on iphone
  function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  const id = crypto.randomUUID ? crypto.randomUUID() : generateUUID();

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
  const getTodo = (todoId) => {
    const targetTodo = projectTodos.find(
      (todo) => todo.getId() === todoId
    );
    return targetTodo;
  }
  const addToHistory = (newTodo) => {
    projectTodos.unshift(newTodo);
  }

  return {
    getProjectName,
    getProjectContent,
    addTodo,
    removeTodo,
    getId,
    getTodo,
    addToHistory,
  };
}
