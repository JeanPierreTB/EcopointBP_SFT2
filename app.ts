import express, { Request, Response } from 'express';
import { Application } from 'express';
import usuarioEndpoints from './src/Endpoints/EndpointsUsuario/Endpoints_Usuario';
import puntodereciclajendpoints from './src/Endpoints/EndpointsPuntodeReciclaje/Endpoints_Puntodereciclaje';
import ComentarioEndpoints from './src/Endpoints/EndpointsComentario/EndpointsComentario';
import ConsejosEndpoints from './src/Endpoints/EndpointsConsejos/EndpointsConsejos';
import recompesaendpoints from './src/Endpoints/EndpointsRecompesa/Endpoints_Recompesa';
import objetivoEndpoints from './src/Endpoints/EndpointsObjetivo/EndpointsObjetivo';
import { Recompesa } from './models/Recompesa';
import { Usuario } from './models/Usuario';
import { Objetivo_Usuario } from './models/Objetivo_Usuario';
import cors from 'cors';
import { sequelize } from './database/database';


const app: Application = express(); 
const PORT = 3001;

app.use(cors());
app.use(express.json());

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

usuarioEndpoints(app);
puntodereciclajendpoints(app);
ComentarioEndpoints(app);
ConsejosEndpoints(app);
recompesaendpoints(app);
objetivoEndpoints(app);

app.get('/', (req: Request, res: Response) => {
    res.send('¡Servidor de Ecopint!');
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    verificarconexion();
    verificardia();
});
