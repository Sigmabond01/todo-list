import { displayProjects } from "./dom";

let projects = [
  {
    title: "Default",
    todos: [],
  },
];

export const Project = (function () {
  function createProject(title) {
    const project = { title, todos: [] };
    projects.push(project);
    displayProjects();
  }

  function deleteProject(index) {
    projects.splice(index, 1);
  }

  function addTaskToProject(obj, index = 0) {
    projects[index].todos.push(obj);
    console.log(projects);
  }

  function removeTaskFromProject(index, taskIndex) {
    projects[index].todos.splice(taskIndex, 1);
  }

  function getProject() {
    return projects;
  }
  return { createProject, deleteProject, addTaskToProject, removeTaskFromProject, getProject };
})();

// Project.createProject("IDK");
