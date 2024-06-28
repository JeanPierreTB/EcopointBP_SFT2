import { Request, Response } from 'express';
import Comentario from '../../models/Comentario';
import { Op } from "sequelize";
import Usuario from '../../models/Usuario';



class ComentarioController {
    public async recuperarComentarios(req: Request, res: Response): Promise<Response> {
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
        
            return res.status(201).json({ mensaje:"Comentarios obtenidos",res: true,data: comentariosHoy });
          } catch (e) {
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }


    public async agregarcomentariopersonal(req: Request, res: Response): Promise<Response> {
        const {des,tipo,id_usuario,id_amigo}=req.body;
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
            
        
          
            return res.status(201).json({ mensaje: "Comentario creado", res: true });
        
        
            
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }


    public async recuperarchatusuario(req: Request, res: Response): Promise<Response> {
        const {id_usuario,id_amigo}=req.body;
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
      
      
            
      
            return res.status(201).json({ mensaje: "info encontrada", res: true,data:comentariosOrdenados });
      
      
      
        }catch(e){
          console.error("Error al realizar la operación: ", e);
          return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
        }
    }

    public async agregarComentario(req: Request, res: Response): Promise<Response> {
        const {id,tipo,des}=req.body;
        try{
      
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const nuevocomentario=await Comentario.create({
              des:des,
              tipo:tipo,
              idUsuario:id,
              fecha:fechaHoySinHora
            })
            return res.status(201).json({mensaje:"Comentario creado",res:true});
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }


    





    


}


export default new ComentarioController();
