import { Table, Column, Model, DataType,BelongsToMany,BelongsTo,ForeignKey } from "sequelize-typescript";
import Usuario from "./Usuario";
import Punto_Usuario from "./Punto_Usuario";
import CategoriaPunto from "./CategoriaPunto";

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

     // Relación belongsTo con Usuario
     @ForeignKey(() => CategoriaPunto)
     @Column
     idCategoria!: number;
 
     @BelongsTo(() => CategoriaPunto)
     categoria!: CategoriaPunto;

     // Relación belongsToMany con Usuario a través de Punto_Usuario
     @BelongsToMany(() => Usuario, () => Punto_Usuario)
     usuarios!: Usuario[];
}

export default Punto;
