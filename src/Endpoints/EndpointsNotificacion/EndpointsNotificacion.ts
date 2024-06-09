import { Notifiaciones } from "../../Clases/Notificacion/Notificacion";

export default function NotifiacionEndpoints(app:any){
    app.post('/noti-agregar-amigo',async(req:any,res:any)=>{
        try{
          const {des,tipo,idamigo,nombre,foto}=req.body;
          const nofificacion1=new Notifiaciones(des,tipo,nombre,foto);
          const resultado=await nofificacion1.agregarnotifiacionamigo(idamigo);
          res.status(200).json(resultado);
            
        }catch(e){
          console.error("Error al realizar la operación: ", e);
          res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
      })
}