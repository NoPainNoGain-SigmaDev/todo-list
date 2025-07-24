import { createProject } from "./create-project";
import { createTodo } from "./create-todo";

export function createUser(name = "SCRUM MAISTER") {
  const projects = []; //collection of projects
  const history = createProject("History"); //collection al completed todos
  const defaultProject = createProject("Things ToDo 📋");
  projects.push(defaultProject);

  const getProjects = () => projects;
  const getProject = (projectId) => {
    const targetProject = projects.find(
      (project) => project.getId() === projectId
    );
    return targetProject;
  };
  const newProject = (newProjectName) =>
    projects.push(createProject(newProjectName));
  const userName = () => name;
  const newUserName = (newUserName) => (name = newUserName);
  const newTodo = (title, description, dueDate, priority, location) =>
    createTodo({ title, description, dueDate, priority, location });
  const newChecklistItem = (title) => createTodo({ title });
  const addToProject = (toDo, projectId = getProjects()[0].getId()) => {
    const targetProject = getProject(projectId);
    targetProject.addTodo(toDo);
  };
  const deleteFromProject = (todoId, projectId) => {
    const targetProject = getProject(projectId);
    const targetTodo = targetProject
      .getProjectContent()
      .find((todo) => todo.getId() === todoId);
    targetProject.removeTodo(targetTodo.getId());
  };
  const deleteProject = (projectId) => {
    const targetProject = projects.findIndex(
      (project) => project.getId() === projectId
    );
    projects.splice(targetProject, 1);
  };
  //history
  const getHistory = () => history;
  const addToHistory = (todo) => history.addToHistory(todo);
  //subTodos
  const addSubTodo = (subTodo, todoId, projectId) => {
    getProject(projectId).getTodo(todoId).addSubTodo(subTodo);
  };
  const deleteSubTodo = (subTodoId, todoId, projectId) => {
    getProject(projectId).getTodo(todoId).removeSubTodo(subTodoId);
  };
  //logger
  const self = () => {
    const projectsData = getProjects().map((project) => ({
      name: project.getProjectName(),
      id: project.getId(),
      content: project.getProjectContent().map((todo) => ({
        title: todo.getTitle(),
        id: todo.getId(),
        description: todo.getDescription(),
        dueDate: todo.getDueDate(),
        priority: todo.getPriority(),
        completed: todo.isCompleted(),
        location: todo.getLocation(),
        subTodos: todo.getSubTodos().map((subTodo) => ({
          title: subTodo.getTitle(),
          id: subTodo.getId(),
          description: subTodo.getDescription(),
          dueDate: subTodo.getDueDate(),
          priority: subTodo.getPriority(),
          completed: subTodo.isCompleted(),
          location: subTodo.getLocation(),
        })),
      })),
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
  return {
    getProjects,
    getProject,
    newProject,
    userName,
    newTodo,
    newChecklistItem,
    addToProject,
    deleteFromProject,
    deleteProject,
    self,
    getHistory,
    addToHistory,
    newUserName,
    addSubTodo,
    deleteSubTodo,
  };
}
