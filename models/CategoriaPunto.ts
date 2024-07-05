import { Table, Column, Model, DataType,BelongsToMany,HasMany } from "sequelize-typescript";
import Usuario from "./Usuario";
import Punto_Usuario from "./Punto_Usuario";
import Punto from "./Punto";

@Table({ tableName: "CategoriaPunto", freezeTableName: true })
export class CategoriaPunto extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    
    @Column({ type: DataType.TEXT })
    tipo!: string;

    @Column({ type: DataType.INTEGER })
    valor!: number;

    @Column({ type: DataType.TEXT })
    puntuacion!: number;


    // Relación hasMany con Notifiacion
    @HasMany(() => Punto)
    puntos!: Punto[];

    
}

export default CategoriaPunto;