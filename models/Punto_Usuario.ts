import { Table, Column, Model, DataType, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { Usuario } from "./Usuario";
import { Punto } from "./Punto";

@Table({ tableName: "Punto_Usuario", freezeTableName: true, timestamps: false })
export class Punto_Usuario extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.BOOLEAN })
    realizado!: boolean;

    @Column({ type: DataType.DATEONLY })
    fecha!: Date;

    @Column({ type: DataType.INTEGER })
    cantidad!: number;

    @ForeignKey(() => Usuario)
    @Column
    UsuarioId!: number;

    @ForeignKey(() => Punto)
    @Column
    PuntoId!: number;
}



export default Punto_Usuario;
