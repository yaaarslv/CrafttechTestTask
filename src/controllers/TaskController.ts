import {Request, Response} from 'express';
import {Task} from '../entities/Task';
import {AppDataSource} from "../configs/dbConfig";
import {plainToInstance} from 'class-transformer';
import {CreateTaskDto} from "../dto/CreateTaskDto";
import {validate} from "class-validator";
import {UpdateTaskDto} from "../dto/UpdateTaskDto";

const taskRepository = AppDataSource.getRepository(Task);

export const createTask = async (req: Request, res: Response) => {
    try {
        const taskDto = plainToInstance(CreateTaskDto, req.body);
        const errors = await validate(taskDto);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const task = taskRepository.create(taskDto);
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
        const taskDto = plainToInstance(UpdateTaskDto, req.body);
        const errors = await validate(taskDto);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const task = await taskRepository.findOneBy({id: parseInt(req.params.id)});
        if (task) {
            await taskRepository.update(parseInt(req.params.id), taskDto);
            res.status(200).json({message: "success"});
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
