import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRBateriasClass } from "./PRBateriasClass";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";


export class PRBateriasFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { id: number; latitud: number; longitud: number; lugar: string; }): PuntodereciclajeClass {
        return new PRBateriasClass(puntodereciclaje);
    }
}