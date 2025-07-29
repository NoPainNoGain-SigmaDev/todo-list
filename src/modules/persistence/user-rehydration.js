import { createUser } from "../create-user";
import { createTodo } from "../create-todo";
import { createProject } from "../create-project";

const reconstructTodo = (todoData) => {
    const todo = createTodo({
        title: todoData.title,
        description: todoData.description,
        dueDate: todoData.dueDate,
        priority: todoData.priority,
        location: todoData.location,
        parent: todoData.parent,
    });
    todo.setId(todoData.id);
    if(todoData.subTodos && todoData.subTodos.length > 0){
        todoData.subTodos.forEach(subTodoData => todo.addSubTodo(reconstructTodo(subTodoData)));
    }
    return todo;
}

