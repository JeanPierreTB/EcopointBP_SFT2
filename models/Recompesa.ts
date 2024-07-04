import { Table, Column, Model, DataType, ForeignKey, BelongsTo,BelongsToMany } from "sequelize-typescript";
import { Usuario } from "./Usuario";
import Usuario_Recompesa from "./Usuario_Recompesa";

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

    @Column({type:DataType.INTEGER})
    stock!:number;

    // Relación belongsToMany con Usuario a través de Punto_Usuario
    @BelongsToMany(() => Usuario, () => Usuario_Recompesa)
    usuarios!: Usuario[];

    
}

export default Recompesa;
