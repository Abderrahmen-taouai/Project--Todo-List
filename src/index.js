/* import Task from "./task";
import Project from "./project";
import ProjectList from "./projectsList";

const projectList = new ProjectList(); */
import { initializeStorage, getCurrentStorage } from "./storage";

import loadDOM from "./domManipulation";

import "./style.css"

(() => {
  if (!localStorage.getItem("todoList")) {
    initializeStorage();
  }
  const storage = getCurrentStorage();
  loadDOM(storage);
})();