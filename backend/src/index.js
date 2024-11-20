import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes.js';

const { json } = bodyParser;

const app = express();
app.use(cors());
app.use(json());

app.use('/tasks', taskRoutes);

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
