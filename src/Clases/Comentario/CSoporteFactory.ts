import { CComentario } from "./CComentario";
import { CSoporte } from "./CSoporte";
import { Comentarioclass } from "./Comentarioclass";
import { IComentarioFactory } from "./ICometarioFactory";


export class CSoporteFactory implements IComentarioFactory{
    crearComentario(des: string): Comentarioclass {
        return new CSoporte(des);
    }
}