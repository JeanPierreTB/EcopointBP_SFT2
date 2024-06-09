import { Response } from "../../Interfaces/Response";
import { Punto_Usuario } from "../../../models/Punto_Usuario";
import { Comentario } from "../../../models/Comentario";
import { Objetivo_Usuario } from "../../../models/Objetivo_Usuario";
import { Usuario } from "../../../models/Usuario";
import { Objetivo } from "../../../models/Objetivo";
import { Usuario_Usuario } from "../../../models/Usuario_Usuario";
import { Op } from "sequelize";

class Objetivos{
    private des:string;
    private puntos:number;
    private dia:number;

    constructor(des:string,puntos:number,dia:number){
        this.des=des;
        this.puntos=puntos;
        this.dia=dia;
    }

    private static async actualizarobjetivos(ObjetivoId:number, UsuarioId:number, cantidad:number, total:number) {
        let data:any;
      
        try {
          data = await Objetivo_Usuario.findOne({
            where: {
              ObjetivoId: ObjetivoId,
              UsuarioId: UsuarioId
            }
          });
        } catch (error) {
          console.error('Error al obtener datos del objetivo del usuario:', error);
          throw error;
        }
      
        if (data && data.porcentaje === 100) {
          console.log('El objetivo ya está completo.');
          return;
        }
      
        let res = (cantidad / total) * 100;
      
        if (res >= 99.9) {
          try {
            const objetivo:any= await Objetivo.findOne({ where: { id: ObjetivoId } });
            const usuario:any = await Usuario.findOne({ where: { id: UsuarioId } });
      
            await Usuario.update({ puntaje: usuario.puntaje + objetivo.puntos }, { where: { id: UsuarioId } });
          } catch (error) {
            console.error('Error al actualizar puntaje:', error);
            throw error;
          }
        }
      
        try {
          await Objetivo_Usuario.update({ porcentaje: res }, { where: { ObjetivoId: ObjetivoId, UsuarioId: UsuarioId } });
        } catch (error) {
          console.error('Error al actualizar porcentaje:', error);
          throw error;
        }
      }


    
    static async recuperarobjetivos(id:number):Promise<Response>{
        try {
            const diaactual = new Date().getDay() || 7;
        
            const objetivos = await Objetivo.findAll({
              where: { dia: diaactual },
              include: [
                {
                  model: Usuario,
                  through: { attributes: ['porcentaje'] },
                  where:{id:id},
                  attributes: { exclude: ['contrasena', 'dni', 'ntelefono', 'puntaje', 'foto', 'createdAt', 'updatedAt','nombre'] }, // Excluir los campos que no deseas enviar
                  as: 'Usuarios', // Alias para la asociación
                }
              ]
            });
        
            if (!objetivos || objetivos.length === 0) {
              return { mensaje: "Objetivos no encontrados", res: false };
            }
        
            return { mensaje: "Objetivos encontrados", res: true,data: objetivos };
        
          } catch (e) {
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }  

    static async actualizarobjetivoshoy1(id:number):Promise<Response>{
        try{
    
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const puntosrealizado=await Punto_Usuario.count({
              where:{
                UsuarioId:id,
                realizado:true,
                fecha:fechaHoySinHora
              }
            })
        
            const comentarios=await Comentario.count({
              where:{
                idUsuario:id,
                idamigo:null,
                fecha:fechaHoySinHora
              }
            })
        
            if(puntosrealizado>0 || comentarios>0){
              await Objetivos.actualizarobjetivos(1,id,puntosrealizado,3);
              await Objetivos.actualizarobjetivos(2,id,comentarios,3);
              return { mensaje: 'Objetivos Actualizados', res: true};
        
            }
            else{
              return { mensaje: 'Objetivos no actualizados', res: false};
        
            }
        
          }catch(e){
            console.error('Error al obtener recompensa semanal:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }

    static async actualizarobjetivoshoy2(id:number):Promise<Response>{
        try{
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const puntosrealizado=await Punto_Usuario.count({
              where:{
                UsuarioId:id,
                realizado:true,
                fecha:fechaHoySinHora
              }
            })
        
            const comentariosp=await Comentario.count({
              where:{
                idUsuario:id,
                idamigo:{ [Op.not]: null },
                fecha:fechaHoySinHora
              }
            })
        
            if(puntosrealizado>0 || comentariosp>0){
              await Objetivos.actualizarobjetivos(3,id,puntosrealizado,3);
              await Objetivos.actualizarobjetivos(4,id,comentariosp,1);
              return { mensaje: 'Objetivos Actualizados', res: true};
        
            }else{
              return { mensaje: 'Objetivos no actualizados', res: false};
        
            }
          }catch(e){
            console.error('Error al obtener recompensa semanal:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }

    static async actualizarobjetivoshoy3(id:number):Promise<Response>{
        try{
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const puntosrealizado=await Punto_Usuario.count({
              where:{
                UsuarioId:id,
                realizado:true,
                fecha:fechaHoySinHora
              }
            })
        
            const comentarios=await Comentario.count({
              where:{
                idusuario:id,
                idamigo:null,
                fecha:fechaHoySinHora
              }
            })
        
            if(puntosrealizado>0 || comentarios>0){
              await Objetivos.actualizarobjetivos(5,id,puntosrealizado,2);
              await Objetivos.actualizarobjetivos(6,id,comentarios,2);
              return { mensaje: 'Objetivos Actualizados', res: true};
        
            }else{
              return { mensaje: 'Objetivos no actualizados', res: false};
        
            }
          }catch(e){
            console.error('Error al obtener recompensa semanal:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }

    static async actualizarobjetivoshoy4(id:number):Promise<Response>{
        try{
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const puntosrealizado=await Punto_Usuario.count({
              where:{
                UsuarioId:id,
                realizado:true,
                fecha:fechaHoySinHora
              }
            })
        
            const amigos=await Usuario_Usuario.count({
              where:{
                [Op.or]:[
                  {UsuarioAId:id},
                  {UsuarioBId:id}
                ],fecha:fechaHoySinHora
              }
            })
        
            if(puntosrealizado>0 || amigos>0){
              await Objetivos.actualizarobjetivos(8,id,puntosrealizado,6);
              await Objetivos.actualizarobjetivos(9,id,amigos,3);
              return { mensaje: 'Objetivos Actualizados', res: true};
            }else{
              return { mensaje: 'Objetivos no actualizados', res: false};
        
            }
          }catch(e){
            console.error('Error al obtener recompensa semanal:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }

    static async actualizarobjetivoshoy5(id:number):Promise<Response>{
        try{
            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const puntosrealizado=await Punto_Usuario.count({
              where:{
                UsuarioId:id,
                realizado:true,
                fecha:fechaHoySinHora
              }
            })
        
            const comentarios=await Comentario.count({
              where:{
                idUsuario:id,
                idamigo:null,
                fecha:fechaHoySinHora
              }
            })
        
            if(puntosrealizado>0 || comentarios>0){
              await Objetivos.actualizarobjetivos(9,id,puntosrealizado,8);
              await Objetivos.actualizarobjetivos(10,id,comentarios,3);
              return { mensaje: 'Objetivos Actualizados', res: true};
        
            }else{
              return { mensaje: 'Objetivos no actualizados', res: false};
        
            }
          }catch(e){
            console.error('Error al obtener recompensa semanal:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }

    static async actualizarobjetivoshoy6(id:number):Promise<Response>{
        try{

    

            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            //primer objetivo
            const puntosrealizado=await Punto_Usuario.count({
              where:{
                UsuarioId:id,
                realizado:true,
                fecha:fechaHoySinHora
              }
            })
        
        
            //segundo objetivo
            const amigos=await Usuario_Usuario.count({
              where:{
                [Op.or]:[
                  {UsuarioAId:id},
                  {UsuarioBId:id}
                ],fecha:fechaHoySinHora
              }
            })
        
            if(puntosrealizado>0 || amigos>0){
              await Objetivos.actualizarobjetivos(11,id,puntosrealizado,5);
              await Objetivos.actualizarobjetivos(12,id,amigos,2);
              return { mensaje: 'Objetivos Actualizados', res: true};
            }
            else{
              return { mensaje: 'Objetivos no actualizados', res: false};
            }
        
        
          
        
          }catch(e){
            console.error('Error al obtener recompensa semanal:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }

    static async actualizarobjetivoshoy7(id:number):Promise<Response>{
        try{
    

            const fechaHoy = new Date();
            const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
        
            const comentarios=await Comentario.count({
              where:{
                idUsuario:id,
                idamigo:null,
                fecha:fechaHoySinHora
              }
            })
        
            const puntosrealizados=await Punto_Usuario.count({
              where:{
                UsuarioId:id,
                realizado:true,
                fecha:fechaHoySinHora
              }
            })
        
            if(comentarios>0 || puntosrealizados>0){
              await Objetivos.actualizarobjetivos(13,id,comentarios,2);
              await Objetivos.actualizarobjetivos(14,id,puntosrealizados,1);
        
              return { mensaje: 'Objetivos Actualizados', res: true};
              
        
            }
            else{
              return { mensaje: 'Objetivos no actualizados', res: false};
            }
        
          }catch(e){
            console.error('Error al obtener recompensa semanal:', e);
            return { mensaje: 'Error interno en el servidor', res: false };
          }
    }

    async agregarobjetivo():Promise<Response>{
        try{
            const objetivo=await Objetivo.create({
              des:this.des,
              puntos:this.puntos,
              dia:this.dia
            })
            return {mensaje:"Objetivo creado",res:true};
        
          }catch(e){
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }


}

export {Objetivos}