import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./Usuario";

@Table({ tableName: "Notifiacion", freezeTableName: true })
export class Notifiacion extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.TEXT })
    des!: string;

    @Column({ type: DataType.INTEGER })
    tipo!: number;

    @Column({ type: DataType.STRING })
    nombre!: string;

    @Column({ type: DataType.TEXT })
    foto!: string;

    // Relación belongsTo con Usuario
    @ForeignKey(() => Usuario)
    @Column
    idUsuario!: number;

    @BelongsTo(() => Usuario)
    usuario!: Usuario;
}



export default Notifiacion;
