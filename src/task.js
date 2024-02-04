import createProject from "./project";

class Task {
  static idTask = 0; // Generate a unique Id each time an Obj task created
  constructor(
    title = "noData",
    description = "noData",
    date = "noData",
    priority = "noData"
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = date;
    this.priority = priority; //High Med Low
    this.id = ++Task.idTask;  // Unique Id for each task
  }
  get getIdTask() {
    return this.id;
  }
}

export default Task;
