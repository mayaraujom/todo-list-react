import { useState, useEffect } from 'react';

const MIN_LENGTH = 5;
const MAX_LENGTH = 30;

function List() {
  const [input, setInput] = useState('');
  const [tasksList, setTaskList] = useState([]);
  const [tasksToRender, setToRender] = useState([]);
  const [editing, setEditingStatus] = useState(false);
  const [idEdit, setIdEdit] = useState('');

  useEffect(() => {
    setToRender([...tasksList]);
  }, [tasksList]);

  function addTasks() {
    if (input.length >= MIN_LENGTH && MAX_LENGTH >= input.length) {
      const newTask = {
        task: input,
        id: (tasksList.length - 1) + 1,
        todo: true,
        completed: false,
      }
      setTaskList([...tasksList, newTask]);
      setInput('');
    }
    if (MIN_LENGTH > input.length) {
      alert('Texto muito pequeno');
    }

    if (input.length > MAX_LENGTH) {
      alert('Texto muito grande');
    }
  }

  function taskFilter({ target: { value } }) {
    if (value === 'viewAll') {
      setToRender(tasksList);
    }
    if (value === 'completed') {
      const completedTasks = tasksList
        .filter((task) => task.completed === true);
      setToRender(completedTasks)
    }
    if (value === 'to-do') {
      const completedTasks = tasksList
        .filter((task) => task.todo === true);
      setToRender(completedTasks)
    }
  }

  function completedTask(id) {
    const currentTask = tasksList.find((item) => item.id === id);
    const newList = tasksList.map((tsk) => {
      if (tsk.id === id) {
        tsk = {
          completed: true,
          id: currentTask.id,
          task: currentTask.task,
          todo: false,
        };
      } return tsk;
    });
    setTaskList(newList);
  }

  function editingTask(id) {
    setEditingStatus(true);
    const currentTask = tasksList.find((item) => item.id === id);
    setInput(currentTask.task);
    setIdEdit(id);
  }

  function addEditTask() {
    const currentTask = tasksList.find((item) => item.id === idEdit);
    const newTaskList = tasksList.map((tsk) => {
      if (tsk.id === idEdit) {
        tsk = {
          completed: false,
          id: currentTask.id,
          task: input,
          todo: true,
        };
      } return tsk;
    });
    setTaskList(newTaskList);
    setEditingStatus(false);
    setInput('');
  }

  function deleteTask(id) {
    const newTaskList = tasksList.filter((task) => task.id !== id);
    setTaskList(newTaskList);
  }

  return (
    <section className="section-list">
      <h1>What needs to be done?</h1>
      <div className="tasks-input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Write your tasks here"
          value={input}
          onChange={({ target }) => { setInput(target.value) }}
        />
        {
          editing ? (
            <img
              src="https://i.ibb.co/znks9Ff/icons8-add-100.png"
              alt="icon by https://icons8.com"
              onClick={addEditTask}
            />
          ) : (
            <img
              src="https://i.ibb.co/znks9Ff/icons8-add-100.png"
              alt="icon by https://icons8.com"
              onClick={addTasks}
            />
          )
        }
      </div>
      <div className="view-options-container">
        <input type="radio" id="view-options1"
          name="view-options" value="viewAll" defaultChecked onChange={(e) => taskFilter(e)} />
        <label htmlFor="optionAll">View All</label>
        <input type="radio" id="view-options2"
          name="view-options" value="to-do" onChange={(e) => taskFilter(e)} />
        <label htmlFor="optionTodo">To-Do</label>
        <input type="radio" id="view-options3"
          name="view-options" value="completed" onChange={(e) => taskFilter(e)} />
        <label htmlFor="optionCompleted">Completed</label>
      </div>
      <div className="tasks-container">
        {
          tasksToRender.map(({ task, id, todo }) => (
            todo ? (
              <div className="todo-container" key={id}>
                <p>{task}</p>
                <div>
                  <img
                    src="https://i.ibb.co/XYcYrVz/icons8-edit-64.png"
                    alt="icon by https://icons8.com"
                    onClick={() => { editingTask(id) }}
                  >
                  </img>
                  <img
                    src="https://i.ibb.co/wWL8Nv4/icons8-done-64.png"
                    alt="icon by https://icons8.com"
                    onClick={() => { completedTask(id) }}
                  />
                  <img
                    src="https://i.ibb.co/5YBG0R7/icons8-delete-64.png"
                    alt="icon by https://icons8.com"
                    onClick={() => { deleteTask(id) }}
                  />
                </div>
              </div>
            ) : (
              <div className="completed-container" key={id}>
                <p>{task}</p>
                <img
                  src="https://i.ibb.co/5YBG0R7/icons8-delete-64.png"
                  alt="icon by https://icons8.com"
                  onClick={() => { deleteTask(id) }}
                />
              </div>
            )
          ))
        }
      </div>
    </section>
  );
}

export default List;