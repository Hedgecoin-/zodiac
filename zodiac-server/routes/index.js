import { Router } from 'express';

import UserController from '../controllers/userController';
import PlayerController from '../controllers/playerController';

const routes = Router();

routes.post('/user/login', UserController.login);
routes.post('/user/register', UserController.register);
routes.post('/user/delete', UserController.delete);
routes.get('/user/all', UserController.getAllUsers);

routes.post('/player/create', PlayerController.createPlayer);
routes.post('/player/delete', PlayerController.deletePlayer);
routes.post('/player/update', PlayerController.updatePlayer);
routes.get('/player/all', PlayerController.getAllPlayers);
routes.get('/player/:id', PlayerController.getById);

export default routes;