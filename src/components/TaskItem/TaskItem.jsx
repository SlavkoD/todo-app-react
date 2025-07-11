import { useState } from "react";
import { Link } from "react-router-dom";
import "./TaskItem.css";

function TaskItem({ task, onToggle, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
    setShowModal(false);
  };

  return (
    <>
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
          <button onClick={() => setShowModal(true)} className="delete-btn">
            Obriši
          </button>
        )}
        <Link
          to={`/api-todo/${task.id}`}
          state={{ task }}
          className="details-link"
        >
          Detalji
        </Link>
      </li>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Jeste li sigurni da želite obrisati ovaj zadatak?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete}>Da, obriši</button>
              <button onClick={() => setShowModal(false)}>Odustani</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskItem;
