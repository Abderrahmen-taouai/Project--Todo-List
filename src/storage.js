import Project from "./project";

function initializeStorage() {
  const todoList = [];
  const defaultProject = new Project("Default Project");
  todoList.push(defaultProject);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getCurrentStorage() {
  return JSON.parse(localStorage.getItem("todoList"));
}

function setStorage(storage) {
  localStorage.setItem("todoList", JSON.stringify(storage));
}

function saveProjectToStorage(project) {
  const currentStorage = getCurrentStorage();
  currentStorage.push(project);
  localStorage.setItem("todoList", JSON.stringify(currentStorage));
}

function deleteProjectFromStorage(projectIndex) {
  let storage = getCurrentStorage();
  storage = storage.filter((item, index) => {
    if (index !== projectIndex) return item;
  });
  localStorage.setItem("todoList", JSON.stringify(storage));
}

function saveTodoToProject(todo, project, projectIndex) {
  project.addTodo(todo);
  const currentStorage = getCurrentStorage();
  currentStorage.splice(projectIndex, 1, project);
  setStorage(currentStorage);
}

function deleteTodoFromProject(projectIndex, todoIndex) {
  const storage = getCurrentStorage();
  const project = storage[projectIndex];
  project.todos.splice(todoIndex, 1);
  storage.splice(projectIndex, 1, project);
  setStorage(storage);
}

export {
  initializeStorage,
  getCurrentStorage,
  setStorage,
  saveProjectToStorage,
  deleteProjectFromStorage,
  saveTodoToProject,
  deleteTodoFromProject,
};