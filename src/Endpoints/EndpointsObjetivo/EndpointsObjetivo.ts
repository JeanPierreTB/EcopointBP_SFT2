import { Objetivo } from "../../../models/Objetivo";
import { Objetivos } from "../../Clases/Objetivo/Objetivo";

export default function objetivoEndpoints(app:any){
    app.post('/recuperar-objetivo', async (req:any, res:any) => {
        try {
          const resultado=await Objetivos.recuperarobjetivos(req.body.id);
          res.status(201).json(resultado);
      
        } catch (e) {
          res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
      });


      app.post('/avance-objetivos-1',async(req:any,res:any)=>{
        try{
          
          const resultado=await Objetivos.actualizarobjetivoshoy1(req.body.id);
          res.status(201).json(resultado);
        }catch(e){
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })

      app.post('/avance-objetivos-2',async(req:any,res:any)=>{
        try{
          
          const resultado=await Objetivos.actualizarobjetivoshoy2(req.body.id);
          res.status(201).json(resultado);
        }catch(e){
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })

      app.post('/avance-objetivos-3',async(req:any,res:any)=>{
        try{
          
          const resultado=await Objetivos.actualizarobjetivoshoy3(req.body.id);
          res.status(201).json(resultado);
        }catch(e){
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })

      app.post('/avance-objetivos-4',async(req:any,res:any)=>{
        try{
          
          const resultado=await Objetivos.actualizarobjetivoshoy4(req.body.id);
          res.status(201).json(resultado);
        }catch(e){
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })

      app.post('/avance-objetivos-5',async(req:any,res:any)=>{
        try{
          
          const resultado=await Objetivos.actualizarobjetivoshoy5(req.body.id);
          res.status(201).json(resultado);
        }catch(e){
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })

      app.post('/avance-objetivos-6',async(req:any,res:any)=>{
        try{
          
          const resultado=await Objetivos.actualizarobjetivoshoy6(req.body.id);
          res.status(201).json(resultado);
        }catch(e){
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })

      app.post('/avance-objetivos-7',async(req:any,res:any)=>{
        try{
          
          const resultado=await Objetivos.actualizarobjetivoshoy7(req.body.id);
          res.status(201).json(resultado);
        }catch(e){
          res.status(500).json({ mensaje: 'Error interno en el servidor', res: false });
        }
      })


      app.post('/agregar-objetivo',async(req:any,res:any)=>{
        try{
          const{des,puntos,dia}=req.body
          const objetivo1=new Objetivos(des,puntos,dia)
          const resultado=await objetivo1.agregarobjetivo();
          res.status(201).json(resultado);
      
        }catch(e){
          
          res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
      })




}