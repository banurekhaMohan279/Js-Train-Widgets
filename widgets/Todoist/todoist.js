function Todoist() {
  const [currTask, setcurrTask] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [taskCount, setTaskCount] = React.useState({
    total: 0,
    unfinished: 0
  });

  function addTask() {
    event.preventDefault();
    let currentTask = {
      id: Math.random(0, 1),
      value: currTask,
      isDone: false
    };
    setTasks(prev => [...prev, currentTask]);
    setTaskCount(prev => ({
      ...prev,
      total: prev.total + 1,
      unfinished: prev.unfinished + 1
    }));
    console.log("tasks", tasks);
  }

  function deleteTask(id) {
    setTasks(
      tasks.map(item => (item.id == id ? { ...item, isDone: true } : item))
    );
    setTaskCount(prev => ({ ...prev, unfinished: prev.unfinished - 1 }));
  }

  function modifyCurrentTask(e) {
    setcurrTask(e.target.value);
  }

  return (
    <>
      <header>Todoist</header>
      <div className="todoist">
        <section className="taskBox">
          <form onSubmit={() => addTask()}>
            <input
              type="text"
              id="taskArea"
              name="taskArea"
              onChange={e => modifyCurrentTask(e)}
            />
            <input type="submit" value="Add Task" />
          </form>
        </section>
        <section className="tasklist">
          <p>
            {" "}
            {taskCount.unfinished} remaining out of {taskCount.total} tasks{" "}
          </p>
          <ul className="tasks">
            {tasks.map(item => (
              <li
                onClick={() => deleteTask(item.id)}
                key={item.id.toString()}
                className={item.isDone ? "isDone" : "isnotDone"}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <footer>All CopyRights Reserved</footer>
    </>
  );
}

ReactDOM.render(<Todoist />, document.getElementById("root"));
