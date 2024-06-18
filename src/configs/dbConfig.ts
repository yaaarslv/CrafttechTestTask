import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from '../entities/Task';
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

export const AppDataSource = new DataSource({
    type: 'postgres',
    ssl: true,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Task]
});