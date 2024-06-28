import { Table, Column, Model, DataType, ForeignKey, BelongsToMany, HasMany, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./Usuario";
import { Comentario } from "./Comentario";

@Table({ tableName: "Usuario_Usuario", freezeTableName: true, timestamps: false })
export class Usuario_Usuario extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.DATEONLY })
    fecha!: Date;

    @ForeignKey(() => Usuario)
    @Column
    UsuarioAId!: number;

    @ForeignKey(() => Usuario)
    @Column
    UsuarioBId!: number;
}



export default Usuario_Usuario;

  