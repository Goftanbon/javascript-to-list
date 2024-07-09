

let task = document.querySelector(".question");
let container = document.querySelector(".todos");
let allTasks = document.querySelectorAll(".todos-single-task");
let todosEnd = document.querySelector(".todos-end");
let crosses = document.querySelectorAll(".cross");
let items = document.querySelector(".items-left");
let outside = document.querySelector("#outside");

let i = Number(items.textContent);

let child = Array.from(container.children).slice(0, -1);

let themeSwitch = document.querySelector(".switcher");
let bg = document.querySelector(".bg-image");
let bg_mobile = document.querySelector("#bg");

let all = document.querySelector("#all");
let active = document.querySelector("#active");
let completed = document.querySelector("#completed");
let clear = document.querySelector("#clear");

let darkTheme = true;

/* Theme Switcher */
themeSwitch.addEventListener("click", function () {
  darkTheme = !darkTheme;
  if (screen.width < 400) {
    outside.style.backgroundColor = darkTheme
      ? "hsl(235, 24%, 19%)"
      : "hsl(0, 0%, 98%)";
  }
  bg.classList.toggle("white-img");
  themeSwitch.src = darkTheme ? "images/icon-sun.svg" : "images/icon-moon.svg";

  document.querySelector("body").classList.toggle("second");
  container.classList.toggle("white");
  task.classList.toggle("white");
  todosEnd.classList.toggle("black-color");
  document.querySelector(".tip").classList.toggle("black-color");
});


/*Task cross and update and delete */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.check').forEach((checkElement) => {
      checkElement.addEventListener('click', () => {
        const taskElement = checkElement.nextElementSibling;
        const taskId = taskElement.getAttribute('data-id');
        fetch(`/update-task/${taskId}`, {
          method: 'PATCH',
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              taskElement.classList.toggle('crossed');
              window.location.reload();
            }
          })
          .catch(error => console.error('Error:', error));
      });
    });

    document.querySelectorAll('.cross').forEach((crossElement) => {
      crossElement.addEventListener('click', () => {
        const taskElement = crossElement.previousElementSibling;
        const taskId = taskElement.getAttribute('data-id');
        fetch(`/delete-task/${taskId}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              taskElement.parentElement.remove();
              window.location.reload();
            }
          })
          .catch(error => console.error('Error:', error));
      });
    });
  });

  //to make changes based on end of todos
  document.addEventListener('DOMContentLoaded', () => {
    const allBtn = document.getElementById('all');
    const activeBtn = document.getElementById('active');
    const completedBtn = document.getElementById('completed');
    const clearBtn = document.getElementById('clear');
    const todosContainer = document.querySelector('.todos');
    const itemleft = document.querySelector('.items-left');
  
    // Function to fetch data from server and update UI
    function fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(tasks => {
          // Clear existing tasks
          todosContainer.innerHTML = '';
  
          // Append new tasks
          tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('todos-single-task');
            taskElement.innerHTML = `
              <div class="check"></div>
              <p class="main-task ${task.isActive ? '' : 'crossed'}" data-id="${task._id}">${task.description}</p>
              <img class="cross" src="images/icon-cross.svg" alt="" />
            `;
            todosContainer.appendChild(taskElement);
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    // Event listeners for navigation and clear button
    allBtn.addEventListener('click', () => {
      window.location.reload();
      fetchData('/tasks/all');
    });
  
    activeBtn.addEventListener('click', () => {
      fetchData('/tasks/active');
    });
  
    completedBtn.addEventListener('click', () => {
      fetchData('/tasks/completed');
    });
    itemleft.addEventListener('click',()=>{
      fetchData('/tasks/taskleft');
    })
  
    clearBtn.addEventListener('click', () => {
      fetch('/tasks/clear-completed', {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            fetchData('/tasks/all'); // Refresh task list after deletion
            window.location.reload();
          } else {
            throw new Error('Failed to clear completed tasks');
          }
        })
        .catch(error => console.error('Error:', error));
    });
  
    // Initial fetch to load all tasks
    fetchData('/tasks/all');
  });
  



















































































































// task.addEventListener("keydown", function (e) {
//   if (e.key == "Enter" && task.value && i > 0) {
//     const Todo = `        
//     <div class="todos-single-task" draggable = "true">
//     <div class="check"></div>
//     <p class="main-task">${task.value}</p>
//     <img class="cross" src="images/icon-cross.svg" alt="" />
//     </div>
// `;
//     container.insertAdjacentHTML("afterbegin", Todo);
//     task.value = "";
//     i--;
//     items.textContent = i;
//     child = Array.from(document.querySelector(".todos").children).slice(0, -1);
//   }
// });

// container.addEventListener("click", (event) => {
//   // Check if the clicked target has the "cross" class
//   if (event.target.classList.contains("main-task")) {
//     event.target.previousElementSibling.classList.toggle("ticked");
//     event.target.classList.toggle("strike-through");
//   }
//   if (event.target.classList.contains("cross")) {
//     // DELETING TODO
//     const todo = event.target.parentNode;
//     todo.remove();
//     //DISPLAYING ITEMS LEFT
//     i++;
//     items.textContent = i;
//   }
//   if (event.target.classList.contains("check")) {
//     event.target.nextElementSibling.classList.toggle("strike-through");
//     event.target.classList.toggle("ticked");
//   }
// });

// //filtering

// all.addEventListener("click", function () {
//   all.nextElementSibling.classList.remove("selected");
//   all.nextElementSibling.nextElementSibling.classList.remove("selected");
//   all.classList.add("selected");
//   child.forEach((a) => {
//     a.classList.remove("hidden");
//   });
// });

// active.addEventListener("click", function () {
//   active.previousElementSibling.classList.remove("selected");
//   active.nextElementSibling.classList.remove("selected");
//   active.classList.add("selected");

//   //   child[0].children[0].classList.contains("ticked")
//   child.forEach((a) => {
//     if (a.children[0].classList.contains("ticked")) {
//       //   child.classList.toggle("hidden");
//       a.classList.add("hidden");
//     }
//     if (!a.children[0].classList.contains("ticked")) {
//       //   child.classList.toggle("hidden");
//       a.classList.remove("hidden");
//     }
//   });
// });

// completed.addEventListener("click", function () {
//   completed.previousElementSibling.classList.remove("selected");
//   completed.previousElementSibling.previousElementSibling.classList.remove(
//     "selected"
//   );
//   completed.classList.add("selected");
//   console.log(child.length);
//   child.forEach((a) => {
//     if (!a.children[0].classList.contains("ticked")) {
//       //   child.classList.toggle("hidden");
//       a.classList.add("hidden");
//     }
//     if (a.children[0].classList.contains("ticked")) {
//       //   child.classList.toggle("hidden");
//       a.classList.remove("hidden");
//     }
//   });
// });

// clear.addEventListener("click", function () {
//   child.forEach((a) => {
//     if (a.children[0].classList.contains("ticked")) {
//       //   child.classList.toggle("hidden");
//       a.remove("hidden");
//       i++;
//       items.textContent = i;
//     }
//   });
// });




//code for 404 page
/* 
To Customize Theme Color
*/

const colorSwitcher = document.querySelector("[data-theme-color-switch]");
let currentTheme = "light";

colorSwitcher.addEventListener("click", function () {
	const root = document.documentElement;

	if (currentTheme == "dark") {
		root.style.setProperty("--bg-color", "#fff");
		root.style.setProperty("--text-color", "#000");
		colorSwitcher.textContent = "\u{1F319}";
		currentTheme = "light";
	} else {
		root.style.setProperty("--bg-color", "#050505");
		root.style.setProperty("--text-color", "#fff");
		colorSwitcher.textContent = "\u{2600}";
		currentTheme = "dark";
	}

	colorSwitcher.setAttribute("data-theme", currentTheme);
});