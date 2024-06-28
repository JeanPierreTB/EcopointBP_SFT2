import { Request, Response } from 'express';
import Recompesa from '../../models/Recompesa';
import { Op } from 'sequelize';
import moment from 'moment';
import Usuario from '../../models/Usuario';


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
                    }
                }
            });
      
            if (recompensa) {
                if (recompensa.idUsuario === id) {
                    return res.status(201).json({ mensaje: 'Recompensa ya obtenida por este usuario', res: true });
                } else if (recompensa.idUsuario !== null) {
                    return res.status(201).json({ mensaje: 'Recompensa ya obtenida por otro usuario', res: true});
                } else {
                    if (usuario.puntaje >= recompensa.puntaje) {
                        await Recompesa.update({
                            idUsuario: usuario.id
                        }, {
                            where: {
                                id: recompensa.id
                            }
                        });
      
                        
                        return res.status(201).json({ mensaje: 'Recompensa obtenida', res: true });
                    } else {
                        return res.status(201).json({ mensaje: 'Recompensa no obtenida, puntaje insuficiente', res: false });
                    }
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
        const {fechai,fechaf,imagen,des,puntaje}=req.body;
        try {
            const fechaInicio = new Date(fechai);
            const fechaFin = new Date(fechaf);
        
            // Obtener solo la parte de la fecha en formato ISO8601 (YYYY-MM-DD)
            const fechaInicioISO = fechaInicio.toISOString().split('T')[0];
            const fechaFinISO = fechaFin.toISOString().split('T')[0];
            
            const nuevaRecompensa = await Recompesa.create({
              imagen: imagen,
              des: des,
              fechaInicio: fechaInicioISO,
              fechaFin:fechaFinISO,
              puntaje:puntaje
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

            return res.status(201).json({ mensaje: 'Recompensa Recuperadas', res: true, data:ultimfechaultimaRecompesa});


        }catch(e){
            console.error('Error al agregar recompensa:', e);
            return res.json(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
    }




}


export default new RecompesaController();
