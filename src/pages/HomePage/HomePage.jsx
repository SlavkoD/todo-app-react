import { useEffect, useState } from "react";
import { fetchTask } from "../../api/tasksApi";
import TaskItem from "../../components/TaskItem/TaskItem";
import "./HomePage.css";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Posao");
  const [filter, setFilter] = useState("");

  /*useEffect(() => {
    fetchTask().then((data) => {
      const apiTask = data.map((task) => ({
        ...task,
        category: "API",
        local: false,
      }));
      setTasks(apiTask);
    });
  }, []); */

  useEffect(() => {
    const savedLocalTask = JSON.parse(localStorage.getItem("localTasks")) || [];

    fetchTask().then((data) => {
      const apiTask = data.map((task) => ({
        ...task,
        category: "API",
        local: false,
      }));
      setTasks([...apiTask, ...savedLocalTask]);
    });
  }, []);

  const addTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      category,
      local: true,
    };
    //setTasks((prev) => [...prev, newTask]);
    //setTitle("");
    setTasks((prev) => {
      const updated = [...prev, newTask];
      localStorage.setItem(
        "localTasks",
        JSON.stringify(updated.filter((t) => t.local))
      );
      return updated;
    });
    setTitle("");
  };

  const filteredTask = filter
    ? tasks.filter((task) => task.category === filter)
    : tasks;

  const toggleComplete = (id) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem(
        "localTasks",
        JSON.stringify(updated.filter((t) => t.local))
      );
      return updated;
    });
  };
  /*const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => !(task.id === id && task.local)));
  };*/

  const deleteTask = (id) => {
    setTasks((prev) => {
      const updated = prev.filter((task) => !(task.id === id && task.local));
      localStorage.setItem(
        "localTasks",
        JSON.stringify(updated.filter((t) => t.local))
      );
      return updated;
    });
  };

  return (
    <div className="home-container">
      <h1>To-Do</h1>

      <div className="add-task">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Naziv zadatka"
        ></input>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Posao">Posao</option>
          <option value="Osobno">Osobno</option>
          <option value="Obitelj">Obitelj</option>
        </select>
        <button onClick={addTask}>Dodaj</button>
      </div>

      <div className="filter">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Sve</option>
          <option value="API">API</option>
          <option value="Posao">Posao</option>
          <option value="Osobno">Osobno</option>
          <option value="Obitelj">Obitelj</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTask.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleComplete}
            onDelete={deleteTask}
          ></TaskItem>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
