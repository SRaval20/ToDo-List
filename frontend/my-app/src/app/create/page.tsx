'use client';

import "../../styles/createTask.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '../../utils/api';
import Header from '../../components/Header';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const router = useRouter();
    const colorList = ['#f53422', '#f77a0c', '#dbb704', '#45a307',
        '#1476d9', '#564bd1', '#b95eff', '#ed1aa3', '#9e8765'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const taskData = { title, color: color || '#f53422' };
        try {
            // Create a task
            await createTask(taskData);

            // Redirect to the task list page
            router.push('/');
        } catch (err) {
            // Optionally show an error message to the user
            console.error('Error submitting task:', err);
        }
    };

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <div className="create-task-home">
            <form onSubmit={handleSubmit}>

                <Header />

                <div className="arrow">
                    <ArrowBackIcon type="button" className="back" onClick={handleCancel} />
                </div>

                <div className="task-items">
                    <label>Title:</label>
                    <div style={{ width: '100vh' }}>
                        <input
                            type="text"
                            value={title}
                            placeholder="Ex: Brush your teeth"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="task-items">
                    <label>Color:</label>
                    <div style={{ width: '100vh' }} className="color-picker">
                        {colorList.map((clr) => (
                            <div
                                key={clr}
                                className={`color-circle ${color === clr ? 'selected' : ''}`}
                                style={{ backgroundColor: clr }}
                                onClick={() => setColor(clr)}
                            ></div>
                        ))}
                    </div>
                </div>

                <button className="add-task" type="submit">
                    Add Task
                    <span> </span>
                    <AddCircleOutlineIcon className="symbol" />
                </button>

            </form>
        </div>
    );
};

export default CreateTask;
