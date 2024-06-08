import { Consejo } from "../../Clases/Consejos/Consejos";


export default function ConsejosEndpoints(app:any){
    app.get('/recuperar-consejos',async(req:any,res:any)=>{
        try{
            const consejos=await Consejo.RecuperarConsejos();
            res.status(200).json(consejos);
        }catch(e:any){
            res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
    })


    app.post('/agregar-consejo',async(req:any,res:any)=>{
        try{
         const {des,dia}=req.body;
         const consejo=new Consejo(des,dia);
         const resultado=await consejo.AgregarConsejos();
         res.status(200).json(resultado); 
      
        }catch(e){
          console.error("Error al realizar la operación: ", e);
          res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
      })
}