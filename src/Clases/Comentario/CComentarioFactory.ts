import { CComentario } from "./CComentario";
import { Comentarioclass } from "./Comentarioclass";
import { IComentarioFactory } from "./ICometarioFactory";


export class CComentarioFactory implements IComentarioFactory{
    crearComentario(des: string): Comentarioclass {
        return new CComentario(des);
    }
}