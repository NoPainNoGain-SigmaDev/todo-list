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
  let id = crypto.randomUUID ? crypto.randomUUID() : generateUUID();

  const getProjectName = () => name;
  const updateProjectName = (newProjectName) => (name = newProjectName);
  const getProjectContent = () => projectTodos;
  const addTodo = (newTodo) => projectTodos.push(newTodo);
  const getId = () => id;
  const setId = (newId) =>  id = newId;
  const removeTodo = (todoId) => {
    const targetTodo = projectTodos.findIndex(
      (todo) => todo.getId() === todoId
    );
    projectTodos.splice(targetTodo, 1);
  };
  const getTodo = (todoId) => {
    for (const todo of projectTodos) {
      if (todo.getId() === todoId) return todo;
      const possibleSubTodo = todo.getSubTodo(todoId);
      if (possibleSubTodo) return possibleSubTodo;
    }
  };
  const addToHistory = (newTodo) => {
    projectTodos.unshift(newTodo);
  };

  const getSerializableData = () =>({
    name : name,
    id : id,
    projectTodos : projectTodos.map(projectTodo=>projectTodo.getSerializableData()),
  });

  return {
    getProjectName,
    getProjectContent,
    addTodo,
    removeTodo,
    getId,
    setId,
    getTodo,
    addToHistory,
    updateProjectName,
    getSerializableData,
  };
}
