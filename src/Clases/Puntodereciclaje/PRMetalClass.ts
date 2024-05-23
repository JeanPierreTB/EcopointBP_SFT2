import { Response } from "../../Interfaces/Response";
import { PuntodereciclajeClass } from "./PuntodereciclajeClass";
import { Punto } from "../../../models/Punto";
import { Punto_Usuario } from "../../../models/Punto_Usuario";
import { Usuario } from "../../../models/Usuario";
import qrcode from 'qrcode';


export class PRMetalClass extends PuntodereciclajeClass{
    constructor(puntodereciclajedata:{
        latitud:number;
        longitud:number;
        lugar:string;
        id:number|null;
    }){
        super(puntodereciclajedata);
    }

    async realizarpunto(id_usuario: number, id: number): Promise<Response> {
        try {
            // Buscar el punto
            const punto = await Punto.findOne({
              where: {
                id: id,
                tipo:"Metal"
              }
            });
        
            if (!punto) {
              return { mensaje: "Punto no encontrado", res: false };
            }
        
        
            await Punto_Usuario.create({
              UsuarioId: id_usuario,
              PuntoId: id,
              realizado:false,
              cantidad:0
            });
        
            return { mensaje: "Operación exitosa", res: true };
          } catch (e) {
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }
    async puntorealizadoqr(lugarseleccionado: string, cantidad: number, id: number): Promise<Response> {
        try{
      
            if(lugarseleccionado===this.lugar){
              const punto:any=await Punto.findOne({
                where:{
                  latitud:this.latitud,
                  longitud:this.longitud,
                  lugar:this.lugar,
                  tipo:"Metal"
                }
                
              })
          
              if(!punto){
                return { mensaje: "Punto no encontrado", res: false };
          
              }
        
              const usuario:any=await Usuario.findOne({
                where:{
                  id:id
                }
              })
          
              if(!usuario){
                return { mensaje: "Usuario no encontrado", res: false };
              }
        
              
            
              const puntajenuevo=usuario.puntaje+(cantidad*3);
        

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
                return { mensaje: "Usuario no encontrado", res: false };
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
        
             
          
        
              return { mensaje: "Punto Realizado", res: true,data:punto };
        
            }
        
            else{
              return { mensaje: "Lugares no coinciden", res: false };
            }
            
        
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }

    async agregarpunto(): Promise<Response> {
      try {
    
        const qrCodeData = JSON.stringify({
          latitud: this.latitud,
          longitud: this.longitud,
          lugar: this.lugar,
          tipo:"Metal"
        });
    
        const qrCodeBase64 = await qrcode.toDataURL(qrCodeData);
    
        const newpunto = await Punto.create({
          latitud: this.latitud,
          longitud: this.longitud,
          lugar: this.lugar,
          codigoqr: qrCodeBase64,
          tipo:"Metal"
        });
    
        return {
          mensaje: 'Punto creado',
          res: true,
          data: qrCodeBase64 
        };
      } catch (e) {
        console.error('Error al crear punto: ', e);
        return{ mensaje: 'Error interno en el servidor', res: false };
      }
    }
}