import { createUser } from "../create-user";
import { createTodo } from "../create-todo";
import { createProject } from "../create-project";

const reconstructTodo = (todoData) => {
  const todo = createTodo({
    title: todoData.title,
    description: todoData.description,
    dueDate: todoData.date,
    priority: todoData.priority,
    location: todoData.location,
    parent: todoData.parent,
  });
  todo.setId(todoData.id);
  if (todoData.subTodos && todoData.subTodos.length > 0) {
    todoData.subTodos.forEach((subTodoData) =>
      todo.addSubTodo(reconstructTodo(subTodoData))
    );
  }
  return todo;
};
const reconstructProject = (projectData) => {
  const project = createProject(projectData.name);
  project.setId(projectData.id);
  if (projectData.projectTodos && projectData.projectTodos.length > 0) {
    projectData.projectTodos.forEach((projectTodoData) =>
      project.addTodo(reconstructTodo(projectTodoData))
    );
  }
  return project;
};
export const reconstructUserData = (parsedUserData) => {
  //previously parsed
  const user = createUser();
  user.newUserName(parsedUserData.userName);

  user.clearHistory();
  user.clearProjects();

  if (parsedUserData.projects && parsedUserData.projects.length > 0) {
    parsedUserData.projects.forEach((projectData) =>
      user.addProject(reconstructProject(projectData))
    );
  }
  if(parsedUserData.history){
    user.setHistory(reconstructProject(parsedUserData.history));
  }
  //reset current project
  user.updateCurrentProjectId(user.getProjects()[0].getId());
  return user;
};
