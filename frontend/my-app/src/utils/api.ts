// src/utils/api.ts
export const fetchTasks = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/tasks');

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        return data; // Ensure this returns the correct structure
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return []; // Return an empty array if there's an error
    }
};

export const fetchTask = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:4000/api/tasks/${id}`, { method: 'PUT' });

        if (!response.ok) {
            throw new Error(`Failed to fetch task with id: ${id}`);
        }

        const task = await response.json();
        return task;
    } catch (error) {
        console.error("Error in fetchTask: ", error);
        throw error;
    }
};

export const createTask = async (task: { title: string, color: string }) => {
    try {
        const response = await fetch('http://localhost:4000/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to create task');
        }

        const newTask = await response.json();
        return newTask;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error; // Re-throwing the error for the calling function to handle
    }
};

export const updateTask = async (id: number, task: { title: string, color: string, completed?: boolean }) => {
    try {
        const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Failed to update task with id: ${id}`);
        }

        const updatedTask = await response.json();
        return updatedTask;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error; // Re-throwing the error for the calling function to handle
    }
};

export const deleteTask = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Failed to delete task with id: ${id}`);
        }

        return response.status === 200; // Returns true if the deletion was successful
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error; // Re-throwing the error for the calling function to handle
    }
};
