import { Router } from 'express';
import NotificacionController from '../Controlador/Notificacion.controller';


const routerNotifiacion= Router();

routerNotifiacion.post('/noti-agregar-amigo',NotificacionController.agregarnotifiacionamigo);
routerNotifiacion.post('/ver-notifiaciones',NotificacionController.vernotificaciones);

export default routerNotifiacion;


