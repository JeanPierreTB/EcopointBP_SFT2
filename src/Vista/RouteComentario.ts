import { Router } from 'express';
import ComentarioController from '../Controlador/Comentario.controller';


const routerComentario= Router();


routerComentario.get('/obtener-comentarios',ComentarioController.recuperarComentarios);
routerComentario.post('/agregar-comentariouau',ComentarioController.agregarcomentariopersonal);
routerComentario.post('/recuperar-comentariouau',ComentarioController.recuperarchatusuario);
routerComentario.post('/realizar-comentario',ComentarioController.agregarComentario);


export default routerComentario;
