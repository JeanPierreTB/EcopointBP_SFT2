import { UsuarioClass } from '../../Clases/Usuario/Usuario/UsuarioClass';


export default function usuarioEndpoints(app:any) {
  app.post("/insertar-usuario", async (req:any , res: any) => {
    try {
      const usuarioData = req.body;
      const usuario = new UsuarioClass(usuarioData);
      const resultado = await usuario.insertarUsuario();
      res.status(201).send(resultado);
    } catch (e:any) {
      console.error("Error al insertar el usuario: ", e.message);
      res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
    }
  });

  app.post("/verificar-usuario",async(req:any,res:any)=>{
    try {
      const usuarioData = req.body;
      const usuario = new UsuarioClass(usuarioData);
      const resultado = await usuario.verificarusuario();
      res.status(200).json(resultado);
  } catch (e:any) {
      console.error("Error al verificar el usuario: ", e.message);
      res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
  }
  })


  app.post('/usuario-existente',async(req:any,res:any)=>{
    try {
      const { nombre } = req.body;
      const resultado = await UsuarioClass.usuarioexistente(nombre);
      res.status(200).json(resultado);
  } catch (e: any) {
      console.error("Error al verificar la existencia del usuario: ", e.message);
      res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
  }
  })

  app.post('/cambio_contra',async(req:any,res:any)=>{
    try {
      const { nombre, contrasena } = req.body;
      const usuario = new UsuarioClass({ nombre, contrasena });
      const resultado = await usuario.cambiocontrasena();
      res.status(200).json(resultado);
  } catch (e: any) {
      console.error("Error al cambiar la contraseña: ", e.message);
      res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
  }
  })

  app.post('/actualizar-foto',async(req:any,res:any)=>{
    try {
      const { foto } = req.body;
      const { id } = req.body;
      const resultado = await UsuarioClass.actualizarfoto(foto, parseInt(id));
      res.status(200).json(resultado);
  } catch (e: any) {
      console.error("Error al actualizar la foto del usuario: ", e.message);
      res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
  }
  })

  app.post('/actualizar-datos-usuario',async(req:any,res:any)=>{
    try {
      const usuarioData = req.body;
      const usuario = new UsuarioClass(usuarioData);
      const resultado = await usuario.actualizardatosusuario();
      res.status(200).json(resultado);
  } catch (e: any) {
      console.error("Error al actualizar los datos del usuario: ", e.message);
      res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
  }
  })


  app.post('/obtener-usuario',async(req:any,res:any)=>{
    try {
      const { id } = req.body;
      const resultado = await UsuarioClass.obtenerusuario(parseInt(id));
      res.status(200).json(resultado);
  } catch (e: any) {
      console.error("Error al obtener el usuario: ", e.message);
      res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
  }
  })

  app.post('/notas-usuario',async(req:any,res:any)=>{
    try {
      const { id } = req.body;
      const resultado = await UsuarioClass.notasusuario(parseInt(id));
      res.status(200).json(resultado);
  } catch (e: any) {
      console.error("Error al obtener las notas del usuario: ", e.message);
      res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
  }
  })








}

