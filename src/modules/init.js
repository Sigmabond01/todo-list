import { Project } from "./projectManager";
import { CompletedProjects } from "./completedTasks";
import { displayTask, displayProjects } from "./domUtils";
import { loadFromLocalStorage } from "./localStorageHelper";

export default function initializeApp() {
  let projectArr = loadFromLocalStorage("projectArr");
  if (projectArr.length === 0) {
    projectArr = [
      {
        title: "Welcome to Todo List",
        todos: [
          {
            title: "Explore the Features",
            description: "Take some time to familiarize yourself with the different sections and functionalities of the todo list.",
            dueDate: "2025-12-31",
            priority: "high",
          },
          {
            title: "Create Your First Project",
            description: "Start a new project to organize your tasks based on a specific goal or area of focus.",
            dueDate: "2025-12-31",
            priority: "high",
          },
          {
            title: "Add a Task to Your Project",
            description: "Try adding a task to your newly created project. You can add details like due dates and priorities.",
            dueDate: "2025-12-31",
            priority: "high",
          },
        ],
      },
    ];
  }
  Project.setProjectArr(projectArr);

  const completedProjectsArr = loadFromLocalStorage("compProjArray");
  CompletedProjects.setCompArr(completedProjectsArr);

  document.querySelector(".page-text").textContent = "All";

  displayProjects();
  displayTask();
}
