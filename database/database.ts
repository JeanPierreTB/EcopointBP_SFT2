import { Sequelize } from "sequelize-typescript";
import Usuario from "../models/Usuario";
import Recompesa from "../models/Recompesa";
import Consejos from "../models/Consejo";
import Comentario from "../models/Comentario";
import Notifiacion from "../models/Notificacion";
import Objetivo from "../models/Objetivo";
import Objetivo_Usuario from "../models/Objetivo_Usuario";
import Punto_Usuario from "../models/Punto_Usuario";
import Punto from "../models/Punto";
import Usuario_Usuario from "../models/Usuario_Usuario";

export const sequelize=new Sequelize("dbecopoint2","postgres","postgre",{
    host:"localhost",
    dialect:"postgres",
    models:[Usuario,Recompesa,Consejos,Comentario,Notifiacion,Objetivo,Objetivo_Usuario,Punto_Usuario,Punto,Usuario_Usuario]
})


