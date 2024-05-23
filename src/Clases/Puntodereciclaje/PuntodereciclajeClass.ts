import { Punto } from "../../../models/Punto";
import { Response } from "../../Interfaces/Response";
import { Punto_Usuario } from "../../../models/Punto_Usuario";
import { Op } from 'sequelize';


export abstract class PuntodereciclajeClass{
    public latitud:number;
    public longitud:number;
    public lugar:string;
    public id:number|null;

    constructor(puntodereciclajedata:{
        latitud:number;
        longitud:number;
        lugar:string;
        id:number|null;
    }){
        this.latitud=puntodereciclajedata.latitud;
        this.longitud=puntodereciclajedata.longitud;
        this.lugar=puntodereciclajedata.lugar;
        this.id=puntodereciclajedata.id;
    }

    static async obtenerpuntos():Promise<Response>{
        try{
            const Allpunto=await Punto.findAll({})
        
            return { mensaje: "Puntos obtenidos correctamente",res: true , data: Allpunto, };
        
          }catch(e){
            console.error("Error al obtener punto: ",e );
            return {mensaje:"Error interno en el servidor",res:false};
          }
    }

    static async obtenerpuntosarealizar(usuario:number):Promise<Response>{
      console.log("id"+usuario);
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
        
            return { mensaje: "Operación exitosa", res: true,data: puntos };
        
          } catch (e) {
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }

    static async puntocancelado(lugar:string,id:number):Promise<Response>{
        try{
            
            const punto:any=await Punto.findOne({
              where:{
                lugar:lugar
              }
            })
            if(!punto){
              return { mensaje: "Punto no encontrado", res: false };
            }
        
            const Punto_Usuario1=await Punto_Usuario.destroy({
              where:{
                PuntoId:punto.id,
                UsuarioId:id
              }
            })
        
            
        
            return { mensaje: "Punto Cancelado", res: true,data:punto };
        
    
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }

    abstract realizarpunto(id_usuario:number,id:number):Promise<Response>;
    abstract puntorealizadoqr(lugarseleccionado:string,cantidad:number,id:number):Promise<Response>
    abstract agregarpunto():Promise<Response>


    
}