import { Router } from 'express';

import authMiddleware from './middlewares/auth';

import usersController from './controllers/usersController';
import tasksController from './controllers/tasksController';
import sessionController from './controllers/sessionController';

const routes = Router();

routes.get('/user/:id', usersController.index);

routes.post('/user', usersController.create);

routes.put('/user/:id', authMiddleware, usersController.update);

routes.delete('/user/:id', usersController.delete);

routes.get('/tasks/:user_id', tasksController.index);

routes.get('/tasks/:id_task/:user_id', tasksController.show);

routes.post('/tasks/:user_id', tasksController.create);

routes.put('/tasks/:id_task/:user_id', tasksController.update);

routes.delete('/tasks/:id_task', tasksController.delete);

// Session
routes.post('/session', sessionController.store);

export default routes;
