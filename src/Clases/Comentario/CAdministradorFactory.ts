import { CAdministrador } from "./CAdministrador";
import { Comentarioclass } from "./Comentarioclass";
import { IComentarioFactory } from "./ICometarioFactory";


export class CAdministradorFactory implements IComentarioFactory{
    crearComentario(des: string): Comentarioclass {
        return new CAdministrador(des);
    }
}