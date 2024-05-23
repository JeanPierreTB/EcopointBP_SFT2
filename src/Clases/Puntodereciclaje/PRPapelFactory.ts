import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRPapelClass } from "./PRPapelClass";

import { PuntodereciclajeClass } from "./PuntodereciclajeClass";

export class PRPapelFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { latitud: number; longitud: number; lugar: string; id: number | null; }): PuntodereciclajeClass {
        return new PRPapelClass(puntodereciclaje);
    }
}