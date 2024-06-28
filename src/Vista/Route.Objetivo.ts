import { Router } from 'express';
import ObjetivoController from '../Controlador/Objetivo.controller';


const routerObjetivo= Router();

routerObjetivo.post('/recuperar-objetivo',ObjetivoController.recuperarobjetivos);
routerObjetivo.post('/avance-objetivos-1',ObjetivoController.actualizarobjetivoshoy1);
routerObjetivo.post('/avance-objetivos-2',ObjetivoController.actualizarobjetivoshoy2);
routerObjetivo.post('/avance-objetivos-3',ObjetivoController.actualizarobjetivoshoy3);
routerObjetivo.post('/avance-objetivos-4',ObjetivoController.actualizarobjetivoshoy4);
routerObjetivo.post('/avance-objetivos-5',ObjetivoController.actualizarobjetivoshoy5);
routerObjetivo.post('/avance-objetivos-6',ObjetivoController.actualizarobjetivoshoy6);
routerObjetivo.post('/avance-objetivos-7',ObjetivoController.actualizarobjetivoshoy7);
routerObjetivo.post('/agregar-objetivo',ObjetivoController.agregarobjetivo);

export default routerObjetivo;




