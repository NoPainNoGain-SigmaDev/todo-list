import { createProject } from "./create-project";
import { createTodo } from "./create-todo";

export function createUser(name = "") {
  let projects = []; //collection of projects
  let history = createProject("History"); //collection al completed todos
  const defaultProject = createProject("Things ToDo 📋");
  projects.push(defaultProject);
  let currentProjectId = projects[0].getId();

  const getProjects = () => projects;
  const getProject = (projectId) => {
    const targetProject = projects.find(
      (project) => project.getId() === projectId
    );
    return targetProject;
  };
  const newProject = (newProjectName) =>
    projects.push(createProject(newProjectName));
  const addProject = (newProject) => projects.push(newProject);
  const userName = () => name;
  const newUserName = (newUserName) => (name = newUserName);
  const newTodo = (title, description, dueDate, priority, location, parent, subTodos) =>
    createTodo({ title, description, dueDate, priority, location, parent, subTodos });
  const addToProject = (toDo, projectId = getProjects()[0].getId()) => {
    const targetProject = getProject(projectId);
    targetProject.addTodo(toDo);
  };
  const deleteTodo = (todoId) => {
    const todo = getTodo(todoId);
    const parentTodo = getTodo(todo.getParent());
    if(parentTodo){
      parentTodo.removeSubTodo(todoId);
      return;
    }
    const projectContainer = getProject(todo.getLocation());
    projectContainer.removeTodo(todoId);
  };
  const getTodo = (todoId) => {
    for(const project of projects){
     const possibleTodo = project.getTodo(todoId);
     if(possibleTodo)return possibleTodo; 
    }
    return null;
  }
  const deleteProject = (projectId) => {
    const targetProject = projects.findIndex(
      (project) => project.getId() === projectId
    );
    projects.splice(targetProject, 1);
  };
  //history
  const getHistory = () => history;
  const setHistory = (newHistory) => history = newHistory;
  const addToHistory = (todo) => history.addToHistory(todo);
  //subTodos
  const addSubTodo = (subTodo, todoId, projectId) => {
    getProject(projectId).getTodo(todoId).addSubTodo(subTodo);
  };
  const deleteSubTodo = (subTodoId, todoId, projectId) => {
    getProject(projectId).getTodo(todoId).removeSubTodo(subTodoId);
  };
  const getCurrentProjectId = () => currentProjectId;
  const updateCurrentProjectId = (newCurrentProjectId) =>
    (currentProjectId = newCurrentProjectId);
  //logger
  const self = () => {
    // Recursive helper function to map todos and their nested sub-todos
    const mapTodosRecursively = (todos) => {
      return todos.map((todo) => {
        const todoObject = {
          title: todo.getTitle(),
          id: todo.getId(),
          description: todo.getDescription(),
          dueDate: todo.getDueDate(),
          priority: todo.getPriority(),
          completed: todo.isCompleted(),
          location: todo.getLocation(),
          parent : todo.getParent(),
        };

        // If there are sub-todos, recursively map them
        const subTodos = todo.getSubTodos();
        if (subTodos && subTodos.length > 0) {
          todoObject.subTodos = mapTodosRecursively(subTodos); // Recursive call
        }

        return todoObject;
      });
    };

    const projectsData = getProjects().map((project) => ({
      name: project.getProjectName(),
      id: project.getId(),
      content: mapTodosRecursively(project.getProjectContent()), // Use the recursive helper here
    }));

    const historyData = history.getProjectContent().map((completedTodo) => ({
      title: completedTodo.getTitle(),
      location: completedTodo.getLocation(),
      id: completedTodo.getId(),
    }));

    const userData = {
      projects: projectsData,
      history: historyData,
    };

    console.log(JSON.stringify(userData, null, 2));
  };

  const clearHistory = () => history = [];
  const clearProjects = () => projects = [];

  const getSerializableData = () =>({
    userName : name,
    projects : projects.map(project=>project.getSerializableData()),
    history : history.getSerializableData(),
  });
  return {
    getProjects,
    getProject,
    newProject,
    addProject,
    userName,
    newTodo,
    addToProject,
    deleteProject,
    self,
    getHistory,
    setHistory,
    addToHistory,
    newUserName,
    addSubTodo,
    deleteSubTodo,
    getCurrentProjectId,
    updateCurrentProjectId,
    getTodo,
    deleteTodo,
    getSerializableData,
    clearHistory,
    clearProjects,
  };
}
