import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export interface IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje:{id:number;latitud:number;longitud:number;lugar:string;}):PuntodereciclajeClass;
}