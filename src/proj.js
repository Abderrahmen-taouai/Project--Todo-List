

class Project {
    static idProject=0;
    constructor(title="default"){
        this.title=title;
        this.todos=[]
        this.id=++(Project.idProject);
        
    }
    get getIdProject(){
        return this.id;
    }  
    addTodo(task){
        this.todos.push(task);
        
    }

  }




export default Project