import { Link } from "react-router-dom";
import "./TaskItem.css";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.completed ? "completed" : ""}>
        {task.title} ({task.category})
      </span>
      {task.local && (
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          Obriši
        </button>
      )}
      {
        /*<Link to={`/api-todo/${task.id}`} className="details-link">
          Detalji
        </Link>*/

        <Link
          to={`/api-todo/${task.id}`}
          state={{ task }}
          className="details-link"
        >
          Detalji
        </Link>
      }
    </li>
  );
}

export default TaskItem;
