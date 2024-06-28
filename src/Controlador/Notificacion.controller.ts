import { Request, Response } from 'express';
import Notifiacion from '../../models/Notificacion';
class NotificacionController {

    public async agregarnotifiacionamigo(req: Request, res: Response): Promise<Response> {
        try{
            const {des,tipo,idf,nombre,foto}=req.body;
            if(des==="Usted ha ganado el premio de la semana"){
                
                return res.status(200).json({mensaje:"Notifiacion ya existe",res:false});
            }
            else{
                const noti=await Notifiacion.create({
                    des:des,
                    tipo:tipo,
                    idUsuario:idf,
                    nombre:nombre,
                    foto:foto
                  })
              
                  return res.status(200).json({ mensaje: "Notificacion agregada", res: true,data:noti });
            }
            
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }

    public async vernotificaciones(req: Request, res: Response): Promise<Response> {
        try{
            const {id}=req.body;
            const noti=await Notifiacion.findAll({
              where:{
                idUsuario:id
              },
              
            })
        
            if(!noti){
              return res.status(404).json({ mensaje: "Notificaciones no encontradas", res: false });
            }
        
            return res.status(200).json({ mensaje: "Notificaciones encontradas", res: true,data:noti });
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }


}


export default new NotificacionController();