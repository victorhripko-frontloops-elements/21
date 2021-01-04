import './style.scss';

(() => {
  const root = document.querySelector('.app');
  const input = root.querySelector('.js-input');
  const addTask = root.querySelector('.js-add-task');
  const resetTasks = root.querySelector('.js-reset-tasks');
  const body = root.querySelector('.task-list');

  let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

  function createTask(taskContent) {
    const task = {
      id: new Date().toISOString(),
      content: taskContent,
      done: false
    };

    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify( taskList ));
    render();
  };

  function render() {
    body.innerHTML = null;

    taskList.forEach((el) => {
      const div = document.createElement('div');

      div.className = `${el.done ? 'task is-active' : 'task'}`;
      div.textContent = el.content;

      body.append(div);

      div.addEventListener('click', () => {
        el.done = !el.done;
        div.classList.toggle('is-active', el.done);
        localStorage.setItem('taskList', JSON.stringify( taskList ));
      })
    })
  };

  input.onkeypress = (e) => {
    if ( e.keyCode === 13 ) addTaskToList();
  };

  function addTaskToList() {
    const val = input.value.trim();
    if (!val) return;
    createTask(val);
    input.value = null;
  }


  function clearTasks() {
    body.innerHTML = null;
    localStorage.removeItem('taskList');
    taskList = [];
  };


  resetTasks.addEventListener('click', clearTasks);
  addTask.addEventListener('click', addTaskToList);

  render();
})();
