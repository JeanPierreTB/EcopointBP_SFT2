import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";


export const Objetivo=sequelize.define("Objetivo",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    des:{
        type:DataTypes.TEXT
    },
    puntos:{
        type:DataTypes.INTEGER
    },
    dia:{
        type:DataTypes.INTEGER
    }
},{
    freezeTableName:true
})