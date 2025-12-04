import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {authenticateJWT} from './middleware/auth';
import listEndpoints from 'express-list-endpoints';

import openRoutesV1 from './routes/v1/open';
import closeRoutesV1 from './routes/v1/close';
import {dbClient, dbConnect} from "./db";
import {API_CLOSE_PATH_PREFIX, API_OPEN_PATH_PREFIX, API_V1} from "./routes/v1/api-paths";
import {login, register} from "./controllers/auth-controller";
import {QUERIES} from "./datasources/queries";

const app = express();
const openRouter = express.Router();
const closeRouter = express.Router();
const PORT = process.env.PORT || 8080;

// Security & Standard Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[Incoming] ${req.method} ${req.url}`);
    next();
});

app.use(API_OPEN_PATH_PREFIX, openRouter);
openRouter.use(API_OPEN_PATH_PREFIX, openRoutesV1);

app.use(API_CLOSE_PATH_PREFIX, closeRouter);
closeRouter.use(API_CLOSE_PATH_PREFIX, authenticateJWT, closeRoutesV1);


openRouter.post(API_V1.OPEN.POST.REGISTER, (request, response) => {
    return register(request, response);
});

openRouter.post(API_V1.OPEN.POST.LOGIN, (request, response) => {
    return login(request, response);
});

closeRouter.get(API_V1.CLOSE.GET.PROJECTS, authenticateJWT, async (request, response) => {
    const result = await dbClient.query(QUERIES.SELECT_ALL_PROJECTS);
    return response.status(200).json(result.rows);
});

closeRouter.get(API_V1.CLOSE.GET.TASKS, authenticateJWT, async (request, response) => {
    const result = await dbClient.query(QUERIES.SELECT_ALL_TASKS);
    return response.status(200).json(result.rows);
});

closeRouter.get(API_V1.CLOSE.GET.USERS, authenticateJWT, async (request, response) => {
    const result = await dbClient.query(QUERIES.SELECT_ALL_USERS);
    return response.status(200).json(result.rows);
});

closeRouter.post(API_V1.CLOSE.GET.PROJECTS, authenticateJWT, async (request, response) => {
    const { title, description, priority } = request.body;
    const params = [title, description, priority];
    const result = await dbClient.query(QUERIES.INSERT_PROJECT, params);
    return response.status(200).json(result.rows[0]);
});

closeRouter.post(API_V1.CLOSE.GET.TASKS, authenticateJWT, async (request, response) => {
    const { title, description, priority, status, user_id, project_id } = request.body;
    const params = [title, description, priority, status, user_id, project_id];
    const result = await dbClient.query(QUERIES.INSERT_TASK, params);
    return response.status(200).json(result.rows[0]);
});

const routes = listEndpoints(app);
console.table(routes.map(route => ({
    path: route.path,
    methods: route.methods.join(', '),
    middlewares: route.middlewares.join(', ')
})));

app.listen(PORT, async () => {
    await dbConnect();
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to DB`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
