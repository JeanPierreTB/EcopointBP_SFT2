import { Table, Column, Model, DataType, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { Usuario } from "./Usuario";
import Recompesa from "./Recompesa";

@Table({ tableName: "Usuario_Recompesa", freezeTableName: true, timestamps: false })
export class Usuario_Recompesa extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

   

    @ForeignKey(() => Usuario)
    @Column
    UsuarioId!: number;

    @ForeignKey(() => Recompesa)
    @Column
    RecompesaId!: number;
}



export default Usuario_Recompesa;