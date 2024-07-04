import { Router } from 'express';
import RecompesaController from '../Controlador/Recompesa.controller';


const routerRecompesa= Router();

routerRecompesa.get('/obtener-recompesa-semanal',RecompesaController.obtenerrecompesasemanal);
routerRecompesa.post('/verificar-recompensa',RecompesaController.obtenerganador);
routerRecompesa.post('/agregar-recompesa',RecompesaController.agregarecompesa);
routerRecompesa.get('/recuperar-recompesas',RecompesaController.obtenerultimafecha);
routerRecompesa.post('/eliminar-id',RecompesaController.eliminarid);
routerRecompesa.post('/actualizar-stock',RecompesaController.actualizarstock);

export default routerRecompesa;
