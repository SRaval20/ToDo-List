'use client';
import "../../../styles/createTask.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Check from '@mui/icons-material/Check';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchTask, updateTask } from '@/utils/api';
import Header from '../../../components/Header';

const EditTask = () => {
    const params = useParams();
    const router = useRouter();

    // Ensure `id` is parsed as a number from the params
    const id = params?.id ? parseInt(params.id as string, 10) : null;

    const [title, setTitle] = useState('');
    const [color, setColor] = useState('red');
    const [loading, setLoading] = useState(true);
    const colorList = ['#f53422', '#f77a0c', '#dbb704', '#45a307',
        '#1476d9', '#564bd1', '#b95eff', '#ed1aa3', '#9e8765'];

    useEffect(() => {
        if (id) {
            fetchTask(id)
                .then((task) => {
                    setTitle(task.title || '');
                    setColor(task.color || 'red');
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching task:', err);
                    setLoading(false);
                });
        } else {
            console.error('Invalid task ID');
            setLoading(false);
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            updateTask(id, { title, color })
                .then(() => {
                    // Navigate back to the home page
                    router.push('/');
                })
                .catch((err) => {
                    console.error('Error updating task:', err);
                });
        }
    };

    const handleCancel = () => {
        router.push('/');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

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
                            style={{ color: 'white' }}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task Title"
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
                    Save
                    <span> </span>
                    <Check className="symbol" />
                </button>

            </form>
        </div>
    );
};

export default EditTask;