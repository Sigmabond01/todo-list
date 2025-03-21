import { Project } from "./projectManager";
import { TaskObj, findTaskIndex } from "./taskManager";
import { CompletedProjects } from "./completedTasks";
import { editTask, showProjectForm } from "./eventHandlers";
import { parseISO, isToday, isAfter, compareAsc } from "date-fns";
import editIcon from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";
import moreIcon from "../images/dots-vertical.svg";

const taskContainer = document.querySelector(".taskContainer");

export function displayTask(arr = Project.getProject(), inst, filter = "all") {
  clearChild(taskContainer);

  if (inst === "comp") {
    const removeAllBtn = document.createElement("button");
    removeAllBtn.classList.add("remove-all");
    removeAllBtn.textContent = "Remove all Tasks";
    removeAllBtn.addEventListener("click", () => {
      CompletedProjects.clearTasks();
      displayTask(CompletedProjects.getCompArr(), "comp");
    });
    taskContainer.appendChild(removeAllBtn);
  }

  if (filter === "all" && inst !== "comp" && inst !== "pr") {
    document.querySelector(".page-text").textContent = "All";
    currentPageMark(document.querySelector(".all-tasks"));
  }

  const today = new Date();

  for (let i = 0; i < arr.length; i++) {
    let filteredTodos = arr[i].todos.filter((todo) => {
      const todoDate = parseISO(todo.dueDate);
      if (filter === "today") return isToday(todoDate);
      if (filter === "scheduled") return isAfter(todoDate, today);
      return true;
    });

    if (filter === "scheduled") {
      filteredTodos = filteredTodos.sort((a, b) => {
        const dateA = parseISO(a.dueDate);
        const dateB = parseISO(b.dueDate);
        return compareAsc(dateA, dateB);
      });
    }
    if (inst === "pr") {
      const prName = arr[i].title;
      const projectItems = document.querySelectorAll(".project-item");
      for (let item of projectItems) {
        const nameElement = item.querySelector(".projectName");
        if (nameElement && nameElement.textContent.trim() === prName) {
          currentPageMark(item);
        }
      }
    }
    if (filteredTodos.length > 0) {
      if (inst === "pr") {
      } else {
        const prName = document.createElement("div");
        prName.classList.add("pr-name");
        prName.textContent = arr[i].title;
        taskContainer.appendChild(prName);
      }

      filteredTodos.forEach((todo, j) => {
        const task = document.createElement("div");
        task.classList.add("task");

        const checkContainer = document.createElement("label");
        const check = document.createElement("input");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 64 64");
        svg.setAttribute("height", "1em");
        svg.setAttribute("width", "1em");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute(
          "d",
          "M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
        );
        path.setAttribute("pathLength", "575.0541381835938");
        path.classList.add("path");
        checkContainer.classList.add("checkContainer");
        check.type = "checkbox";
        check.id = "checked";
        if (inst === "comp") {
          check.checked = true;
          task.classList.add("completed");
          task.classList.add("line-through");
        }
        check.addEventListener("change", () => {
          if (check.checked) {
            check.disabled = true;
            task.classList.add("line-through");
            setTimeout(() => {
              CompletedProjects.addTask(check);
              check.disabled = false;
              displayTask(arr, inst, filter);
            }, 600);
          } else {
            check.disabled = true;
            task.classList.remove("line-through");
            setTimeout(() => {
              check.disabled = false;
              CompletedProjects.undoCompletion(todo, arr[i].title);
              CompletedProjects.deleteCTask(i, j);
              displayTask(arr, "comp");
            }, 600);
          }
        });

        const title = document.createElement("div");
        title.classList.add("task-title");
        title.textContent = todo.title;
        title.title = title.textContent;

        const description = document.createElement("div");
        description.classList.add("task-desc");
        description.textContent = todo.description;

        const dueDate = document.createElement("div");
        dueDate.classList.add("task-dueDate");
        dueDate.textContent = todo.dueDate;

        const edit = document.createElement("img");
        edit.classList.add("edit-task");
        edit.src = editIcon;
        if (inst === "comp") {
          edit.style.display = "none";
        }
        edit.addEventListener("click", () => {
          document.querySelector(".project-select").style.display = "none";
          editTask(edit);
        });

        const deleteBtn = document.createElement("img");
        deleteBtn.classList.add("delete-task");
        deleteBtn.src = deleteIcon;
        deleteBtn.addEventListener("click", () => {
          if (inst === "comp") {
            CompletedProjects.deleteCTask(i, j);
            displayTask(arr, "comp");
          } else {
            const [a, b] = findTaskIndex(todo.title);
            TaskObj.deleteTask(a, b);
            displayTask(arr, inst, filter);
          }
        });

        if (todo.priority === "high") {
          task.classList.add("high-priority");
        } else if (todo.priority === "medium") {
          task.classList.add("medium-priority");
        } else {
          task.classList.add("low-priority");
        }

        const taskMainSec = document.createElement("div");
        taskMainSec.classList.add("task-main-section");

        const taskMainSecContent = document.createElement("div");
        taskMainSecContent.classList.add("task-main-section-content");

        const taskBtnSec = document.createElement("div");
        taskBtnSec.classList.add("task-btn-section");

        svg.appendChild(path);
        checkContainer.appendChild(check);
        checkContainer.appendChild(svg);
        task.appendChild(checkContainer);
        taskMainSecContent.appendChild(title);
        taskMainSecContent.appendChild(description);
        taskMainSec.appendChild(taskMainSecContent);
        taskMainSec.appendChild(dueDate);
        task.appendChild(taskMainSec);
        taskBtnSec.appendChild(edit);
        taskBtnSec.appendChild(deleteBtn);
        task.appendChild(taskBtnSec);
        taskContainer.appendChild(task);
      });
    }
  }
}

const projectContainer = document.querySelector(".projectContainer");

export function displayProjects() {
  clearChild(projectContainer);

  for (let i = 0; i < Project.getProject().length; i++) {
    const project = document.createElement("div");
    const moreBtn = document.createElement("img");
    const projectItem = document.createElement("div");

    moreBtn.classList.add("more-btn");
    projectItem.classList.add("project-item");
    project.classList.add("projectName");
    project.textContent = Project.getProject()[i].title;
    projectItem.addEventListener("click", function () {
      document.querySelector(".page-text").textContent = project.textContent;
      displayTask([Project.getProject()[i]], "pr");
      currentPageMark(this);
    });

    moreBtn.src = moreIcon;
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = createMenu();
      const rect = moreBtn.getBoundingClientRect();
      menu.style.top = `${rect.top + window.scrollY - 2}px`;
      menu.style.left = `${rect.left + rect.width}px`;
      menu.classList.remove("hidden");

      const editBtn = menu.querySelector("button:nth-child(1)");
      editBtn.addEventListener("click", () => {
        showProjectForm("edit", project.textContent);
      });

      const deleteBtn = menu.querySelector("button:nth-child(2)");
      deleteBtn.addEventListener("click", () => {
        Project.deleteProject(i);
        displayProjects();
        displayTask();
        CompletedProjects.deleteCProject(project.textContent);
        menu.classList.add("hidden");
        menu.remove();
      });
    });

    projectItem.appendChild(project);
    projectItem.appendChild(moreBtn);
    projectContainer.appendChild(projectItem);
  }

  document.addEventListener("click", () => {
    const menu = document.querySelector(".moreMenu");
    if (!menu) {
    } else {
      menu.classList.add("hidden");
      menu.remove();
    }
  });
}

function clearChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const projectSelectorContainer = document.querySelector("#project-selector");
export function projectSelectionOption() {
  clearChild(projectSelectorContainer);
  for (let i = 0; i < Project.getProject().length; i++) {
    const option = document.createElement("option");
    option.textContent = Project.getProject()[i].title;
    projectSelectorContainer.appendChild(option);
  }
}

function createMenu() {
  let menu = document.querySelector(".moreMenu");
  if (!menu) {
    menu = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const editImg = document.createElement("img");
    const deleteImg = document.createElement("img");
    const editText = document.createElement("span");
    const deleteText = document.createElement("span");

    menu.classList.add("moreMenu");
    menu.classList.add("hidden");
    editImg.classList.add("edit-project");
    deleteImg.classList.add("delete-project");

    editImg.src = editIcon;
    deleteImg.src = deleteIcon;

    editText.textContent = "Edit";
    deleteText.textContent = "Delete";

    editBtn.appendChild(editImg);
    editBtn.appendChild(editText);
    deleteBtn.appendChild(deleteImg);
    deleteBtn.appendChild(deleteText);
    menu.appendChild(editBtn);
    menu.appendChild(deleteBtn);
    document.body.appendChild(menu);
  }
  return menu;
}

export function currentPageMark(page) {
  document.querySelector(".currentPageMark")?.classList.remove("currentPageMark");
  if (page instanceof Element) page.classList.add("currentPageMark");
}
