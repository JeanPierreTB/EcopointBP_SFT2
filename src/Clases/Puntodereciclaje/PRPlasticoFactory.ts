import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRPlasticoClass } from "./PRPlasticoClass";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export class PRPlasticoFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { id: number; latitud: number; longitud: number; lugar: string; }): PuntodereciclajeClass {
        return new PRPlasticoClass(puntodereciclaje)
    }
}