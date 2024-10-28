import { TaskObj } from "./task";
import { displayTask, displayProjects, projectSelectionOption } from "./dom";
import { Project } from "./projects";

const button = document.querySelector("#createTask");
const newTaskModal = document.querySelector("#newTaskModal");

button.addEventListener("click", (e) => {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const priority = document.querySelector("#priority").value;
  const project = document.querySelector("#project-selector").value;
  e.preventDefault();
  if (!title || !description || !date) {
    return;
  } else TaskObj.addTask(title, description, date, priority, project);
  displayTask();
  clearInput();
  newTaskModal.close();
});

const newTaskBtn = document.querySelector(".newTask");
const cancel = document.querySelector(".cancel");

newTaskBtn.addEventListener("click", () => {
  projectSelectionOption();
  newTaskModal.showModal();
});

cancel.addEventListener("click", (e) => {
  e.preventDefault();
  newTaskModal.close();
});

function clearInput() {
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const date = document.querySelector("#date");
  title.value = "";
  description.value = "";
  date.value = "";
}

const newProject = document.querySelector(".newProject");
const newProjectModal = document.querySelector("#newProjectModal");
const cancelP = document.querySelector(".cancelP");
const createProjectBtn = document.querySelector("#createProject");

newProject.addEventListener("click", () => {
  newProjectModal.showModal();
});

cancelP.addEventListener("click", () => {
  newProjectModal.close();
  document.querySelector("#project-name").value = "";
});

createProjectBtn.addEventListener("click", () => {
  const projectName = document.querySelector("#project-name");
  if (!projectName.value) return;
  else Project.createProject(projectName.value);
  newProjectModal.close();
  projectName.value = "";
});
