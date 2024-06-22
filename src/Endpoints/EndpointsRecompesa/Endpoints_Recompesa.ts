import { Recompesas } from "../../Clases/Recompesa/Recompesa";
export default function recompesaendpoints(app:any){
    app.get('/obtener-recompesa-semanal',async(req:any,res:any)=>{
        try {
          const resultado=await Recompesas.obtenerrecompesasemanal();
          res.status(201).json(resultado);
        } catch (e) {
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })

      app.post('/verificar-recompensa', async (req:any, res:any) => {
        try {
            const resultado=await Recompesas.obtenerganador(req.body.id);
            res.status(201).json(resultado);
        } catch (error) {
            
            return res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      });  

      app.post('/agregar-recompesa',async(req:any,res:any)=>{
        try {
          const { imagen, des, fechainicio,fechafin ,puntaje} = req.body;
          const recompesa1=new Recompesas(imagen,des,fechainicio,fechafin,puntaje);
          const resultado=await recompesa1.agregarecompesa();
          res.status(201).json(resultado);
        } catch (e) {
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })

      app.get('/recuperar-recompesas',async(req:any,res:any)=>{
        try{
          const resultado=await Recompesas.obtenerultimafecha();
          res.status(201).json(resultado);
        }catch(e){
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })
}