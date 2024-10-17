import { Project } from "./projects";

const taskContainer = document.querySelector(".taskContainer");

export function displayTask() {
  let todoArr = Project.getProject();
  let getLastTodo = todoArr[0].todos.length - 1;
  for (let i = getLastTodo; i < todoArr[0].todos.length; i++) {
    const task = document.createElement("div");
    const title = document.createElement("div");
    const description = document.createElement("div");
    const dueDate = document.createElement("div");
    const priority = document.createElement("div");
    task.classList.add("task");
    title.textContent = todoArr[0].todos[i].title;
    description.textContent = todoArr[0].todos[i].description;
    dueDate.textContent = todoArr[0].todos[i].dueDate;
    priority.textContent = todoArr[0].todos[i].priority;
    task.appendChild(title);
    task.appendChild(description);
    task.appendChild(dueDate);
    task.appendChild(priority);
    taskContainer.appendChild(task);
  }
}

const projectContainer = document.querySelector(".projectContainer");

export function displayProjects() {
  clearChild(projectContainer);
  for (let i = 1; i < Project.getProject().length; i++) {
    const project = document.createElement("div");
    project.textContent = Project.getProject()[i].title;
    projectContainer.appendChild(project);
  }
}

function clearChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
