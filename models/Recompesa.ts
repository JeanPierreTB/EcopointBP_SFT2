import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./Usuario";

@Table({ tableName: "Recompesa" })
export class Recompesa extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING })
    imagen!: string;

    @Column({ type: DataType.STRING })
    des!: string;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    fechaInicio!: Date;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    fechaFin!: Date;

    @Column({ type: DataType.INTEGER })
    puntaje!: number;

    // Relación belongsTo con Usuario
    @ForeignKey(() => Usuario)
    @Column
    idUsuario!: number;

    @BelongsTo(() => Usuario)
    usuario!: Usuario;
}

export default Recompesa;
