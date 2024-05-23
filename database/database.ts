import { Sequelize } from "sequelize";

export const sequelize=new Sequelize("dbecopoint2","postgres","postgre",{
    host:"localhost",
    dialect:"postgres"
})