import { Request, Response } from 'express';
import Usuario from '../../models/Usuario';
import Objetivo from '../../models/Objetivo';
import Objetivo_Usuario from '../../models/Objetivo_Usuario';
import Punto_Usuario from '../../models/Punto_Usuario';
import Recompesa from '../../models/Recompesa';
import Usuario_Usuario from '../../models/Usuario_Usuario';
import Notifiacion from '../../models/Notificacion';
import Comentario from '../../models/Comentario';
import Consejos from '../../models/Consejo';
import { Op } from "sequelize";
import Sequelize from "sequelize";
import Usuario_Recompesa from '../../models/Usuario_Recompesa';

class UsuarioController {

  // Método privado para verificar los datos del usuario
  private static verificacion(usuario: { nombre: string; contrasena: string; dni: number; ntelefono: number }): boolean {
    if (usuario.dni === 0 && usuario.contrasena === '' && usuario.ntelefono === 0) {
      // Verificación por email si los campos básicos están vacíos
      const emailValidado = /\S+@\S+\.\S+/.test(usuario.nombre);
      return emailValidado;
    } else if (usuario.contrasena === 'Indefinido') {
      // Verificación por DNI y teléfono si la contraseña es 'Indefinido'
      console.log("Entro al indefinido")
      const dniValidado = /^\d{8}$/.test(usuario.dni.toString());
      const phoneValidado = /^\d{9}$/.test(usuario.ntelefono.toString());
      return dniValidado && phoneValidado;
    } else {
      // Verificación completa de DNI, email, contraseña y teléfono
      const dniValidado = /^\d{8}$/.test(usuario.dni.toString());
      const emailValidado = /\S+@\S+\.\S+/.test(usuario.nombre);
      const passwordValidado = /.{8,}/.test(usuario.contrasena);
      const phoneValidado = /^\d{9}$/.test(usuario.ntelefono.toString());
      return dniValidado && emailValidado && passwordValidado && phoneValidado;
    }
  }

  public async insertarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre, contrasena, dni, ntelefono, rol } = req.body; // Obtener datos del cuerpo de la solicitud
      console.log("Body:" + req.body.rol);

      const usuario = await Usuario.findOne({
        where: {
            nombre:nombre
        }
    });

      if(usuario){
        return res.status(400).json({mensaje:'Usuario ya existe',res:false})
      }

      // Realizar la verificación de los datos
      const validacionExitosa = UsuarioController.verificacion({ nombre, contrasena, dni, ntelefono });
      if (!validacionExitosa) {
        return res.status(400).json({ mensaje: 'Datos incorrectos', res: false });
      }

      // Crear el usuario según el rol
      let usuarioCreado: any;
      if (rol ===undefined) {
        usuarioCreado = await Usuario.create({
          nombre,
          contrasena,
          dni,
          ntelefono
        });

        // Obtener todos los objetivos
        const objetivos = await Objetivo.findAll();

        
        // Crear registros en la tabla Objetivo_Usuario
        const registrosObjetivoUsuario = objetivos.map((objetivo: any) => ({
          UsuarioId: usuarioCreado.id,
          ObjetivoId: objetivo.id,
        }));

        await Objetivo_Usuario.bulkCreate(registrosObjetivoUsuario);
      } else if (rol === 'Admi') {
        usuarioCreado = await Usuario.create({
          nombre,
          contrasena,
          dni,
          ntelefono,
          rol
        });
      }

      return res.status(201).json({ mensaje: 'Usuario creado', res: true });
    } catch (error) {
      return res.status(500).json({ error: 'Error interno en el servidor' });
    }
  }


  public async verificarUsuario(req: Request, res: Response): Promise<Response> {

    try {
        const { nombre, contrasena } = req.body;
  
        const usuario = await Usuario.findOne({
          where: {
            nombre,
            contrasena,
          },
        });
  
        if (usuario) {
          return res.status(200).json({ mensaje: 'Usuario verificado correctamente', res: true, data: usuario });
        } else {
          return res.status(401).json({ mensaje: 'Nombre de usuario o contraseña incorrectos', res: false });
        }
      } catch (error) {
        console.error('Error al verificar el usuario: ', error);
        return res.status(500).json({ error: 'Error interno en el servidor' });
      }
  }

  public async usuarioExistente(req: Request, res: Response): Promise<Response> {
    try {
        const { nombre } = req.body;
      const usuario = await Usuario.findOne({
        where: {
          nombre: nombre
        }
      });

      if (usuario) {
        return res.status(200).json({ mensaje: "Usuario existe", res: true, data: usuario });
      } else {
        return res.status(401).json({ mensaje: "Usuario no existe", res: false })
      }
    } catch (e) {
      console.error("Error al verificar el usuario: ", e);
      return res.status(500).json({ mensaje: "Error interno del servidor", res: false });
    }
  }

  public async cambioContrasena(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre, contrasena } = req.body;
      console.log(nombre);
      console.log(contrasena);

      // Validar la contraseña actual
      const contra = /.{8,}/.test(contrasena);

      if (!contra) {
        return res.status(400).json({ mensaje: 'Contraseña incorrecta', res: false });
      }

      // Actualizar la contraseña del usuario
      const usuario = await Usuario.update({
        contrasena: contrasena
      }, {
        where: {
          nombre
        }
      });

      if (usuario[0] === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado', res: false });
      }

      return res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente', res: true });

    } catch (error) {
      console.error('Error al cambiar la contraseña: ', error);
      return res.status(500).json({ error: 'Error interno en el servidor', res: false });
    }
  }


  public async actualizarFoto(req: Request, res: Response): Promise<Response> {
    try {
        
      const { id, foto } = req.body;
      const usuario = await Usuario.update(
        { foto: foto },
        {
          where: {
            id: id
          }
        }
      );

      if (usuario[0] === 0) {
        return res.status(404).json({ mensaje: "Usuario no encontrado", res: false });
      }

      return res.status(200).json({ mensaje: "Usuario actualizado", res: true, data: usuario });

    } catch (e) {
      console.error("Error al realizar la operación: ", e);
      return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
    }
  }

  public async actualizarDatosUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const { id, nombre, contrasena, dni, ntelefono } = req.body;

      if (!id || !nombre || !contrasena || !dni || !ntelefono) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios', res: false });
    }

      // Validar los datos del usuario
      const validacionExitosa = UsuarioController.verificacion({ nombre, contrasena, dni, ntelefono });
      if (!validacionExitosa) {
        return res.status(400).json({ mensaje: 'Campos incorrectos', res: false });
      }

      // Actualizar los datos del usuario

      let usuario;
      if(contrasena==="Indefinido"){
        usuario = await Usuario.update({
          nombre:nombre,
          contrasena:"",
          dni:dni,
          ntelefono:ntelefono
        }, {
          where: {
            id
          }
        });
      }
      else{
        usuario = await Usuario.update({
          nombre,
          contrasena,
          dni,
          ntelefono
        }, {
          where: {
            id
          }
        });
      }
      

      if (usuario[0] === 1) {
        return res.status(200).json({ mensaje: 'Datos de usuario actualizados correctamente', res: true });
      } else {
        return res.status(404).json({ mensaje: 'El usuario no existe', res: false });
      }
    } catch (e) {
      return res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
    }
  }


  public async obtenerUsuario(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.body;
      const usuario = await Usuario.findOne({
        where: {
          id: id
        }
      });

      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado", res: false });
      }

      return res.status(200).json({ mensaje: "Usuario encontrado", res: true, data: usuario });
    } catch (e) {
      console.error("Error al realizar la operación: ", e);
      return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
    }
  }

  public async notasUsuario(req: Request, res: Response): Promise<any> {

    try{
        const {id}=req.body;
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
    
        
        const recompesaobtenidas=await Usuario_Recompesa.count({
          where:{
            UsuarioId:id,
          }
        })
    
        const usuarios = await Usuario.findAll({
          where: {
            rol: "Cliente"
          },
          order: [['puntaje', 'DESC']]
        });
        
    
        const poscionusuario=usuarios.findIndex((usuario:any)=>(usuario.id===id))
    
    
    
        return res.status(200).json({ mensaje: "Campos encontrados", res: true,puntosreciclados:puntosreciclados,puntaje:usuario.puntaje,recompesaobtenidas:recompesaobtenidas,usuarios:(poscionusuario+1)});
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return res.status(404).json({ mensaje: "Error interno en el servidor", res: false });
      }
  }


  public async rankingusuario(req:Request,res:Response):Promise<any>{
    try{
      const usuarios = await Usuario.findAll({
        where: {
          rol: "Cliente"
        },
        order: [['puntaje', 'DESC']]
      });


      
    
    
        return res.status(200).json({ mensaje: "Rankings de usuarios", res: true,data:usuarios});
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
      }
  }


  public async obtenernoamigos(req:Request,res:Response):Promise<any>{
    try{
        const {id}=req.body;

        const usuario=await Usuario_Usuario.findAll({
          where:{
            UsuarioAId:id,
            
          }
        })
        
    
        const usuario2=await Usuario_Usuario.findAll({
          where:{
            UsuarioBId:id,
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
            },
            rol:"Cliente"
          }
        });
    
        if(!usuario){
          return res.status(404).json({ mensaje: "Usuarios no encontrado", res: false });
        }



    
        return res.status(200).json({ mensaje: "Usuarios encontrado", res: true,data:usuariosNoAmigos });
    
    
    
    
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
      }
  }


  public async misamigos(req:Request,res:Response):Promise<any>{
    try{
   
        const {id}=req.body;
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
          return res.status(200).json({ mensaje: "Amigos encontrados", res: true, data:amistadesinfo });
    
          
    
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
    
         return res.status(200).json({ mensaje: "Amigos encontrados", res: true, data:amistadesinfo });
    
    
    
        }
    
        
    
        
        
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
      }
  }


  public async agregaramigos(req:Request,res:Response):Promise<any>{
    try{
        const {nombre,idusuario,nombre1,foto,des,tipo}=req.body;
        const usuarioi:any=await Usuario.findOne({
          where:{
            nombre:nombre
          }
        })
    
        const fechaHoy = new Date();
        const fechaHoySinHora = fechaHoy.toISOString().split('T')[0];
    
        const usuario=await Usuario_Usuario.create({
          UsuarioAId:idusuario,
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
    
        return res.status(200).json({ mensaje: "Amigo agregado", res: true,data:usuario});
    
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
      }
  }



  public async amigorechazado(req:Request,res:Response):Promise<any>{
    try{
        const {nombre,nombre1,foto,des,tipo}=req.body;
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
    
        return res.status(200).json({ mensaje: "Amigo rechazado", res: true });
    
    
      }catch(e){
        console.error("Error al realizar la operación: ", e);
        return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
      }
  }



  public async aprobarcomentario(req:Request,res:Response):Promise<any>{
    try {

        const {com}=req.body;
        console.log("Comentario final:"+com);
        const comentario:any = await Comentario.update(
          { aprobado: true },
          {
            where: {
              des: com
            },
            returning:true
          }
        );

        
      
        if (comentario[0] === 0) {
          return { mensaje: "Comentario no encontrado", res: false };
        }

        const comentariofinal=comentario[1][0];

        console.log("Comentario:"+comentariofinal.idUsuario);


        if(comentariofinal.tipo===2){
         const diaactual = new Date().getDay() || 7;
         const consejos:any=await Consejos.findAll({
          where:{
            dia:diaactual
          }
         })


         const ids=consejos.filter((consejo:any)=>consejo.id);
         const randomIndex = Math.floor(Math.random() * ids.length);

         const randomId = ids[randomIndex].id;



         const consejofinal = await Consejos.update(
          { des: com,
            idUsuario:comentariofinal.idUsuario
           }, 
          { where: { id: randomId } } 
        );

        console.log("Consejo final:"+consejofinal);



        }


        const datausuario:any=await Usuario.findOne({
          where:{
            id:comentariofinal.idUsuario
          }
        })

        

        const notifiacion=await Notifiacion.create({
          tipo:0,
          des:`Comentario :${com} fue aprobado`,
          idUsuario:comentariofinal.idUsuario,
          nombre:datausuario.nombre,
          foto:datausuario.foto
        })
      
        return res.status(200).json({ mensaje: "Comentario actualizado exitosamente", res: true,data:comentario[1][0]});
      } catch (e) {
        console.error("Error al realizar la operacion", e);
        return res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
      }
  }
  








  
}

export default new UsuarioController();




