import { IPuntodereciclajeFactory } from "./IPuntodereciclajeFactory";
import { PRBateriasClass } from "./PRBateriasClass";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";


export class PRBateriasFactory implements IPuntodereciclajeFactory{
    crearpuntodereciclaje(puntodereciclaje: { latitud: number; longitud: number; lugar: string; id: number | null; }): PuntodereciclajeClass {
        return new PRBateriasClass(puntodereciclaje);
    }
}