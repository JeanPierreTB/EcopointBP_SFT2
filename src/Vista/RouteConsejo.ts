import { Router } from 'express';
import ConsejosController from '../Controlador/Consejos.controller';


const routerConsejo= Router();

routerConsejo.get('/recuperar-consejos',ConsejosController.RecuperarConsejos);
routerConsejo.post('/agregar-consejo',ConsejosController.AgregarConsejos);

export default routerConsejo;
