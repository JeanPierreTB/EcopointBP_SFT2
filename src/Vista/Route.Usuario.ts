import { Router } from 'express';
import UsuarioController from '../Controlador/Usuario.controller';

const routerUsuario = Router();

routerUsuario.post('/insertar-usuario', UsuarioController.insertarUsuario);
routerUsuario.post('/verificar-usuario',UsuarioController.verificarUsuario);
routerUsuario.post('/usuario-existente',UsuarioController.usuarioExistente);
routerUsuario.post('/cambio_contra',UsuarioController.cambioContrasena);
routerUsuario.post('/actualizar-foto',UsuarioController.actualizarFoto);
routerUsuario.post('/actualizar-datos-usuario',UsuarioController.actualizarDatosUsuario);
routerUsuario.post('/obtener-usuario',UsuarioController.obtenerUsuario);
routerUsuario.post('/notas-usuario',UsuarioController.notasUsuario);
routerUsuario.get('/rankings-usuarios',UsuarioController.rankingusuario);
routerUsuario.post('/todos-sin-amigos',UsuarioController.obtenernoamigos);
routerUsuario.post('/misamigos',UsuarioController.misamigos);
routerUsuario.post('/agregar-amigos',UsuarioController.agregaramigos);
routerUsuario.post('/amigo-rechazado',UsuarioController.amigorechazado);
routerUsuario.post('/aprobar-comentario',UsuarioController.aprobarcomentario);

export default routerUsuario;