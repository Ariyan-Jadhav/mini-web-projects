document.addEventListener("DOMContentLoaded", function () {
  const xtodoinput = document.getElementById("todoinput");
  const xtodobutton = document.getElementById("todobutton");
  const xtodoul = document.getElementById("todoul");
  const xheading = document.getElementById("heading");

  setInterval(function () {
    xheading.classList.add("flipHeading");
    setTimeout(function () {
      xheading.classList.remove("flipHeading");
    }, 1000);
  }, 5000);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTasks(task));

  xtodobutton.addEventListener("click", () => {
    const taskText = xtodoinput.value.trim();
    if (taskText === "") return;
    const newtask = {
      id: Date.now(),
      text: taskText,
      isCompleted: false,
    };
    tasks.push(newtask);
    saveTasks();
    renderTasks(newtask);
    xtodoinput.value = "";
    console.log(tasks);
  });

  function renderTasks(task) {
    const li = document.createElement("li");

    if (task.isCompleted) li.classList.add("tskcom");

    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    xtodoul.append(li);

    li.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("tskcom");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", function (e) {
      e.stopPropagation();
      tasks = tasks.filter((x) => x.id !== task.id);
      li.remove();
      saveTasks();
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  xtodoinput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") xtodobutton.click();
  });
});
