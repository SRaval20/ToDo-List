import "../styles/taskCard.css";
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const TaskCard = ({ task, onToggle, onDelete, onEdit }: any) => {
    return (
        <div className={`tasks-list ${task.completed ? 'completed' : ''}`}>
            <input
                className="checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                style={task.completed
                    ? { backgroundColor: `${task.color}` }
                    : { border: `1px solid ${task.color}` }}
            />
            <h3 className="task-title" onClick={() => onEdit(task.id)}>{task.title}</h3>
            <DeleteIcon
                className="delete"
                onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
            />
        </div>
    );
};

export default TaskCard;