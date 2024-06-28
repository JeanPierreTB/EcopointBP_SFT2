import { Table, Column, Model, DataType, HasMany,BelongsToMany } from "sequelize-typescript";
import Recompesa from "./Recompesa";
import Consejos from "./Consejo";
import Comentario from "./Comentario";
import Notifiacion from "./Notificacion";
import Objetivo from "./Objetivo";
import Objetivo_Usuario from "./Objetivo_Usuario";
import Punto from "./Punto";
import Punto_Usuario from "./Punto_Usuario";
import Usuario_Usuario from "./Usuario_Usuario";

@Table({ tableName: "Usuario" })
export class Usuario extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    nombre!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    contrasena!: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    dni!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    ntelefono!: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    puntaje!: number;

    @Column({ type: DataType.STRING, defaultValue: 'https://static.vecteezy.com/system/resources/previews/027/728/804/non_2x/faceless-businessman-user-profile-icon-business-leader-profile-picture-portrait-user-member-people-icon-in-flat-style-circle-button-with-avatar-photo-silhouette-free-png.png' })
    foto!: string;

    @Column({ type: DataType.STRING, defaultValue: 'Cliente' })
    rol!: string;

    // Relación hasMany con Recompesa
    @HasMany(() => Recompesa)
    recompensas!: Recompesa[];

    // Relación hasMany con Consejos
    @HasMany(() => Consejos)
    consejos!: Consejos[];

    // Relación hasMany con Comentario
    @HasMany(() => Comentario)
    comentarios!: Comentario[];

    // Relación hasMany con Notifiacion
    @HasMany(() => Notifiacion)
    notifiaciones!: Notifiacion[];

    // Relación belongsToMany con Objetivo a través de Objetivo_Usuario
    @BelongsToMany(() => Objetivo, () => Objetivo_Usuario)
    objetivos!: Objetivo[];

    // Relación belongsToMany con Punto a través de Punto_Usuario
    @BelongsToMany(() => Punto, () => Punto_Usuario)
    puntos!: Punto[];

    // Relación belongsToMany consigo mismo a través de Usuario_Usuario
    @BelongsToMany(() => Usuario, () => Usuario_Usuario, 'UsuarioAId', 'UsuarioBId')
    amigos!: Usuario[];
}

export default Usuario;
