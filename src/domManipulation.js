import {
  getCurrentStorage,
  saveProjectToStorage,
  deleteProjectFromStorage,
  saveTodoToProject,
  deleteTodoFromProject,
} from "./storage";

import {
  createWrapper,
  createText,
  createButton,
  createInput,
  createTextArea,
  createDatePicker,
  createSelect,
  createLabel,
} from "./elementCreator";

import cacheDOM from "./cacheDom";
import Project from "./proj";
import Todo from "./tasks";

export default function loadDOM(todoList) {
  const content = createWrapper("div", "content");
  content.append(
    createHeader(),
    createSidebar(todoList),
    createProjectOverview()
  );
  document.body.append(content);
  const dom = cacheDOM();
  addNewProjectBtnListener(dom);
  addCancelProjectBtnListener(dom);
  addProjectFormListener(dom);
  addProjectListeners(dom);
}

function createHeader() {
  const header = createWrapper("div", "header");
  const pageTitle = createText("h1", "page-title", "Odin Todo List");
  header.append(pageTitle);
  return header;
}

function createSidebar(todoList) {
  const sidebar = createWrapper("div", "sidebar");
  const sidebarTitle = createText("h2", "sidebar-title", "My Projects");
  const newProjectBtn = createButton("button", "new-project", "New project");

  const projectForm = createWrapper("form", "project-form", "hide");

  const projectTitleWrapper = createWrapper("div", "form-group");
  const projectTitleLabel = createLabel("Project title", "project-input");
  const projectTitle = createInput("text", "project-input");
  projectTitleWrapper.append(projectTitleLabel, projectTitle);

  const createProjectBtn = createButton("submit", "create-project", "Create");
  const cancelProjectBtn = createButton("button", "cancel-project", "Cancel");
  projectForm.append(projectTitleWrapper, createProjectBtn, cancelProjectBtn);

  const projects = createWrapper("div", "projects");
  todoList.forEach((project, index) => {
    const projectElement = createProject(project.title, index);
    projects.append(projectElement);
  });

  sidebar.append(sidebarTitle, newProjectBtn, projectForm, projects);
  return sidebar;
}

function createProjectOverview() {
  const projectOverview = createWrapper("div", "project-overview");
  return projectOverview;
}

function createProject(title, index) {
  const projectWrapper = createWrapper("div", "project");
  const projectTitle = createText("p", "project-title", title);
  projectTitle.setAttribute("data-index", index);
  const deleteProjectBtn = createButton("button", "delete-project", "Delete");
  deleteProjectBtn.setAttribute("data-index", index);
  projectWrapper.append(projectTitle, deleteProjectBtn);
  return projectWrapper;
}

function showProjectForm(dom) {
  dom.projectForm.classList.remove("hide");
  dom.newProjectBtn.classList.add("hide");
  dom.projectInput.focus();
}

function hideProjectForm(dom) {
  dom.projectForm.classList.add("hide");
  dom.newProjectBtn.classList.remove("hide");
  dom.projectInput.value = "";
}

function renderProjects(dom) {
  const currentStorage = getCurrentStorage();
  dom.projects.textContent = "";
  currentStorage.forEach((project, index) => {
    const projectElement = createProject(project.title, index);
    dom.projects.append(projectElement);
  });
}

function showActiveProject(project) {
  const dom = cacheDOM();
  dom.projectTitles.forEach((title) => {
    title.classList.remove("active");
  });
  project.classList.add("active");
}

function addNewProjectBtnListener(dom) {
  dom.newProjectBtn.addEventListener("click", () => showProjectForm(dom));
}

function addCancelProjectBtnListener(dom) {
  dom.cancelProjectBtn.addEventListener("click", () => hideProjectForm(dom));
}

function addProjectFormListener(dom) {
  dom.projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectTitle = dom.projectInput.value.trim();
    if (!projectTitle) return;
    const newProject = new Project(projectTitle);
    saveProjectToStorage(newProject);
    hideProjectForm(dom);
    renderProjects(dom);
  });
}

function addProjectListeners(dom) {
  dom.projects.addEventListener("click", (e) => {
    const clickedElement = e.target;
    hideProjectForm(dom);
    if (clickedElement.classList.contains("project-title")) {
      const projectIndex = +clickedElement.getAttribute("data-index");
      const selectedProject = getCurrentStorage()[projectIndex];
      showActiveProject(clickedElement);
      renderProjectOverview(selectedProject, projectIndex, dom);
    } else if (clickedElement.classList.contains("delete-project")) {
      const projectIndex = +clickedElement.getAttribute("data-index");
      deleteProjectFromStorage(projectIndex);
      renderProjects(dom);
      dom.projectOverview.textContent = "";
    }
  });
}

function renderProjectOverview(project, index, dom) {
  dom.projectOverview.textContent = "";
  const selectedProject = createText("h3", "selected-project", project.title);
  const newTodoBtn = createButton("button", "new-todo", "Add todo");
  const todoForm = createTodoForm();
  const todos = createTodos(project, index);
  dom.projectOverview.append(selectedProject, newTodoBtn, todoForm, todos);
  addNewTodoBtnListener();
  addCancelTodoBtnListener();
  addTodoFormListener(project, index);
  addTodoListeners();
}

function createTodos(project, projectIndex) {
  const todos = createWrapper("div", "todos");
  todos.setAttribute("data-project-index", projectIndex);
  project.todos.forEach((todo, index) => {
    const todoWrapper = createWrapper("div", "todo");
    const todoTitle = createText("p", "todo-title", todo.title);
    const todoDescription = createText(
      "p",
      "todo-description",
      todo.description
    );
    const todoDueDate = createText(
      "p",
      "todo-due-date",
      `Due date: ${todo.dueDate}`
    );
    const todoPriority = createText(
      "p",
      "todo-priority",
      `Priority: ${todo.priority}`
    );
    const deleteTodoBtn = createButton("button", "delete-todo", "Delete");
    deleteTodoBtn.setAttribute("data-todo-index", index);
    todoWrapper.append(
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority,
      deleteTodoBtn
    );
    todos.append(todoWrapper);
  });

  return todos;
}

function createTodoForm() {
  const todoForm = createWrapper("form", "todo-form", "hide");

  const todoTitleWrapper = createWrapper("div", "form-group");
  const todoTitleLabel = createLabel("Todo title", "todo-title");
  const todoTitle = createInput("text", "todo-title");
  todoTitleWrapper.append(todoTitleLabel, todoTitle);

  const todoDescriptionWrapper = createWrapper("div", "form-group");
  const todoDescriptionLabel = createLabel("Description", "todo-description");
  const todoDescription = createTextArea("todo-description");
  todoDescriptionWrapper.append(todoDescriptionLabel, todoDescription);

  const todoDueDateWrapper = createWrapper("div", "form-group");
  const todoDueDateLabel = createLabel("Due Date", "todo-due-date");
  const todoDueDate = createDatePicker("todo-due-date");
  todoDueDateWrapper.append(todoDueDateLabel, todoDueDate);

  const todoPriorityWrapper = createWrapper("div", "form-group");
  const todoPriorityLabel = createLabel("Priority", "todo-priority");
  const todoPriority = createSelect("todo-priority", "low", "medium", "high");
  todoPriorityWrapper.append(todoPriorityLabel, todoPriority);

  const createTodoBtn = createButton("submit", "create-todo", "Create");
  const cancelTodoBtn = createButton("button", "cancel-todo", "Cancel");

  todoForm.append(
    todoTitleWrapper,
    todoDescriptionWrapper,
    todoDueDateWrapper,
    todoPriorityWrapper,
    createTodoBtn,
    cancelTodoBtn
  );
  return todoForm;
}

function addNewTodoBtnListener() {
  const dom = cacheDOM();
  dom.newTodoBtn.addEventListener("click", () => {
    hideProjectForm(dom);
    showTodoForm(dom);
  });
}

function addCancelTodoBtnListener() {
  const dom = cacheDOM();
  dom.cancelTodoBtn.addEventListener("click", () => {
    hideProjectForm(dom);
    hideTodoForm(dom);
  });
}

function showTodoForm(dom) {
  dom.todoForm.classList.remove("hide");
  dom.newTodoBtn.classList.add("hide");
}

function hideTodoForm(dom) {
  dom.todoForm.classList.add("hide");
  dom.newTodoBtn.classList.remove("hide");
  dom.todoTitle.value = "";
  dom.todoDescription.value = "";
  dom.todoDueDate.value = "";
  dom.todoPriority.value = "";
}

function addTodoFormListener(project, index) {
  const dom = cacheDOM();
  dom.todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const reserializedProject = Object.assign(new Project(), project);
    const todoTitle = dom.todoTitle.value;
    const todoDescription = dom.todoDescription.value;
    const todoDueDate = dom.todoDueDate.value;
    const todoPriority = dom.todoPriority.value;
    const newTodo = new Todo(
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority
    );
    saveTodoToProject(newTodo, reserializedProject, index);
    hideTodoForm(dom);
    renderProjectOverview(project, index, dom);
  });
}

function addTodoListeners() {
  const dom = cacheDOM();
  dom.todos.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-todo")) {
      const todoIndex = +e.target.getAttribute("data-todo-index");
      const projectIndex = +dom.todos.getAttribute("data-project-index");
      deleteTodoFromProject(projectIndex, todoIndex);
      const project = getCurrentStorage()[projectIndex];
      renderProjectOverview(project, projectIndex, dom);
    }
  });
}