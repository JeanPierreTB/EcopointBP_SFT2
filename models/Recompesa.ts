import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Usuario } from "./Usuario";


export const Recompesa=sequelize.define("Recompesa",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    imagen:{
        type:DataTypes.STRING,
    },
    des:{
        type:DataTypes.STRING,
    },
    fechaInicio: { 
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fechaFin: { 
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    puntaje:{
        type:DataTypes.INTEGER,
    }
},{
    freezeTableName:true,
});




Usuario.hasMany(Recompesa,{
    foreignKey:"idUsuario"
})

Recompesa.belongsTo(Usuario,{
    foreignKey:"idUsuario"
})
