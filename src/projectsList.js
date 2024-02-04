import Project from "./project";
import Task from "./task";


 class ProjectList {
  static idProjects=0;
  constructor() {
    this.projects = new Project();
    this.id=++(ProjectList.idProjects);
    this.todoForm = this.createTodoForm();
    this.projectsElement = this.createprojectsElement();
    this.renderTodos();

  }
  get getIdListProject(){
    return this.id;
} 
  addProject(project) {
   
    this.projects.tasks.splice(project.getIdProject,0,project);
    
  }


  deleteProject(project) {
   
    this.projects.tasks.splice(project.getIdListProject,1);
  
  }

   createTodoForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    input.type = 'text';
    input.placeholder = 'Enter a todo...';
    button.textContent = 'Add Todo';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = input.value.trim();
      if (title !== '') {
        let todo= new Task(title)
        this.projects.addTasks(todo);
        input.value = '';
        this.renderTodos();
      }
    });

    form.appendChild(input);
    form.appendChild(button);
    return form;
  }

  createprojectsElement() {
    const ul = document.createElement('ul');
    ul.id = 'todo-list';
    return ul;
  }

  createTodoItemElement(todo) {
    const li = document.createElement('li');
    li.textContent = todo.title;
    

    li.addEventListener('click', () => {
      
      this.renderTodos();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      this.projects.deleteTask(todo);
      this.renderTodos();
    });

    li.appendChild(deleteButton);
    return li;
  }

  renderTodos() {
    const todos = this.projects.getAllTodos();

    this.projectsElement.innerHTML = '';
    todos.forEach(todo => {
      const todoItemElement = this.createTodoItemElement(todo);
      this.projectsElement.appendChild(todoItemElement);
    });

    const container = document.createElement('div');
    container.classList.add('container');
    
    container.innerHTML = '';
    container.appendChild(this.todoForm);
    container.appendChild(this.projectsElement);
    document.body.appendChild(container);
  }
  
}
//const projectList = new ProjectList();
export default ProjectList





