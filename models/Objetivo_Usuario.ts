import { Table, Column, Model, DataType, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { Usuario } from "./Usuario";
import { Objetivo } from "./Objetivo";

@Table({ tableName: "Objetivo_Usuario", freezeTableName: true, timestamps: false })
export class Objetivo_Usuario extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    porcentaje!: number;

    @ForeignKey(() => Usuario)
    @Column
    usuarioId!: number;

    @ForeignKey(() => Objetivo)
    @Column
    objetivoId!: number;
}



export default Objetivo_Usuario;
