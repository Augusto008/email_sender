import express from "express";
import 'dotenv/config';
import {route} from './routes.js';

const server = express();

server.use(express.json({ limit: '50mb' }));

server.use(route);

server.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}`));