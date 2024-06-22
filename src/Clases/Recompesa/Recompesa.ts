import moment from 'moment';
import { Recompesa } from '../../../models/Recompesa';
import { Op } from 'sequelize';
import { Response } from '../../Interfaces/Response';
import { Usuario } from '../../../models/Usuario';
class Recompesas{
    private imagen:string;
    private des:string;
    private fechai:Date;
    private fechaf:Date;
    private puntaje:number

    constructor(imagen:string,des:string,fechai:Date,fechaf:Date,puntaje:number){
        this.imagen=imagen,
        this.des=des,
        this.fechai=fechai,
        this.fechaf=fechaf,
        this.puntaje=puntaje

    }

    static async obtenerrecompesasemanal():Promise<Response>{
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
              return {mensaje:"Recompesa no disponible",res:false,data:recompensa}
            }
        
            return { mensaje: 'Recompensa semanal obtenida con éxito', res: true, data:recompensa };
          } catch (e) {
            console.error('Error al obtener recompensa semanal:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }


    static async obtenerganador(id:number):Promise<Response>{
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
                    return { mensaje: 'Recompensa ya obtenida por este usuario', res: true };
                } else if (recompensa.idUsuario !== null) {
                    return { mensaje: 'Recompensa ya obtenida por otro usuario', res: true};
                } else {
                    if (usuario.puntaje >= recompensa.puntaje) {
                        await Recompesa.update({
                            idUsuario: usuario.id
                        }, {
                            where: {
                                id: recompensa.id
                            }
                        });
      
                        
                        return { mensaje: 'Recompensa obtenida', res: true };
                    } else {
                        return { mensaje: 'Recompensa no obtenida, puntaje insuficiente', res: false };
                    }
                }
            } else {
                return { mensaje: 'No hay recompensas disponibles', res: false };
            }
        } catch (error) {
            console.error('Error al obtener recompensa semanal:', error);
            return { mensaje: 'Error interno en el servidor', res: false };
        }
    }

    async agregarecompesa():Promise<Response>{
        try {
            const fechaInicio = new Date(this.fechai);
            const fechaFin = new Date(this.fechaf);
        
            // Obtener solo la parte de la fecha en formato ISO8601 (YYYY-MM-DD)
            const fechaInicioISO = fechaInicio.toISOString().split('T')[0];
            const fechaFinISO = fechaFin.toISOString().split('T')[0];
            
            const nuevaRecompensa = await Recompesa.create({
              imagen: this.imagen,
              des: this.des,
              fechaInicio: fechaInicioISO,
              fechaFin:fechaFinISO,
              puntaje:this.puntaje
            });
        
            return { mensaje: 'Recompensa agregada con éxito', res: true, data:nuevaRecompensa };
          } catch (e) {
            console.error('Error al agregar recompensa:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }

    static async obtenerultimafecha():Promise<Response>{
        try{
            const todaslasrecompesas:any=await Recompesa.findAll({});
            const ultimfechaultimaRecompesa=todaslasrecompesas[todaslasrecompesas.length-1].fechaFin;

            return { mensaje: 'Recompensa Recuperadas', res: true, data:ultimfechaultimaRecompesa};


        }catch(e){
            console.error('Error al agregar recompensa:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
        }
    }
}

export {Recompesas}