import { Request, Response } from 'express';
import Recompesa from '../../models/Recompesa';
import { Op } from 'sequelize';
import moment from 'moment';
import Usuario from '../../models/Usuario';
import Usuario_Recompesa from '../../models/Usuario_Recompesa';


class RecompesaController {

    public async obtenerrecompesasemanal(req: Request, res: Response): Promise<Response> {
        try {
          
            const inicioSemana = moment().startOf('isoWeek').subtract(1, 'day');
            
            const finSemana = moment().endOf('isoWeek').subtract(1, 'day');
        
            
            const recompensa = await Recompesa.findOne({
              where: {
                fechaInicio: {
                  [Op.between]: [inicioSemana, finSemana] 
                }
              }
            });
        
            
        
            if(!recompensa){
              return res.status(201).json({mensaje:"Recompesa no disponible",res:false,data:recompensa})
            }
        
            return res.status(201).json({ mensaje: 'Recompensa semanal obtenida con éxito', res: true, data:recompensa });
          } catch (e) {
            console.error('Error al obtener recompensa semanal:', e);
            return res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
          }
    }

    public async obtenerganador(req: Request, res: Response): Promise<Response> {
        const {id}=req.body;
        try {
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
            const usuario:any = await Usuario.findOne({
                where: {
                    id:id
                }
            });
      
            const recompensa:any = await Recompesa.findOne({
                where: {
                    fechaInicio: {
                        [Op.lte]: fechaHoySinHora // fechaInicio <= fechaHoySinHora
                    },
                    fechaFin: {
                        [Op.gte]: fechaHoySinHora // fechaFin >= fechaHoySinHora
                    },
                    stock: {
                        [Op.ne]: 0 // stock != 0
                    }
                }
            });


            const usuario_recompesa=await Usuario_Recompesa.findOne({
                where:{
                    UsuarioId:id
                }
            })

            if(usuario_recompesa){
                return res.status(201).json({mensaje:"Ya has ganado una recompensa",res:true})
            }

            
      
            if (recompensa) {
                
                    if (usuario.puntaje >= recompensa.puntaje) {

                        await Usuario_Recompesa.create({
                                UsuarioId:usuario.id,
                                RecompesaId:recompensa.id
                            
                        })
                        await Recompesa.update({
                            stock:recompensa.stock-1
                        }, {
                            where: {
                                id: recompensa.id
                            }
                        });
      
                        
                        return res.status(201).json({ mensaje: 'Recompensa obtenida', res: true });
                    } else {
                        return res.status(201).json({ mensaje: 'Recompensa no obtenida, puntaje insuficiente', res: false });
                    }
                
            } else {
                return res.status(201).json({ mensaje: 'No hay recompensas disponibles', res: false });
            }
        } catch (error) {
            console.error('Error al obtener recompensa semanal:', error);
            return res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
    }

    public async agregarecompesa(req: Request, res: Response): Promise<Response> {
        const {fechainicio,fechafin,imagen,des,puntaje,stock}=req.body;
        try {
            const fechaInicio = new Date(fechainicio);
            const fechaFin = new Date(fechafin);
        
            // Obtener solo la parte de la fecha en formato ISO8601 (YYYY-MM-DD)
            const fechaInicioISO = fechaInicio.toISOString().split('T')[0];
            const fechaFinISO = fechaFin.toISOString().split('T')[0];
            
            const nuevaRecompensa = await Recompesa.create({
              imagen: imagen,
              des: des,
              fechaInicio: fechaInicioISO,
              fechaFin:fechaFinISO,
              puntaje:puntaje,
              stock:stock
            });
        
            return res.status(201).json({ mensaje: 'Recompensa agregada con éxito', res: true, data:nuevaRecompensa });
          } catch (e) {
            console.error('Error al agregar recompensa:', e);
            return res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
          }
    }

    public async obtenerultimafecha(req: Request, res: Response): Promise<Response> {
        try{
            const todaslasrecompesas:any=await Recompesa.findAll({});
            const ultimfechaultimaRecompesa=todaslasrecompesas[todaslasrecompesas.length-1].fechaFin;
            const fecha = new Date(ultimfechaultimaRecompesa);

            // Sumar dos días
            fecha.setDate(fecha.getDate() + 2);

            // Obtener la nueva fecha con dos días sumados
            const nuevaFecha = fecha.toISOString().split('T')[0];
            return res.status(201).json({ mensaje: 'Recompensa Recuperadas', res: true, data:nuevaFecha});


        }catch(e){
            console.error('Error al agregar recompensa:', e);
            return res.json(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
    }

    public async eliminarid(req:Request,res:Response):Promise<Response>{
        try{
            const {id}=req.body;

            const usuario_recompesa=await Usuario_Recompesa.destroy({
                where:{
                    id:id
                }
            })

            return res.status(201).json({ mensaje: 'Recompensa eliminada', res: true });


             





        }catch(e){
            return res.status(500).json({mensaje:'Error interno en el servidor',res:false})
        }
    }

    public async actualizarstock(req:Request,res:Response):Promise<Response>{
        try{
            const {id,stock}=req.body;

            const usuario_recompesa = await Recompesa.update(
                { stock: stock }, // objeto de actualización
                { where: { id: id } } // opciones, incluyendo la condición `where`
              );
              

            return res.status(201).json({ mensaje: 'Recompensa actualizada', res: true });


             





        }catch(e){
            return res.status(500).json({mensaje:'Error interno en el servidor',res:false})
        }
    }

    




}


export default new RecompesaController();
