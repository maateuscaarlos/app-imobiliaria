import {Router} from 'express';

import ControllerAuthenticate from '../controller/ControllerAuthenticate';

const authRouter = Router();

authRouter.post('/auth',ControllerAuthenticate.authenticate);


export default authRouter;