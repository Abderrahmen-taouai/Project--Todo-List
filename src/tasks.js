

class Todo {
  static idTask = 0; // Generate a unique Id each time an Obj task created
  constructor(
    title = "default",
    description = "default",
    date = "default",
    priority = "default"
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = date;
    this.priority = priority; //High Med Low
    this.id = ++Todo.idTask;  // Unique Id for each task
  }
  get getIdTask() {
    return this.id;
  }
}

export default Todo;
