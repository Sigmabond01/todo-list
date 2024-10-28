import { Project } from "./projects";
import { TaskObj } from "./task";

const taskContainer = document.querySelector(".taskContainer");

export function displayTask() {
  let arr = Project.getProject();
  clearChild(taskContainer);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].todos.length; j++) {
      const task = document.createElement("div");
      const title = document.createElement("div");
      const description = document.createElement("div");
      const dueDate = document.createElement("div");
      const priority = document.createElement("div");
      const belongsTo = document.createElement("div");
      const deleteBtn = document.createElement("button");
      task.classList.add("task");
      deleteBtn.classList.add("delete-task");
      title.textContent = arr[i].todos[j].title;
      description.textContent = arr[i].todos[j].description;
      dueDate.textContent = arr[i].todos[j].dueDate;
      priority.textContent = arr[i].todos[j].priority;
      belongsTo.textContent = `Belongs to: ${arr[i].title}`;
      deleteBtn.textContent = "delete";
      deleteBtn.addEventListener("click", () => {
        TaskObj.deleteTask(i, j);
      });
      task.appendChild(title);
      task.appendChild(description);
      task.appendChild(dueDate);
      task.appendChild(priority);
      task.appendChild(belongsTo);
      task.appendChild(deleteBtn);
      taskContainer.appendChild(task);
    }
  }
}

const projectContainer = document.querySelector(".projectContainer");

export function displayProjects() {
  clearChild(projectContainer);
  for (let i = 1; i < Project.getProject().length; i++) {
    const project = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-project");
    project.textContent = Project.getProject()[i].title;
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", () => {
      Project.deleteProject(i);
      displayProjects();
      displayTask();
    });
    projectContainer.appendChild(project);
    projectContainer.appendChild(deleteBtn);
  }
}

function clearChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const projectSelectorContainer = document.querySelector("#project-selector");
export function projectSelectionOption() {
  clearChild(projectSelectorContainer);
  const defOption = document.createElement("option");
  defOption.textContent = "--none--";
  projectSelectorContainer.appendChild(defOption);
  for (let i = 1; i < Project.getProject().length; i++) {
    const option = document.createElement("option");
    option.textContent = Project.getProject()[i].title;
    projectSelectorContainer.appendChild(option);
  }
}
