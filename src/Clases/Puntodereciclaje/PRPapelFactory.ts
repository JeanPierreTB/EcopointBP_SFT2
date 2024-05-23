import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRPapelClass } from "./PRPapelClass";

import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export class PRPapelFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { id: number; latitud: number; longitud: number; lugar: string; }): PuntodereciclajeClass {
        return new PRPapelClass(puntodereciclaje);
    }
}