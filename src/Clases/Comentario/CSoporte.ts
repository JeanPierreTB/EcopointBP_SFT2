import { Comentarioclass } from "./Comentarioclass";
import { Comentario } from "../../../models/Comentario";
import { Response } from "../../Interfaces/Response";

export class CSoporte extends Comentarioclass{
    constructor(des:string){
        super(des);
    }

    async agregarComentario(id: number): Promise<Response> {
        try{
      
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const nuevocomentario=await Comentario.create({
              des:this.getdes(),
              tipo:1,
              idUsuario:id,
              fecha:fechaHoySinHora
            })
            return {mensaje:"Comentario creado",res:true};
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }
}