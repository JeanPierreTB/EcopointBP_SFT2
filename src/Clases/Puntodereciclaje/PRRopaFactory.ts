import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRRopaClass } from "./PRRopaClass";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export class PRRopaFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { id: number; latitud: number; longitud: number; lugar: string; }): PuntodereciclajeClass {
        return new PRRopaClass(puntodereciclaje);
    }
}