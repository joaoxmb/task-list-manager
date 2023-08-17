let tasks = [
  {
    checked: false,
    msg: "Test first task"
  }
];
const tasksList = $("#tasksList");
const form = $("#new-task");
const openForm = $("#open-form");
const inputNewTask = $("#newTask-input");
const checkBox = $(".checkbox");

openForm.on("click", () => {
  if (form.css('display') == "block") {
    form.css("display", "none");
  } else {
    form.css("display", "block");
    inputNewTask.focus();
  }
})

form.on("submit", (e) => {
  e.preventDefault();
  const task = inputNewTask.val();

  if (task != "") {
    // apend to array
    tasks.push({
      checked: false,
      msg: task
    });
    load_tasks(tasks);

    form[0].reset();
    form.css("display", "none");
  }
});

function handle_check(index) {
  const value = tasks[index].checked;
  tasks[index].checked = value ? false : true;

  load_status(tasks);
}

function load_status(tasks) {
  const count = tasks.reduce((previus, current) => {
      if (!current.checked) {
        previus += 1;
        return previus
      } else {
        return previus
      }
    }, 0) | 0;
  
    $("#notComplete-count").html(count);
}

function load_tasks(tasks) {
  tasksList.html("");
  tasks.reverse().map((item, count) => {
    const {checked, msg} = item;
    $(`
      <li>
        <label>
          <input type="checkbox" onclick="handle_check(${count});" ${checked ? "checked" : ""}/>
          <span class="checkmark"></span>
          <p>
            ${msg}
          </p>
        </label>
      </li>
    `).appendTo(tasksList)
  })
  load_status(tasks);
}

load_tasks(tasks);