import { Router } from 'express';
import {createTask, deleteTask, getTaskById, getTasks, updateTask} from "../controllers/TaskController";

const router = Router();
router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;