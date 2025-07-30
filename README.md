# 📋 Things ToDo, A Simple Todo List Application

![Todo List Screenshot](https://raw.githubusercontent.com/NoPainNoGain-SigmaDev/todo-list/main/screenshot.png) A minimalist and intuitive Todo List application designed to help you organize your tasks efficiently. This project is part of [The Odin Project's](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) curriculum, focusing on practical JavaScript skills, module patterns, and responsive UI development. Inspired by the clean interface and functionality of [Todoist](https://www.todoist.com/).

## ✨ Features

* **Project Management:** Create, rename, and delete custom projects to categorize your tasks.
* **Hierarchical Todos:** Add todos with descriptions, due dates, and priorities. Break down complex tasks into infinite levels of sub-todos for detailed planning.
* **Dynamic Date Display:** Dates are intelligently formatted (Today, Tomorrow, Yesterday, Day of Week, Month Day, Full Date) and color-coded for quick visual cues.
* **Task Actions:**
    * Mark todos as completed (moves to History).
    * Delete todos (permanently removes or sends to History).
    * Restore completed todos from History to their original project and parent.
    * Update todo details (title, description, date, priority, project, parent).
* **Local Storage Persistence:** All your data is automatically saved to your browser's local storage, ensuring your tasks are preserved even after closing the browser.
* **Responsive Design:** Optimized for seamless use across various screen sizes, from desktop to mobile.
* **User-Friendly Forms:** Clear dialogs for adding, updating, and confirming actions.

## 🚀 Live Demo

Experience the Todo List application live:
[https://nopainnogain-sigmadev.github.io/todo-list/](https://nopainnogain-sigmadev.github.io/todo-list/)

## 🛠️ Technologies Used

* **JavaScript (Vanilla JS):** Core logic and DOM manipulation.
* **Webpack:** For bundling JavaScript modules and managing assets.
* **date-fns:** A powerful and lightweight JavaScript date utility library for robust date parsing, formatting, and manipulation.
* **Font Awesome:** For scalable vector icons.
* **HTML5 & CSS3:** For structuring and styling the application.

## 📦 Installation and Setup (Local Development)

To get a copy of this project up and running on your local machine for development and testing purposes, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/NoPainNoGain-SigmaDev/todo-list.git](https://github.com/NoPainNoGain-SigmaDev/todo-list.git)
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd todo-list
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run in development mode (with live reload):**
    ```bash
    npm start
    ```
    This will typically open the app in your browser at `http://localhost:8080`.
5.  **Build for production:**
    ```bash
    npm run build
    ```
    This will compile the optimized code into the `dist/` directory.

## ✍️ Author

Alejandro Garcia aka NoPainNoGain-SigmaDev
[GitHub Profile](https://github.com/NoPainNoGain-SigmaDev)

Built with sweat by: Alejandro Garcia