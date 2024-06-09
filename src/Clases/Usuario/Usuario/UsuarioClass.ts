import { Usuario } from "../../../../models/Usuario";
import { Punto_Usuario } from "../../../../models/Punto_Usuario";
import { Recompesa } from "../../../../models/Recompesa";
import { Validador } from "../Validador/Validador";
import { DniVerificationStrategy } from "../Validador/DniVerificationStrategy";
import { EmailVerificationStrategy } from "../Validador/EmailVerificationStrategy";
import { PasswordVerificationStrategy } from "../Validador/PasswordVerificationStrategy";
import { PhoneVerificationStrategy } from "../Validador/PhoneVerificationStrategy";
import { Response } from "../../../Interfaces/Response";
import { Objetivo } from "../../../../models/Objetivo";
import { Objetivo_Usuario } from "../../../../models/Objetivo_Usuario";
import { Usuario_Usuario } from "../../../../models/Usuario_Usuario";
import { Notifiacion } from "../../../../models/Notificacion";
import { Op } from "sequelize";
import Sequelize from "sequelize";


class UsuarioClass {
    private nombre: string;
    private contrasena: string;
    private dni: number|null;
    private ntelefono: number|null;
    private puntaje: number;
    private foto: string;
    private id:number;

    constructor(usuarioData: {
        nombre: string;
        contrasena: string;
        dni?: number;
        ntelefono?: number;
        puntaje?: number;
        foto?: string;
        id?:number;
    }) {
        this.nombre = usuarioData.nombre;
        this.contrasena = usuarioData.contrasena;
        this.dni = usuarioData.dni || 0;
        this.ntelefono = usuarioData.ntelefono || 0;
        this.puntaje = usuarioData.puntaje || 0;
        this.foto = usuarioData.foto || 'https://static.vecteezy.com/system/resources/previews/027/728/804/non_2x/faceless-businessman-user-profile-icon-business-leader-profile-picture-portrait-user-member-people-icon-in-flat-style-circle-button-with-avatar-photo-silhouette-free-png.png';
        this.id=usuarioData.id || 0
    }

    private verifiacion(usuario:UsuarioClass):boolean{
      console.log("Entre aqui..")
      console.log(usuario);
      if(usuario.dni===0 && usuario.contrasena==="" && usuario.ntelefono===0){
        console.log("")
        console.log("No Deberia")

        const verificationStrategy = new Validador(new EmailVerificationStrategy());
        const emailvalor=verificationStrategy.verify(usuario.nombre);
        usuario.contrasena="";
        usuario.dni=null;
        usuario.ntelefono=null;
        return emailvalor; 


      }
      else if(usuario.contrasena==="Indefinido"){
        console.log("Deberia")
        const verificationStrategy = new Validador(new DniVerificationStrategy());
        const dnivalor=verificationStrategy.verify(usuario.dni!.toString());

        verificationStrategy.setVerificationStrategy(new PhoneVerificationStrategy());
        const phonevalor=verificationStrategy.verify(usuario.ntelefono!.toString());
        usuario.contrasena="";
        return (dnivalor && phonevalor);
      }
      
      else{
        console.log("No Deberia 2")

        const verificationStrategy = new Validador(new DniVerificationStrategy());
        const dnivalor=verificationStrategy.verify(usuario.dni!.toString());
      
        verificationStrategy.setVerificationStrategy(new EmailVerificationStrategy());
        const emailvalor=verificationStrategy.verify(usuario.nombre)

        verificationStrategy.setVerificationStrategy(new PasswordVerificationStrategy);
        const passwordvalor=verificationStrategy.verify(usuario.contrasena)
        
        verificationStrategy.setVerificationStrategy(new PhoneVerificationStrategy());
        const phonevalor=verificationStrategy.verify(usuario.ntelefono!.toString());
        console.log(dnivalor);
        console.log(emailvalor);
        console.log(passwordvalor);
        console.log(phonevalor);

        return(dnivalor && emailvalor && passwordvalor && phonevalor); 

      }
      
      

    }

    async insertarUsuario(): Promise<Response> {
      

        if(this.verifiacion(this)){
          try {
            const userinfo:any = await Usuario.create({
                nombre: this.nombre,
                contrasena: this.contrasena,
                dni: this.dni,
                ntelefono: this.ntelefono
            });
            const objetivos=await Objetivo.findAll({})

            const registrosObjetivoUsuario = objetivos.map((objetivo:any) => ({
              UsuarioId: userinfo.id,
              ObjetivoId: objetivo.id,
            }));

            await Objetivo_Usuario.bulkCreate(registrosObjetivoUsuario);
            return { mensaje: "Usuario creado", res: true };

        } catch (error) {
            console.error("Error al insertar el usuario: ", error);
            throw new Error("Error interno en el servidor");
        }
        }
        else{
          return { mensaje: "Datos incorrectos", res: false };
        }
        
    }

    async verificarusuario(): Promise<Response> {
        try {
          console.log("Nombres"+this.nombre);
          console.log("Contrasena"+this.contrasena);
            const usuario = await Usuario.findOne({
                where: {
                    nombre: this.nombre,
                    contrasena: this.contrasena,
                },
            });
            console.log("usuario:"+usuario)

            if (usuario) {
                return { mensaje: "Usuario verificado correctamente", res: true, data: usuario };
            } else {
                return { mensaje: "Nombre de usuario o contraseña incorrectos", res: false };
            }
        } catch (e) {
            console.error("Error al verificar el usuario: ", e);
            throw new Error("Error interno en el servidor");
        }
    }

    static async usuarioexistente(nombre:string):Promise<Response>{
        try{
            const usuario=await Usuario.findOne({
              where:{
                nombre:nombre
              }
            })
            if(usuario){
              return { mensaje: "Usuario existe",res:true,data:usuario};
        
            }else{
              return { mensaje: "Usuario no existe",res:false };
        
            }
          }catch(e){
            console.error("Error al verificar el usuario: ", e);
            return { mensaje: "Error interno del servidor",res:false};
          }
    }

    async cambiocontrasena():Promise<Response>{
      const verificationStrategy = new Validador(new PasswordVerificationStrategy());
      const contra=verificationStrategy.verify(this.contrasena);

      if(contra){
        try {
          const usuario = await Usuario.update({
              contrasena: this.contrasena
          }, {
              where: {
                  nombre: this.nombre
              }
          })
  
          if (usuario[0] === 0) {
              return { mensaje: 'Usuario no encontrado',res:false};
          }
  
          return { mensaje: 'Contraseña actualizada exitosamente',res:true};
      } catch (e) {
          console.error(e); 
          return { mensaje: 'Error interno del servidor',res:false};
      }
      }
      else{
        return { mensaje: 'Contraseña incorrecta',res:false};
      }
      
        
    }

    static async actualizarfoto(foto:string,id:number):Promise<Response>{
        try {
            const usuario = await Usuario.update(
                { foto: foto },
                {
                    where: {
                       id:id
                    }
                }
            );
      
            if (usuario[0] === 0) {
                return { mensaje: "Usuario no encontrado", res: false };
            }
      
            return { mensaje: "Usuario actualizado", res: true, data: usuario };
      
        } catch (e) {
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
        }
    }

    async actualizardatosusuario():Promise<Response>{
      if(this.verifiacion(this)){
        try {
          const usuario = await Usuario.update({
            nombre: this.nombre,
            contrasena: this.contrasena, 
            dni: this.dni,
            ntelefono: this.ntelefono,
          }, {
            where: {
              id: this.id
            }
          });
      
          if (usuario[0] === 1) {
            return { mensaje: "Datos de usuario actualizados correctamente", res: true };
          } else {
            return { mensaje: "El usuario no existe", res: false };
          }
        } catch (e) {
          console.error("Error al realizar la operación: ", e);
          return { mensaje: "Error interno en el servidor", res: false };
        }
      }
      else{
        return { mensaje: "Campos incorrectos", res: false };
      }
      
       
    }

    static async obtenerusuario(id:number):Promise<Response>{
        try{
            const usuario=await Usuario.findOne({
              where:{
                id:id
              }
            })
        
            if(!usuario){
              return { mensaje: "Usuario no encontrado", res: false };
            }
        
            return { mensaje: "Usuario encontrado", res: true,data:usuario };
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }

    static async notasusuario(id:number):Promise<any>{
        try{
            const usuario:any=await Usuario.findOne({
              where:{
                id:id
              }
            })
        
            if(!usuario){
              return { mensaje: "Usuario no encontrado", res: false };
            }
        
            console.log(usuario)
        
        
            const puntosreciclados=await Punto_Usuario.count({
              
              where:{
                UsuarioId:id,
                realizado:true
              }
            })
        
            
            const recompesaobtenidas=await Recompesa.count({
              where:{
                idUsuario:id,
              }
            })
        
            const usuarios=await Usuario.findAll({
              order:[['puntaje','DESC']]
            })
        
            const poscionusuario=usuarios.findIndex((usuario:any)=>(usuario.id===id))
        
        
        
            return { mensaje: "Campos encontrados", res: true,puntosreciclados:puntosreciclados,puntaje:usuario.puntaje,recompesaobtenidas:recompesaobtenidas,usuarios:(poscionusuario+1)};
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }

    static async obtenerranking():Promise<Response>{
      try{
        const usuarios=await Usuario.findAll({
          order:[['puntaje','DESC']]
        })
    
    
        return { mensaje: "Rankings de usuarios", res: true,data:usuarios};
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return { mensaje: "Error interno en el servidor", res: false };
      }
    }

    static async obtenernoamigos(id:number):Promise<Response>{
      try{
        const usuario=await Usuario_Usuario.findAll({
          where:{
            UsuarioAId:id
            
          }
        })
        
    
        const usuario2=await Usuario_Usuario.findAll({
          where:{
            UsuarioBId:id
          }
        })
    
        const idsAmigos = usuario.map((user:any) => parseInt(user.UsuarioBId));
        const idsAmigos2 = usuario2.map((user:any) => parseInt(user.UsuarioAId));
        idsAmigos.push(...idsAmigos2);
        idsAmigos.push(id);
    
    
    
        const usuariosNoAmigos = await Usuario.findAll({
          where: {
            id: { 
              [Sequelize.Op.notIn]: idsAmigos
            }
          }
        });
    
        if(!usuario){
          return { mensaje: "Usuarios no encontrado", res: false };
        }
    
        return { mensaje: "Usuarios encontrado", res: true,data:usuariosNoAmigos };
    
    
    
    
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return { mensaje: "Error interno en el servidor", res: false };
      }
    }

    static async misamigos(id:number):Promise<Response>{
      try{
   
    
        const amigos=await Usuario_Usuario.findAll({
          where:{
            UsuarioAId:id
          }
        })
        
    
        if(amigos.length===0){
          
          const amigos2=await Usuario_Usuario.findAll({
            where:{
              UsuarioBId:id
            }
          })
    
          const amistades2=amigos2.map((amigo:any)=>amigo.UsuarioAId);
          const amistadesinfo=await Usuario.findAll({
            where:{
              id:{
                [Op.in]:amistades2
              }
            }
          })
          return { mensaje: "Amigos encontrados", res: true, data:amistadesinfo };
    
          
    
        }
        else{
          const amistades=amigos.map((amigo:any)=>amigo.UsuarioBId);
          const amistadesinfo=await Usuario.findAll({
            where:{
              id:{
                [Op.in]:amistades
              }
            }
          })
    
         return { mensaje: "Amigos encontrados", res: true, data:amistadesinfo };
    
    
    
        }
    
        
    
        
        
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return { mensaje: "Error interno en el servidor", res: false };
      }
    
    }

    static async agregaramigos(id_usuario:number,nombre:string,nombre1:string,foto:string,des:string,tipo:number):Promise<Response>{
      try{

        const usuarioi:any=await Usuario.findOne({
          where:{
            nombre:nombre
          }
        })
    
        const fechaHoy = new Date();
        const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
    
        const usuario=await Usuario_Usuario.create({
          UsuarioAId:id_usuario,
          UsuarioBId:usuarioi.id,
          fecha:fechaHoySinHora
        })
    
        /*const usuario1=await Usuario_Usuario.create({
          UsuarioAId:usuarioi.id,
          UsuarioBId:req.body.idusuario
        })*/
    
        const noti=await Notifiacion.destroy({
          where:{
            nombre:nombre
          }
        })
    
        const noti2=await Notifiacion.create({
          nombre:nombre1,
          foto:foto,
          des:des,
          tipo:tipo,
          idUsuario:usuarioi.id,
        })
    
        return { mensaje: "Amigo agregado", res: true,data:usuario};
    
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return { mensaje: "Error interno en el servidor", res: false };
      }
    }

    static async amigorechazado(nombre:string,nombre1:string,foto:string,des:string,tipo:number):Promise<Response>{
      try{

        const usuario:any=await Usuario.findOne({
          where:{
            nombre:nombre
          }
        })
        const noti=await Notifiacion.destroy({
          where:{
            nombre:nombre
          }
        })
        
    
        const noti2=await Notifiacion.create({
          nombre:nombre1,
          foto:foto,
          des:des,
          tipo:tipo,
          idUsuario:usuario.id,
        })
    
        return { mensaje: "Amigo rechazado", res: true };
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return { mensaje: "Error interno en el servidor", res: false };
      }
    }








}

export { UsuarioClass };

