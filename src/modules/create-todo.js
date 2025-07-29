export function createTodo({
  title = "New ToDo",
  description = "",
  dueDate = "",
  priority = "low",
  location = "",
  parent = null,
  subTodos = [],
}) {
  let completed = false;

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

  const getTitle = () => title;
  const updateTitle = (newTitle) => (title = newTitle);
  const getDescription = () => description;
  const updateDescription = (newDescription) => (description = newDescription);
  const getDueDate = () => dueDate;
  const updateDueDate = (newDate) => (dueDate = newDate);
  const getPriority = () => priority;
  const updatePriority = (newPriority) => (priority = newPriority);
  const getId = () => id;
  const setId = (newId) => id = newId;
  const isCompleted = () => completed;
  const updateStatus = () => (completed = !isCompleted());
  const getLocation = () => location;
  const updateLocation = (newLocation) => (location = newLocation);
  const getParent = () => parent;
  const updateParent = (newParent) => parent = newParent; 
  //subtodo logic
  const addSubTodo = (subTodo) => subTodos.push(subTodo);
  const getSubTodos = () => subTodos;
  const getSubTodo = (subTodoId) => {
    for (const subTodo of subTodos) {
      if (subTodo.getId() === subTodoId) {
        return subTodo;
      }

      const foundInNested = subTodo.getSubTodo(subTodoId);
      if (foundInNested) {
        return foundInNested;
      }
    }

    return null;
  };
  const removeSubTodo = (subTodoId) => {
    const targetSubTodo = subTodos.findIndex(
      (subTodo) => subTodo.getId() === subTodoId
    );
    subTodos.splice(targetSubTodo, 1);
  };

  const getSerializableData = () =>({
    title : title,
    description : description,
    date : dueDate,
    priority : priority,
    location : location,
    parent : parent,
    id : id,
    completed : completed,
    subTodos : subTodos.map(subTodo=>subTodo.getSerializableData()),
  });

  return {
    getTitle,
    updateTitle,
    getDescription,
    updateDescription,
    getDueDate,
    updateDueDate,
    getPriority,
    updatePriority,
    getId,
    setId,
    isCompleted,
    updateStatus,
    getLocation,
    updateLocation,
    addSubTodo,
    getSubTodos,
    removeSubTodo,
    getSubTodo,
    getParent,
    updateParent,
    getSerializableData,
  };
}
