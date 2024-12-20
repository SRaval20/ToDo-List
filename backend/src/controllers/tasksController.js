import prisma from '../models/prismaClient.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, color, completed } = req.body;
        const task = await prisma.task.create({
            data: { title, color, completed },
        });
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, color, completed } = req.body;
        const task = await prisma.task.update({
            where: { id: Number(id) }, // Ensures id is treated as a number
            data: { title, color, completed },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({ where: { id: Number(id) } }); // Ensures id is treated as a number
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
