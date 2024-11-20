// src/components/TaskCard.tsx
import React from 'react';

const TaskCard = ({ task, onToggle, onDelete, onEdit }: any) => {
    return (
        <div className="task-card" onClick={() => onEdit(task.id)}>
            <h3>{task.title}</h3>
            <label>
                <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => onToggle(task.id)} 
                />
                Completed
            </label>
            <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</button>
        </div>
    );
};

export default TaskCard;
