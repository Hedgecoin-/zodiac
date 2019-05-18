import { Router } from 'express';

import UserController from '../controllers/userController';

const routes = Router();

routes.get('/user/all', UserController.getAllUsers);
// routes.get('/:id', UserController.getSingleUser);

export default routes;