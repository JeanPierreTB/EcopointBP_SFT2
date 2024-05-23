import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRPlasticoClass } from "./PRPlasticoClass";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export class PRPlasticoFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { latitud: number; longitud: number; lugar: string; id: number | null; }): PuntodereciclajeClass {
        return new PRPlasticoClass(puntodereciclaje);
    }
}