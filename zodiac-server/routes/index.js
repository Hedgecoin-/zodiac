import { Router } from 'express';

import UserController from '../controllers/userController';

const routes = Router();

routes.post('/user/login', UserController.login);
routes.post('/user/register', UserController.register);
routes.post('/user/delete', UserController.delete);
routes.get('/user/all', UserController.getAllUsers);
// routes.get('/:id', UserController.getSingleUser);

export default routes;