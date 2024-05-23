import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export interface IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje:{
        latitud:number;
        longitud:number;
        lugar:string;
        id:number|null;
    }):PuntodereciclajeClass;
}