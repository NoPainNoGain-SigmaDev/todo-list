import { createProject } from "./create-project";
import { createTodo } from "./create-todo";

export function createUser(name = "SCRUM MAISTER") {
  const projects = []; //collection of projects
  const defaultProject = createProject("My ToDos");
  projects.push(defaultProject);

  const getProjects = () => projects;
  const newProject = (newProjectName) =>
    projects.push(createProject(newProjectName));
  const userName = () => name;
  const newTodo = (title, description, dueDate, priority) =>
    createTodo({title, description, dueDate, priority});
  const newChecklistItem = (title) => createTodo({title});
  const addToProject = (toDo, projectId = getProjects()[0].getId()) => {
    const targetProject = projects.find(
      (project) => project.getId() === projectId
    );
    targetProject.addTodo(toDo);
  };
  const deleteFromProject = (todoId, projectId) => {
    const targetProject = projects.find(
      (project) => project.getId() === projectId
    );
    const targetTodo = targetProject.getProjectContent().find(todo => todo.getId() === todoId);
    targetProject.removeTodo(targetTodo.getId());
  };
  const deleteProject = (projectId) => {
    const targetProject = projects.findIndex(
      (project) => project.getId() === projectId
    );
    projects.splice(targetProject, 1);
  }


  const self = () =>{
    getProjects().forEach(project => {
        console.log(project.getProjectName() + " ID: " + project.getId());
        console.log("CONTENT:");
        project.getProjectContent().forEach(todo => {
            console.log(todo.getTitle(), todo.getId(), todo.getDescription(), todo.getDueDate(), todo.getPriority(), " COMPLETED: " + todo.isCompleted());
            todo.getChecklist().forEach(checklistItem => console.log(checklistItem.getTitle(), checklistItem.isCompleted()));
        })
    });


  }
  return {
    getProjects,
    newProject,
    userName,
    newTodo,
    newChecklistItem,
    addToProject,
    deleteFromProject,
    deleteProject,
    self   
  };
}
