import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRMetalClass } from "./PRMetalClass";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export class PRMetalFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { id: number; latitud: number; longitud: number; lugar: string; }): PuntodereciclajeClass {
        return new PRMetalClass(puntodereciclaje);
    }
}