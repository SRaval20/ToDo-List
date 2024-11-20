'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchTask, createTask, updateTask } from '../../utils/api';

const CreateEditTask = () => {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('red');
    const router = useRouter();

    // Get the params from the URL
    const params = useParams();
    
    // Ensure that `id` is treated as a number and handle cases where it's an array
    const id = Array.isArray(params?.id) ? Number(params.id[0]) : params?.id ? Number(params.id) : undefined;

    // Fetch existing task for editing if `id` exists
    useEffect(() => {
        if (id) {
            fetchTask(id).then((res) => {
                const task = res.data;
                setTitle(task.title);
                setColor(task.color);
            }).catch((err) => {
                // Handle error if task fetch fails (e.g., invalid id)
                console.error('Error fetching task:', err);
            });
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const taskData = { title, color };
        if (id !== undefined) {
            // Editing existing task
            updateTask(id, taskData).then(() => router.push('/'));
        } else {
            // Creating new task
            createTask(taskData).then(() => router.push('/'));
        }
    };

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Edit Task' : 'Create Task'}</h2>

            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Color:</label>
                <select value={color} onChange={(e) => setColor(e.target.value)}>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
            </div>

            <button type="submit">{id ? 'Save Task' : 'Create Task'}</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    );
};

export default CreateEditTask;
