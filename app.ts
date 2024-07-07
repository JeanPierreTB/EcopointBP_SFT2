import express, { Request, Response } from 'express';
import { Application } from 'express';
import { Recompesa } from './models/Recompesa';
import { Usuario } from './models/Usuario';
import { Objetivo_Usuario } from './models/Objetivo_Usuario';
import cors from 'cors';
import { sequelize } from './database/database';
import routerNotifiacion from './src/Vista/Route.Notificacion';
import routerObjetivo from './src/Vista/Route.Objetivo';
import routerPuntodereciclaje from './src/Vista/Route.Puntodereciclaje';
import routerRecompesa from './src/Vista/Route.Recompesa';
import routerUsuario from './src/Vista/Route.Usuario';
import routerComentario from './src/Vista/RouteComentario';
import routerConsejo from './src/Vista/RouteConsejo';

const app: Application = express(); 
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Usar las rutas definidas en routes.ts
app.use('/',routerNotifiacion);
app.use('/',routerObjetivo);
app.use('/',routerPuntodereciclaje);
app.use('/',routerRecompesa);
app.use('/',routerUsuario);
app.use('/',routerComentario);
app.use('/',routerConsejo);


const verificarconexion = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log("Conexion a base de datos exitosa");
    } catch (e) {
      console.error("No se logró conectar ", e);
    }
};

const verificardia= async()=>{
  try{

    const fechaHoy = new Date();
    const fechaAyer = new Date(fechaHoy);
    fechaAyer.setDate(fechaHoy.getDate() - 1);

// Extraer la parte de fecha de la fecha de ayer
    const fechaAyerSinHora = fechaAyer.toISOString().split('T')[0];

    console.log(fechaAyerSinHora);

    const recompesa=await Recompesa.findOne({
      where:{
        fechaFin:fechaAyerSinHora
      }
    })

    if(recompesa){
      const usuarios=await Usuario.update(
        {puntaje:0},{where:{}})
      const objetivos=await Objetivo_Usuario.update(
        {porcentaje:0},{where:{}})
       return console.log("Recompesa obtenido",recompesa);
    }

    return

    
  }catch(e){
    console.error("No se pudo saber el dia",e)
  }
}




// Exportar la app sin iniciar el servidor
export default app;

// Solo iniciar el servidor si no es un módulo de prueba
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    verificarconexion();
    verificardia();
  });
}