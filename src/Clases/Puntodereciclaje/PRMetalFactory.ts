import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRMetalClass } from "./PRMetalClass";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export class PRMetalFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { latitud: number; longitud: number; lugar: string; id: number | null; }): PuntodereciclajeClass {
        return new PRMetalClass(puntodereciclaje);
    }
}