import { Request, Response } from 'express';
import Consejos from '../../models/Consejo';

class ConsejosController {

    public async RecuperarConsejos(req: Request, res: Response): Promise<Response> {
        try{
            const diaactual=new Date().getDay() || 7;
            const consejoshoy=await Consejos.findAll({
              where:{
                dia:diaactual
              }
            })
            if(!consejoshoy){
              return res.status(400).json({mensaje: "Consejo no encontrado", res: false });
            }
        
            return res.status(201).json({ mensaje: "Consejos encontrados", res: true,data:consejoshoy });
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }

    public async AgregarConsejos(req: Request, res: Response): Promise<Response> {
        try{
            const {des,dia}=req.body;
            const consejo=await Consejos.create({
              des:des,
              dia:dia
            })
            return res.status(200).json({mensaje:"Consejo creado",res:true});
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }


}


export default new ConsejosController();
