export default function cacheDOM() {
    const newProjectBtn = document.querySelector(".new-project");
    const cancelProjectBtn = document.querySelector(".cancel-project");
    const projectForm = document.querySelector(".project-form");
    const projectInput = document.querySelector("#project-input");
    const projects = document.querySelector(".projects");
    const projectTitles = document.querySelectorAll(".project-title");
    const projectOverview = document.querySelector(".project-overview");
    const newTodoBtn = document.querySelector(".new-todo");
    const cancelTodoBtn = document.querySelector(".cancel-todo");
    const todoForm = document.querySelector(".todo-form");
    const todoTitle = document.querySelector("#todo-title");
    const todoDescription = document.querySelector("#todo-description");
    const todoDueDate = document.querySelector("#todo-due-date");
    const todoPriority = document.querySelector("#todo-priority");
    const todos = document.querySelector(".todos");
    return {
      newProjectBtn,
      cancelProjectBtn,
      projectForm,
      projectInput,
      projects,
      projectTitles,
      projectOverview,
      newTodoBtn,
      cancelTodoBtn,
      todoForm,
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority,
      todos,
    };
  }