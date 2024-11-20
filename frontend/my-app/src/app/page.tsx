'use client';

import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTask, deleteTask } from '../utils/api';
import TaskCard from '../components/TaskCard';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchTasks().then((res) => setTasks(res.data));
    }, []);

    const handleToggle = (id: number) => {
        const task = tasks.find((t: any) => t.id === id) ?? { completed: false, title: '', color: '' };
        updateTask(id, { 
            title: task.title, 
            color: task.color, 
            completed: !task.completed 
        }).then(() => {
            fetchTasks().then((res) => setTasks(res.data));
        });
    };  

    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            deleteTask(id).then(() => {
                fetchTasks().then((res) => setTasks(res.data));
            });
        }
    };

    const handleCreateTask = () => {
        router.push('/create'); // Navigate to Create Task page
    };

    const handleEditTask = (id: number) => {
        router.push(`/edit/${id}`); // Navigate to Edit Task page
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task: any) => task.completed).length;

    return (
        <div>
            <div className="task-summary">
                <p>Tasks: {totalTasks}</p>
                <p>Completed: {completedTasks} of {totalTasks}</p>
            </div>

            <button onClick={handleCreateTask}>Create Task</button>

            <div>
                {tasks.map((task: any) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={handleEditTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;