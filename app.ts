import express, { Request, Response } from 'express';
import { Application } from 'express';
import usuarioEndpoints from './src/Endpoints/EndpointsUsuario/Endpoints_Usuario';
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

usuarioEndpoints(app);

app.get('/', (req: Request, res: Response) => {
    res.send('¡Servidor de Ecopint!');
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    verificarconexion();
});
