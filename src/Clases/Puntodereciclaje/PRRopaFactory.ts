import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRRopaClass } from "./PRRopaClass";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export class PRRopaFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { latitud: number; longitud: number; lugar: string; id: number | null; }): PuntodereciclajeClass {
        return new PRRopaClass(puntodereciclaje)
    }

    
}