import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Usuario } from "./Usuario";

export const Comentario=sequelize.define("Comentario",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    des:{
        type:DataTypes.TEXT
    },
    tipo:{
        type:DataTypes.INTEGER
    },
    fecha:{
        type:DataTypes.DATEONLY
    }
},{
    freezeTableName:true,
    timestamps:false
})

Usuario.hasMany(Comentario,{
    foreignKey:'idUsuario'
})

Comentario.belongsTo(Usuario,{
    foreignKey:'idUsuario'
})