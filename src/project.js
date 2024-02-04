
import Task from "./task";

class Project {
    static idProject=0;
    constructor(title="default",description="default"){
        this.title=title;
        this.description=description;
        this.tasks=this.loadtodotFromLocalStorage();;
        this.id=++(Project.idProject);
        
    }
    get getIdProject(){
        return this.id;
    }  
    addTasks(task){
        this.tasks.splice(task.getIdT,0,task);
        this.savetodosToLocalStorage();
    }

    deleteTask(task){
        
        this.tasks.splice(task.getIdT,1);
        this.savetodosToLocalStorage();

     }
     getAllTodos() {
        return this.tasks;
      }
    

     loadtodotFromLocalStorage() {
        const storedProject = localStorage.getItem('tasks');
        return storedProject ? JSON.parse(storedProject) : [];
      }
    
      savetodosToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
  }




export default Project