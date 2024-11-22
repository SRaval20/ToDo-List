// frontend/my-app/src/app/page.tsx

'use client';

import "../styles/app.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTask, deleteTask } from '../utils/api';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchTasks().then((res) => {
            if (Array.isArray(res)) {
                setTasks(res); // Make sure tasks is an array
            } else {
                setTasks([]); // Fallback to an empty array if the response is not an array
            }
        });
    }, []);

    const handleToggle = (id: number) => {
        const task = tasks.find((t: any) => t.id === id) ?? { completed: false, title: '', color: '' };
        updateTask(id, {
            title: task.title,
            color: task.color,
            completed: !task.completed
        }).then(() => {
            setTasks((prevTasks: any[]) =>
                prevTasks.map((t) =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                )
            );
        })
            .catch((err) => {
                console.error('Error updating task:', err);
            });
    };

    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            deleteTask(id).then(() => {
                fetchTasks().then((res) => {
                    if (Array.isArray(res)) {
                        setTasks(res);
                    }
                });
            });
        }
    };

    const handleCreateTask = () => {
        router.push('/create'); // Navigate to Create Task page
    };

    const handleEditTask = (id: number) => {
        router.push(`/edit/${id}`); // Navigate to Edit Task page
    };

    const totalTasks = tasks?.length || 0;
    const completedTasks = tasks?.filter((task: any) => task.completed).length || 0;

    return (
        <div className="home-tasks">

            <Header />

            <button className="create-task" onClick={handleCreateTask}>Create Task<span> </span><AddCircleOutlineIcon className="symbol" /></button>

            <div className="task-summary">
                <p className="p-tasks">Tasks:
                    <span className="count-bkg"> {totalTasks} </span>
                </p>
                <p className="p-completed">Completed:
                    <span className="count-bkg"> {completedTasks} of {totalTasks} </span>
                </p>
            </div>

            <div className="tasks">
                {tasks && tasks.length > 0 ? (
                    tasks.map((task: any) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onEdit={handleEditTask}
                        />
                    ))
                ) : (
                    <div className="no-tasks">
                        <hr className="no-tasks-line" />
                        <AssignmentOutlinedIcon className="no-tasks-icon"/>
                        <div className="no-tasks-text"><b>You don't have any tasks registered yet.</b></div>
                        <div className="no-tasks-text">Create tasks and organize your to-do items.</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;