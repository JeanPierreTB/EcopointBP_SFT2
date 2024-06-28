import { Router } from 'express';
import PuntodereciclajeController from '../Controlador/Puntodereciclaje.controller';

const routerPuntodereciclaje= Router();

routerPuntodereciclaje.get('/obtener-puntos',PuntodereciclajeController.obtenerpuntos);
routerPuntodereciclaje.post('/obtener-punto-realizar',PuntodereciclajeController.obtenerpuntosarealizar);
routerPuntodereciclaje.post('/punto-cancelado',PuntodereciclajeController.puntocancelado);
routerPuntodereciclaje.post('/realizar-punto',PuntodereciclajeController.realizarpunto);
routerPuntodereciclaje.post('/punto-cancelado-qr',PuntodereciclajeController.puntorealizadoqr);
routerPuntodereciclaje.post('/agregar-punto',PuntodereciclajeController.agregarpunto);

export default routerPuntodereciclaje;
