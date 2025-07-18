import { createProject } from "./create-project";
import { createTodo } from "./create-todo";

export function createUser(name = "SCRUM MAISTER") {
  const projects = []; //collection of projects
  const history = []; //collection al completed todos
  const defaultProject = createProject("Things ToDo");
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
  const newTodo = (title, description, dueDate, priority, location) =>
    createTodo({title, description, dueDate, priority, location});
  const newChecklistItem = (title) => createTodo({title});
  const addToProject = (toDo, projectId = getProjects()[0].getId()) => {
    const targetProject = getProject(projectId);
    targetProject.addTodo(toDo);
  };
  const deleteFromProject = (todoId, projectId) => {
    const targetProject = getProject(projectId);
    const targetTodo = targetProject.getProjectContent().find(todo => todo.getId() === todoId);
    targetProject.removeTodo(targetTodo.getId());
  };
  const deleteProject = (projectId) => {
    const targetProject = projects.findIndex(
      (project) => project.getId() === projectId
    );
    projects.splice(targetProject, 1);
  }
  const getHistory = () => history;
  const addToHistory = (todo) => history.push(todo);

  const self = () =>{
    console.log("PROJECTS----------------------------------------------------");
    getProjects().forEach(project => {
        console.log(project.getProjectName() + " ID: " + project.getId());
        console.log("CONTENT:");
        project.getProjectContent().forEach(todo => {
            console.log(todo.getTitle(), todo.getId(), todo.getDescription(), todo.getDueDate(), todo.getPriority(), " COMPLETED: " + todo.isCompleted());
            todo.getChecklist().forEach(checklistItem => console.log(checklistItem.getTitle(), checklistItem.isCompleted()));
        })
    });
    console.log("HISTORY----------------------------------------------------");
    getHistory().forEach(completedTodo => {
      console.log("TITLE: " + completedTodo.getTitle() + " LOCATION: " + completedTodo.getLocation() + " ID: " + completedTodo.getId());
    });
  }
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
  };
}
