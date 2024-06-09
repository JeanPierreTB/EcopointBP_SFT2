import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Usuario } from "./Usuario";
import { Objetivo } from "./Objetivo";

export const  Objetivo_Usuario= sequelize.define(
  "Objetivo_Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    porcentaje:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Usuario.belongsToMany(Objetivo,{through:Objetivo_Usuario})
Objetivo.belongsToMany(Usuario,{through:Objetivo_Usuario})