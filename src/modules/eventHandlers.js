import { TaskObj, checkTaskTitle, findTaskIndex } from "./taskManager";
import { displayTask, displayProjects, projectSelectionOption, currentPageMark } from "./domUtils";
import { Project, findProjectIndex, checkProjectTitle } from "./projectManager";
import { CompletedProjects } from "./completedTasks";

const newTaskModal = document.querySelector("#newTaskModal");
const newTaskModalForm = document.querySelector("#newTaskModalForm");
let model = "create";
let T;

newTaskModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleField = document.querySelector("#title");
  const title = titleField.value.trim();
  const currentTitle = model === "edit" ? T : null;
  if (checkTaskTitle(title, currentTitle)) {
    titleField.setCustomValidity("Title already exists");
    titleField.reportValidity();
    return;
  }

  titleField.setCustomValidity("");

  const description = document.querySelector("#description").value.trim();
  const date = document.querySelector("#date").value;
  const priority = document.querySelector("#priority").value;

  if (model === "create") {
    const project = document.querySelector("#project-selector").value;
    const projectIndex = findProjectIndex(project);
    TaskObj.addTask(title, description, date, priority, project);
    displayTask([Project.getProject()[projectIndex]], "pr");
    document.querySelector(".page-text").textContent = Project.getProject()[projectIndex].title;
  } else if (model === "edit") {
    TaskObj.replaceTask(title, description, date, priority, T);
    model = "create";
    displayTask();
  }

  clearInput();
  newTaskModal.close();
});

const newTaskBtn = document.querySelector(".newTask");
const cancel = document.querySelector(".cancel");

newTaskBtn.addEventListener("click", () => {
  if (Project.getProject().length === 0) {
    showError();
    return;
  }
  projectSelectionOption();
  document.querySelector(".project-select").style.display = "flex";
  const today = new Date().toISOString().split("T")[0];
  document.querySelector("#date").setAttribute("min", today);
  newTaskModal.showModal();
});

cancel.addEventListener("click", (e) => {
  e.preventDefault();
  newTaskModal.close();
  clearInput();
  model = "create";
});

function clearInput() {
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#date").value = "";
}

function showError() {
  document.querySelector(".error").style.display = "flex";
  newTaskBtn.disabled = "true";
  setTimeout(() => {
    document.querySelector(".error").style.display = "none";
    newTaskBtn.removeAttribute("disabled");
  }, 3500);
}

const newProject = document.querySelector(".newProject");
const cancelP = document.querySelector(".cancelP");
const createProjectForm = document.querySelector("#createProjectForm");
const projectContainer = document.querySelector(".projectContainer");
let pModel = "create";
let i;

export function showProjectForm(model, projectName) {
  projectContainer.insertBefore(createProjectForm, projectContainer.firstChild);
  createProjectForm.style.display = "block";
  createProjectForm.querySelector("#project-name").focus();
  if (model === "edit") {
    document.querySelector("#project-name").value = projectName;
    pModel = "edit";
    i = findProjectIndex(projectName);
  }
}

newProject.addEventListener("click", showProjectForm);

cancelP.addEventListener("click", () => {
  document.querySelector("#project-name").value = "";
  projectContainer.removeChild(createProjectForm);
  pModel = "create";
});

createProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectField = document.querySelector("#project-name");
  const projectVal = projectField.value.trim();
  if (checkProjectTitle(projectVal)) {
    projectField.setCustomValidity("Project already exists");
    projectField.reportValidity();
    return;
  }
  projectField.setCustomValidity("");

  if (pModel === "create") {
    Project.createProject(projectVal);
    displayProjects();
    const projectIndex = findProjectIndex(projectVal);
    displayTask([Project.getProject()[projectIndex]], "pr");
    document.querySelector(".page-text").textContent = Project.getProject()[projectIndex].title;
  } else if (pModel === "edit") {
    Project.renameProject(projectVal, i);
    displayProjects();
    displayTask();

    pModel = "create";
  }
  projectField.value = "";
  createProjectForm.style.display = "none";
});

export function editTask(editEle) {
  const task = editEle.closest(".task");
  model = "edit";
  newTaskModal.showModal();
  T = task.querySelector(".task-title").textContent;
  document.querySelector("#title").value = T;
  document.querySelector("#description").value = task.querySelector(".task-desc").textContent;
  document.querySelector("#date").value = task.querySelector(".task-dueDate").textContent;
  const [a, b] = findTaskIndex(T);
  document.querySelector("#priority").value = Project.getProject()[a].todos[b].priority;
}

document.querySelector(".error__close").addEventListener("click", () => {
  document.querySelector(".error").classList.add("closing");
  setTimeout(() => {
    newTaskBtn.removeAttribute("disabled");
    document.querySelector(".error").style.display = "none";
    document.querySelector(".error").classList.remove("closing");
  }, 2000);
});

const pageText = document.querySelector(".page-text");

document.querySelector(".all-tasks").addEventListener("click", function () {
  pageText.textContent = "All";
  displayTask();
});

document.querySelector(".today-task").addEventListener("click", function () {
  pageText.textContent = "Today";
  displayTask(Project.getProject(), null, "today");
  currentPageMark(this);
});

document.querySelector(".scheduled-task").addEventListener("click", function () {
  pageText.textContent = "Scheduled";
  displayTask(Project.getProject(), null, "scheduled");
  currentPageMark(this);
});

document.querySelector(".completed-task").addEventListener("click", function () {
  pageText.textContent = "Completed";
  displayTask(CompletedProjects.getCompArr(), "comp");
  currentPageMark(this);
});
