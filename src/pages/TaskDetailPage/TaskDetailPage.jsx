/*import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTaskById } from "../../api/tasksApi";*/
import { useLocation, useNavigate } from "react-router-dom";
import "./TaskDetailPage.css";

function TaskDetailPage() {
  //const { id } = useParams();
  //const [task, setTask] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  if (!task) return <p>Zadatak nije pronađen</p>;

  //useEffect(() => {
  //fetchTaskById(id).then((data) => setTask(data));
  //}, [id]);

  //if (!task) return <p>Učitavanje...</p>;

  return (
    <div className="task-detail">
      <h2>Detalji zadatka</h2>
      <p>
        <strong>ID:</strong>
        {task.id}
      </p>
      <p>
        <strong>Naslov:</strong> {task.title}
      </p>

      <p>
        <strong>Status:</strong>
        {task.completed ? "Dovršen" : "Nije dovršen"}
      </p>
      <button onClick={() => navigate("/")}>Natrag</button>
    </div>
  );
}

export default TaskDetailPage;
