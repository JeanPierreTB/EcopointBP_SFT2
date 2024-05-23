import { Comentarioclass } from "./Comentarioclass";

export interface IComentarioFactory{
    crearComentario(des:string):Comentarioclass;

}