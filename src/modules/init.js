import { Project } from "./projectManager";
import { CompletedProjects } from "./completedTasks";
import { displayTask, displayProjects } from "./domUtils";
import { loadFromLocalStorage } from "./localStorageHelper";

export default function initializeApp() {
  const projectArr = loadFromLocalStorage("projectArr");
  Project.setProjectArr(projectArr);

  const completedProjectsArr = loadFromLocalStorage("compProjArray");
  CompletedProjects.setCompArr(completedProjectsArr);

  displayProjects();
  displayTask();
}
