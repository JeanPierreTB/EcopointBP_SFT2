import { Request, Response } from 'express';
import Punto from '../../models/Punto';
import { Op } from 'sequelize';
import Punto_Usuario from '../../models/Punto_Usuario';
import Usuario from '../../models/Usuario';
import qrcode from 'qrcode';

const puntajesPorTipo: { [key: string]: number } = {
  "Papel": 2,
  "Plástico": 3,
  "Metal": 6,
  "Baterias": 4,
  "Ropa": 8
};



class PuntodereciclajeController {

  
   
    public async obtenerpuntos(req: Request, res: Response): Promise<Response> {
        try{
            const Allpunto=await Punto.findAll({})
        
            return res.status(201).json({ mensaje: "Puntos obtenidos correctamente",res: true , data: Allpunto, });
        
          }catch(e){
            console.error("Error al obtener punto: ",e );
            return res.status(500).json({mensaje:"Error interno en el servidor",res:false});
          }
    }

    public async obtenerpuntosarealizar(req: Request, res: Response): Promise<Response> {
        const {usuario}=req.body;
        try {
            const puntosUsuario = await Punto_Usuario.findAll({
              where:{
                realizado:false,
                UsuarioId:usuario
              }
            });
        
            const puntoIds = puntosUsuario.map((puntoUsuario:any) => puntoUsuario.PuntoId);
        
            const puntos = await Punto.findAll({
              where: {
                id: {
                  [Op.in]: puntoIds
                }
              }
            });
        
            return res.status(201).json({ mensaje: "Operación exitosa", res: true,data: puntos });
        
          } catch (e) {
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }


    public async puntocancelado(req: Request, res: Response): Promise<Response> {
        const {lugar,id}=req.body;
        try{
            
            const punto:any=await Punto.findOne({
              where:{
                lugar:lugar
              }
            })
            if(!punto){
              return res.status(201).json({ mensaje: "Punto no encontrado", res: false });
            }
        
            const Punto_Usuario1=await Punto_Usuario.destroy({
              where:{
                PuntoId:punto.id,
                UsuarioId:id
              }
            })
        
            
        
            return res.status(201).json({ mensaje: "Punto Cancelado", res: true,data:punto });
        
    
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }

    public async realizarpunto(req: Request, res: Response): Promise<Response> {
        const {idu,id,tipo,punto}=req.body;
        console.log("id Usuario:"+idu);
        console.log("Id punto:"+id);
        console.log(tipo);
        console.log(punto)
        try {
            
        
        
            await Punto_Usuario.create({
              UsuarioId: idu,
              PuntoId: id,
              realizado:false,
              cantidad:0
            });
        
            return res.status(201).json({ mensaje: "Operación exitosa", res: true });
          } catch (e) {
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }

    private static calcularPuntajeNuevo(usuario: any, tipo: string, cantidad: number): number {
      const factor = puntajesPorTipo[tipo];
      if (factor) {
        return usuario.puntaje + (cantidad * factor);
      } else {
        throw new Error(`Tipo desconocido: ${tipo}`);
      }
    }

    public async puntorealizadoqr(req: Request, res: Response): Promise<Response> {

        const {lugar,lugarseleccionado,latitud,longitud,tipo,id,cantidad}=req.body;
        console.log(lugar);
        console.log(lugarseleccionado);
        try{
      
            if(lugarseleccionado===lugar){
              const punto:any=await Punto.findOne({
                where:{
                  latitud:latitud,
                  longitud:longitud,
                  lugar:lugar,
                  tipo:tipo
                }
                
              })
          
              if(!punto){
                return res.status(201).json({ mensaje: "Punto no encontrado", res: false });
          
              }
        
              const usuario:any=await Usuario.findOne({
                where:{
                  id:id
                }
              })
          
              if(!usuario){
                return res.status(404).json({ mensaje: "Usuario no encontrado", res: false });
              }
        
              const puntajenuevo=PuntodereciclajeController.calcularPuntajeNuevo(usuario,tipo,cantidad);
              
      
              const usuarioActualizado = await Usuario.update(
                { 
                  puntaje: puntajenuevo
                
                },
                {
                  where: {
                    id:id
                  }
                }
              );
              
          
              if(!usuarioActualizado){
                return res.status(404).json({ mensaje: "Usuario no encontrado", res: false });
              }
        
              const fechaHoy = new Date();
              const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
              const Punto_Usuario1=await Punto_Usuario.update(
                { 
                  realizado:true,
                  PuntoId:null,
                  fecha:fechaHoySinHora,
                  cantidad:cantidad
                
                },
                {
                  where: {
                    PuntoId:punto.id,
                  }
                }
                
                
                
              )
        
             
          
        
              return res.status(201).json({ mensaje: "Punto Realizado", res: true,data:punto });
        
            }
        
            else{
              return res.status(201).json({ mensaje: "Lugares no coinciden", res: false });
            }
            
        
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
          }
    }


    public async agregarpunto(req: Request, res: Response): Promise<Response> {
        const {latitud,longitud,lugar,tipo}=req.body;
        try {
    
            const qrCodeData = JSON.stringify({
              latitud: latitud,
              longitud: longitud,
              lugar: lugar,
              tipo:tipo
            });
        
            const qrCodeBase64 = await qrcode.toDataURL(qrCodeData);
        
            const newpunto = await Punto.create({
              latitud: latitud,
              longitud: longitud,
              lugar: lugar,
              codigoqr: qrCodeBase64,
              tipo:tipo
            });
        
            return res.status(201).json({
              mensaje: 'Punto creado',
              res: true,
              data: qrCodeBase64 
            });
          } catch (e) {
            console.error('Error al crear punto: ', e);
            return res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
          }
    }



    


}


export default new PuntodereciclajeController();
