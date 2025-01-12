import { Project, findProjectIndex, checkProjectTitle } from "./projectManager";
import { TaskObj, findTaskIndex } from "./taskManager";
import { saveToLocalStorage } from "./localStorageHelper";

export const CompletedProjects = (function () {
  let compProjArr = [];

  function addTask(ele) {
    const taskEle = ele.closest(".task");
    const taskTitle = taskEle.querySelector(".task-title").textContent;

    const [i, j] = findTaskIndex(taskTitle);
    const arr = Project.getProject()[i];
    const task = arr.todos[j];
    const projectTitle = arr.title;

    if (checkProjectTitle(projectTitle, compProjArr)) {
      // Do Nothing!
    } else {
      createCProject(projectTitle);
    }

    const projectIndex = findProjectIndex(projectTitle, compProjArr);
    addCTaskToProject(task, projectIndex);

    TaskObj.deleteTask(i, j);
    ele.checked = true;
    saveToLocalStorage("compProjArray", compProjArr);
  }

  function createCProject(title) {
    const project = { title, todos: [] };
    compProjArr.push(project);
  }

  function deleteCProject(title) {
    const index = findProjectIndex(title, compProjArr);
    compProjArr.splice(index, 1);
    saveToLocalStorage("compProjArray", compProjArr);
  }

  function addCTaskToProject(task, index) {
    compProjArr[index].todos.push(task);
  }

  function deleteCTask(index, taskIndex) {
    compProjArr[index].todos.splice(taskIndex, 1);
    if (compProjArr[index].todos.length === 0) deleteCProject(compProjArr[index].title);
    saveToLocalStorage("compProjArray", compProjArr);
  }

  function undoCompletion(obj, title) {
    const projectIndex = findProjectIndex(title);
    Project.addTaskToProject(obj, projectIndex);
    saveToLocalStorage("compProjArray", compProjArr);
  }

  function getCompArr() {
    return compProjArr;
  }

  function setCompArr(arr) {
    compProjArr = arr;
  }

  function clearTasks() {
    compProjArr = [];
    saveToLocalStorage("compProjArray", compProjArr);
  }

  return { deleteCProject, addTask, deleteCTask, undoCompletion, getCompArr, setCompArr, clearTasks };
})();
