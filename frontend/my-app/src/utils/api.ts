// src/utils/api.ts
export const fetchTasks = async () => {
    console.log("Inside fetchTasks");
    return fetch('/api/tasks').then(res => res.json());
};

export const fetchTask = async (id: number) => {
    console.log("Inside fetchTask");
    return fetch(`/api/tasks/${id}`).then(res => res.json());
};

export const createTask = async (task: { title: string, color: string }) => {
    console.log("Inside createTask: ", task);
    return fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
};

export const updateTask = async (id: number, task: { title: string, color: string, completed?: boolean }) => {
    console.log("Inside updateTask: ", id, task);
    return fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
};

export const deleteTask = async (id: number) => {
    console.log("Inside deleteTask");
    return fetch(`/api/tasks/${id}`, { method: 'DELETE' }).then(res => res.json());
};
