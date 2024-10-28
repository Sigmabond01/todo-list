import { Project } from "./projects";
import { displayTask } from "./dom";

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export const TaskObj = (function () {
  function addTask(title, description, dueDate, priority, project) {
    const projectIndex = findProjectIndex(project);
    const task = new Todo(title, description, dueDate, priority);
    Project.addTaskToProject(task, projectIndex);
  }

  function deleteTask(index, taskIndex) {
    Project.removeTaskFromProject(index, taskIndex);
    displayTask();
  }

  return { addTask, deleteTask };
})();

function findProjectIndex(project) {
  const arr = Project.getProject();
  if (project === "--none--") {
    return 0;
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title === project) {
        return i;
      }
    }
  }
}
