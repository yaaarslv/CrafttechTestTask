import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {Task} from '../entities/Task';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [Task],
    migrations: [],
    subscribers: [],
});
