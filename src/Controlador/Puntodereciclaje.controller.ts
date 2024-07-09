import { Request, Response } from 'express';
import Punto from '../../models/Punto';
import { Op } from 'sequelize';
import Punto_Usuario from '../../models/Punto_Usuario';
import Usuario from '../../models/Usuario';
import qrcode from 'qrcode';
import CategoriaPunto from '../../models/CategoriaPunto';

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
            const Allpunto=await Punto.findAll({include:{model:CategoriaPunto}})
        
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
              },include:{model:CategoriaPunto}
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

    private  static async calcularPuntajeNuevo (usuario: any, tipo: string, cantidad: number): Promise<number> {

      const categorias=await CategoriaPunto.findOne({
        where:{
          tipo:tipo
        }
      });

      if(!categorias){
        return usuario.puntaje+ 0;
      }
      
      if (categorias) {
        console.log("Valor:"+categorias.valor);
        return usuario.puntaje + (cantidad * categorias.valor);
      } else {
        throw new Error(`Tipo desconocido: ${tipo}`);
      }
    }

    public async puntorealizadoqr(req: Request, res: Response): Promise<Response> {

        const {lugar,lugarseleccionado,latitud,longitud,tipo,id,cantidad}=req.body;
       
        try{
      
            if(lugarseleccionado===lugar){
              const punto:any=await Punto.findOne({
                where:{
                  latitud:latitud,
                  longitud:longitud,
                  lugar:lugar
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
        
              const puntajenuevo=await PuntodereciclajeController.calcularPuntajeNuevo(usuario,tipo,cantidad);
              
      
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
      //2
        const {latitud,longitud,lugar,tipo}=req.body;

        //3
        if (!latitud || !longitud || !lugar || !tipo) {
          //4
          return res.status(400).json({ mensaje: 'Faltan campos obligatorios', res: false });
      }

        try {
            //5
            const qrCodeData = JSON.stringify({
              latitud: latitud,
              longitud: longitud,
              lugar: lugar,
              tipo:tipo
            });
            
            //6
            const qrCodeBase64 = await qrcode.toDataURL(qrCodeData);

            //7
            const categoria=await CategoriaPunto.findOne({
              where:{
                tipo:tipo
              }
            })

            //8

            if(!categoria){
              //9
              return res.status(400).json({ mensaje: "No existe la categoria", res: false})
            }

            //10
        
            const newpunto = await Punto.create({
              latitud: latitud,
              longitud: longitud,
              lugar: lugar,
              codigoqr: qrCodeBase64,
              idCategoria:categoria.id
            });
            
            //11
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

    public async agregarcategoria(req:Request,res:Response):Promise<Response>{
      try{
        //2
        const {tipo,valor,puntuacion}=req.body;

        console.log(tipo);
        console.log(valor);
        console.log(puntuacion)
        //3
        if (typeof tipo !== 'string' || typeof valor !== 'number' || typeof puntuacion !== 'string') {
          //4
          return res.status(400).json({ mensaje: 'Los campos estan en formato invalido',res:false });
      }

        //5
        if(puntuacion!=="Kilo" && puntuacion!=="Cantidad"){
          //6
          console.log("eNTRO")
          console.log(puntuacion)

          return res.status(400).json({ mensaje: "La puntuacion no esta permitida", res: false})

        }
        console.log("Hola")

        //7
        const categoriaexiste=await CategoriaPunto.findOne({
          where:{
            tipo:tipo
          }
        })

        //8
        if(categoriaexiste){
          //9
          return res.status(400).json({ mensaje: "La categoria ya existe", res: false})
        }
        //10
        const categoria=await CategoriaPunto.create({
          tipo:tipo,
          valor:valor,
          puntuacion:puntuacion
        })

        //11

        return res.status(201).json({
          mensaje: 'Categoria creada',
          res: true,
          data: categoria 
        });


      }catch(e){
        console.error('Error al crear punto: ', e);
        return res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
      }
    }


    public async obtenercategorias(req:Request,res:Response):Promise<Response>{
      try{
        const categorias=await CategoriaPunto.findAll({});
        if (categorias.length === 0) {
          return res.status(404).json({
            mensaje: 'No se encontraron categorías',
            res: false,
            data: categorias 
          });
        }
    
        return res.status(200).json({
          mensaje: 'Categorías encontradas',
          res: true,
          data: categorias
        });


        
      }catch(e){
        console.error('Error al crear punto: ', e);
        return res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
      }
    }



    


}


export default new PuntodereciclajeController();
