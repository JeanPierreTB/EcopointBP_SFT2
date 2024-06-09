import { Notifiacion } from "../../../models/Notificacion"
import { Response } from "../../Interfaces/Response"
class Notifiaciones{
    private des:string
    private tipo:number
    private nombre:string
    private foto:string

    constructor(des:string,tipo:number,nombre:string,foto:string){
        this.des=des,
        this.tipo=tipo,
        this.nombre=nombre,
        this.foto=foto
    }

    async agregarnotifiacionamigo(idf:number):Promise<Response>{
        try{
            const noti=await Notifiacion.create({
              des:this.des,
              tipo:this.tipo,
              idUsuario:idf,
              nombre:this.nombre,
              foto:this.foto
            })
        
            return { mensaje: "Notificacion agregada", res: true,data:noti };
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }

    static async vernotificaciones(id:number):Promise<Response>{
        try{
            const noti=await Notifiacion.findAll({
              where:{
                idUsuario:id
              },
              
            })
        
            if(!noti){
              return { mensaje: "Notificaciones no encontradas", res: false };
            }
        
            return { mensaje: "Notificaciones encontradas", res: true,data:noti };
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }
}

export {Notifiaciones}