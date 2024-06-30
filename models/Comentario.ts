import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./Usuario";
import Usuario_Usuario from "./Usuario_Usuario";

@Table({ tableName: "Comentario", freezeTableName: true, timestamps: false })
export class Comentario extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.TEXT })
    des!: string;

    @Column({ type: DataType.INTEGER })
    tipo!: number;

    @Column({ type: DataType.DATEONLY })
    fecha!: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    aprobado!: boolean;

    // Relación belongsTo con Usuario
    @ForeignKey(() => Usuario)
    @Column
    idUsuario!: number;

    @BelongsTo(() => Usuario, 'idUsuario')
    usuario!: Usuario;

    // Relación belongsTo con Usuario
    @ForeignKey(() => Usuario)
    @Column
    idamigo!: number;

    @BelongsTo(() => Usuario, 'idamigo')
    amigo!: Usuario;

}





export default Comentario;
