import { Project } from "./projects";

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export const TaskObj = (function () {
  function addTask(title, description, dueDate, priority) {
    // const task = new Todo("Breakfast", "Eat Breakfast", new Date(2024, 9, 16), "High");
    // const a = new Todo("IDK", "Do IDK", new Date(2024, 9, 16), "Medium");
    // const b = new Todo("HW", "Do HW", new Date(2024, 9, 16), "Low");
    // Project.addTaskToProject(task, 0);
    const task = new Todo(title, description, dueDate, priority);
    Project.addTaskToProject(task, 0);
    // Project.addTaskToProject(a, 0);
    // Project.addTaskToProject(b, 1);
  }

  function deleteTask(index, taskIndex) {
    Project.removeTaskFromProject(index, taskIndex);
  }

  return { addTask, deleteTask };
})();

// TaskObj.addTask();
