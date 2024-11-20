import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialData = {} }: any) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [color, setColor] = useState(initialData.color || 'red');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, color });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
            </select>
            <button type="submit">Save</button>
        </form>
    );
};

export default TaskForm;
