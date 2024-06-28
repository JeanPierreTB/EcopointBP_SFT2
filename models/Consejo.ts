import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./Usuario";

@Table({ tableName: "Consejos", freezeTableName: true })
export class Consejos extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.TEXT })
    des!: string;

    @Column({ type: DataType.INTEGER })
    dia!: number;

    // Relación belongsTo con Usuario
    @ForeignKey(() => Usuario)
    @Column
    idUsuario!: number;

    @BelongsTo(() => Usuario)
    usuario!: Usuario;
}

export default Consejos;