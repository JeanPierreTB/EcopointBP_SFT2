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

    static async agregarcomentariopersonal(id_usuario:number,id_amigo:number,tipo:number,des:string):Promise<Response>{
      try{

        const fechaHoy = new Date();
        const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
      
          const comentario=await Comentario.create({
            des:des,
            tipo:tipo,
            idUsuario:id_usuario,
            idamigo:id_amigo,
            fecha:fechaHoySinHora
          })
        
    
      
        return { mensaje: "Comentario creado", res: true };
    
    
        
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return { mensaje: "Error interno en el servidor", res: false };
      }
    }

    static async recuperarchatusuario(id_usuario:number,id_amigo:number):Promise<Response>{
      try{
        const comentario=await Comentario.findAll({
          where:{
            idUsuario:id_usuario,
            idamigo:id_amigo
          },include:[{model:Usuario}]
        })
  
        const comentario2=await Comentario.findAll({
          where:{
            idUsuario:id_amigo,
            idamigo:id_usuario
          },include:[{model:Usuario}]
        })
  
        const comentarios=comentario.concat(comentario2)
        const comentariosOrdenados = comentarios.sort((a:any, b:any) => a.id - b.id);
  
  
        
  
        return { mensaje: "info encontrada", res: true,data:comentariosOrdenados };
  
  
  
    }catch(e){
      console.error("Error al realizar la operación: ", e);
      return { mensaje: "Error interno en el servidor", res: false };
    }
  }



    abstract agregarComentario(id: number): Promise<Response>;

}