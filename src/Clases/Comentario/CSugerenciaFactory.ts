import { CComentario } from "./CComentario";
import { CSugerencia } from "./CSugerencia";
import { Comentarioclass } from "./Comentarioclass";
import { IComentarioFactory } from "./ICometarioFactory";


export class CSugerenciaFactory implements IComentarioFactory{
    crearComentario(des: string): Comentarioclass {
        return new CSugerencia(des);
    }
}