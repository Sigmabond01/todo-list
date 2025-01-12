import { saveToLocalStorage } from "./localStorageHelper";

let projects = [];

export const Project = (function () {
  function createProject(title) {
    const project = { title, todos: [] };
    projects.push(project);
    saveToLocalStorage("projectArr", projects);
  }

  function deleteProject(index) {
    projects.splice(index, 1);
    saveToLocalStorage("projectArr", projects);
  }

  function addTaskToProject(obj, index) {
    projects[index].todos.push(obj);
    saveToLocalStorage("projectArr", projects);
  }

  function removeTaskFromProject(index, taskIndex) {
    projects[index].todos.splice(taskIndex, 1);
    saveToLocalStorage("projectArr", projects);
  }

  function replaceTaskFromProject(obj, index, taskIndex) {
    projects[index].todos.splice(taskIndex, 1, obj);
    saveToLocalStorage("projectArr", projects);
  }

  function renameProject(title, index) {
    projects[index].title = title;
    saveToLocalStorage("projectArr", projects);
  }

  function getProject() {
    return projects;
  }

  function setProjectArr(arr) {
    projects = arr;
  }

  return { createProject, deleteProject, addTaskToProject, removeTaskFromProject, replaceTaskFromProject, renameProject, getProject, setProjectArr };
})();

export function findProjectIndex(project, arr = Project.getProject()) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === project) {
      return i;
    }
  }
}

export function checkProjectTitle(title, arr = Project.getProject()) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === title) {
      return true;
    }
  }
}
