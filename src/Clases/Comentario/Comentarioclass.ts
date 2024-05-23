import { Response } from "../../Interfaces/Response";
import { Comentario } from "../../../models/Comentario";
import { Op } from "sequelize";
import { Usuario } from "../../../models/Usuario";

export abstract class Comentarioclass{
    private des:string;
    constructor(des:string){
        this.des=des;
    }

    getdes():string{
        return this.des;
    }

    static async recuperarComentarios():Promise<Response>{
        try {
          
        
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const comentariosHoy = await Comentario.findAll({
              where: {
                fecha:fechaHoySinHora,
                tipo:{
                  [Op.ne]: 4
                }
              },
              include:[
                {
                  model:Usuario
                }
              ],
              order: [['id', 'ASC']]
            });
        
            return { mensaje:"Comentarios obtenidos",res: true,data: comentariosHoy };
          } catch (e) {
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }

    abstract agregarComentario(id: number): Promise<Response>;

}