import {Request, Response} from 'express';
import {Task} from '../entities/Task';
import {AppDataSource} from "../configs/dbConfig";

const taskRepository = AppDataSource.getRepository(Task);

export const createTask = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const task = taskRepository.create(req.body);
        await taskRepository.save(task);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskRepository.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await taskRepository.findOneBy({id: parseInt(req.params.id, 10)});
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({error: 'Task not found'});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await taskRepository.findOneBy({id: parseInt(req.params.id, 10)});
        if (task) {
            taskRepository.merge(task, req.body);
            const updatedTask = await taskRepository.save(task);
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({error: 'Task not found'});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const result = await taskRepository.delete(req.params.id);
        if (result.affected) {
            res.status(204).send();
        } else {
            res.status(404).json({error: 'Task not found'});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
