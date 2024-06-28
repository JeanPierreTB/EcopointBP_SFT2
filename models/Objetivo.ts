import { Table, Column, Model, DataType ,BelongsToMany} from "sequelize-typescript";
import Usuario from "./Usuario";
import Objetivo_Usuario from "./Objetivo_Usuario";

@Table({ tableName: "Objetivo", freezeTableName: true })
export class Objetivo extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.TEXT })
    des!: string;

    @Column({ type: DataType.INTEGER })
    puntos!: number;

    @Column({ type: DataType.INTEGER })
    dia!: number;

    // Relación belongsToMany con Usuario a través de Objetivo_Usuario
    @BelongsToMany(() => Usuario, () => Objetivo_Usuario)
    usuarios!: Usuario[];
}

export default Objetivo;
