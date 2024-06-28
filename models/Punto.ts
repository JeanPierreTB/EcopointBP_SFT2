import { Table, Column, Model, DataType,BelongsToMany } from "sequelize-typescript";
import Usuario from "./Usuario";
import Punto_Usuario from "./Punto_Usuario";

@Table({ tableName: "Punto", freezeTableName: true })
export class Punto extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.FLOAT })
    latitud!: number;

    @Column({ type: DataType.FLOAT })
    longitud!: number;

    @Column({ type: DataType.STRING })
    lugar!: string;

    @Column({ type: DataType.TEXT })
    codigoqr!: string;

    @Column({ type: DataType.TEXT })
    tipo!: string;

     // Relación belongsToMany con Usuario a través de Punto_Usuario
     @BelongsToMany(() => Usuario, () => Punto_Usuario)
     usuarios!: Usuario[];
}

export default Punto;
