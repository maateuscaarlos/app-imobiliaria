import {Router} from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload'
import ControllerAuthenticate from '../controller/ControllerAuthenticate';
import ControllerPropertie from '../controller/ControllerPropertie';
import ControllerUserProprietor from '../controller/ControllerUserProprietor';


const routes = Router();
const uploadMulter =multer(uploadConfig);

routes.get('/Propertie',ControllerPropertie.index);
routes.get('/Propertie/:id', ControllerPropertie.show);
routes.post('/Propertie',uploadMulter.array('images'), ControllerPropertie.create);

routes.get('/UserProprietor',ControllerUserProprietor.index);
routes.get('/UserProprietor/:id', ControllerUserProprietor.show);
routes.post('/UserProprietor',uploadMulter.single('usersPropietor'), ControllerUserProprietor.create);


routes.post('/auth',ControllerAuthenticate.authenticate);


export default routes;