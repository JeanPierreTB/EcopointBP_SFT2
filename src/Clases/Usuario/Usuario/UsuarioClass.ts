import { Usuario } from "../../../../models/Usuario";
import { Punto_Usuario } from "../../../../models/Punto_Usuario";
import { Recompesa } from "../../../../models/Recompesa";
import { Validador } from "../Validador/Validador";
import { DniVerificationStrategy } from "../Validador/DniVerificationStrategy";
import { EmailVerificationStrategy } from "../Validador/EmailVerificationStrategy";
import { PasswordVerificationStrategy } from "../Validador/PasswordVerificationStrategy";
import { PhoneVerificationStrategy } from "../Validador/PhoneVerificationStrategy";

interface Response {
    mensaje: string,
    res: boolean,
    usuario?:any
}

class UsuarioClass {
    private nombre: string;
    private contrasena: string;
    private dni: number;
    private ntelefono: number;
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
      const verificationStrategy = new Validador(new DniVerificationStrategy());
      const dnivalor=verificationStrategy.verify(usuario.dni.toString());
      
      verificationStrategy.setVerificationStrategy(new EmailVerificationStrategy());
      const emailvalor=verificationStrategy.verify(usuario.nombre)

      verificationStrategy.setVerificationStrategy(new PasswordVerificationStrategy);
      const passwordvalor=verificationStrategy.verify(usuario.contrasena)
        
      verificationStrategy.setVerificationStrategy(new PhoneVerificationStrategy());
      const phonevalor=verificationStrategy.verify(usuario.ntelefono.toString());
      console.log(dnivalor);
      console.log(emailvalor);
      console.log(passwordvalor);
      console.log(phonevalor);

      return(dnivalor && emailvalor && passwordvalor && phonevalor); 


    }

    async insertarUsuario(): Promise<Response> {
      

        if(this.verifiacion(this)){
          try {
            const userinfo = await Usuario.create({
                nombre: this.nombre,
                contrasena: this.contrasena,
                dni: this.dni,
                ntelefono: this.ntelefono
            });
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
            const usuario = await Usuario.findOne({
                where: {
                    nombre: this.nombre,
                    contrasena: this.contrasena,
                },
            });

            if (usuario) {
                return { mensaje: "Usuario verificado correctamente", res: true, usuario: usuario };
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
              return { mensaje: "Usuario existe",res:true,usuario:usuario};
        
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
      
            return { mensaje: "Usuario actualizado", res: true, usuario: usuario };
      
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
        
            return { mensaje: "Usuario encontrado", res: true,usuario:usuario };
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








}

export { UsuarioClass };

