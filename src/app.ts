const express = require('express');
const bodyParser     = require('body-parser');
import 'reflect-metadata';
import {AppDataSource} from "./configs/dbConfig";
import router from "./routers/TaskRouter";

const app = express();

app.use(bodyParser.json());

app.use('/api', router);

app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500).json({
        error: err.message,
    });
});

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    })
    .catch((error) => console.log(error));
