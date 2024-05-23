import { PRBateriasFactory } from "../../Clases/Puntodereciclaje/PRBateriasFactory";
import { PRMetalFactory } from "../../Clases/Puntodereciclaje/PRMetalFactory";
import { PRPapelFactory } from "../../Clases/Puntodereciclaje/PRPapelFactory";
import { PRPlasticoFactory } from "../../Clases/Puntodereciclaje/PRPlasticoFactory";
import { PRRopaClass } from "../../Clases/Puntodereciclaje/PRRopaClass";
import { PRRopaFactory } from "../../Clases/Puntodereciclaje/PRRopaFactory";
import { PuntodereciclajeClass } from "../../Clases/Puntodereciclaje/PuntodereciclajeClass"

export default function puntodereciclajendpoints(app:any){

    const fabricapunto=(tipo:string)=>{
        let puntotipo = null;
            switch(tipo){
                case "Papel":
                    return puntotipo = new PRPapelFactory();
                  
                case "Plástico":
                    return puntotipo = new PRPlasticoFactory();
                    
                case "Metal":
                    return puntotipo = new PRMetalFactory();
                    
                case "Baterias":
                    return puntotipo = new PRBateriasFactory();
                    
                case "Ropa":
                    return puntotipo = new PRRopaFactory();
                   
                default:
                    return null;
            }
    }
    app.get('/obtener-puntos',async(req:any,res:any)=>{
        try{
            const resultado=await PuntodereciclajeClass.obtenerpuntos();
            res.status(201).json(resultado);
        }
        catch(e:any){
            console.error("Error al insertar el usuario: ", e.message);
            res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
    })

    app.post('/obtener-punto-realizar',async(req:any,res:any)=>{
        try{
            const {usuario}=req.body
            const resultado=await PuntodereciclajeClass.obtenerpuntosarealizar(usuario);
            res.status(200).json(resultado);
        }catch(e:any){
            console.error("Error al insertar el usuario: ", e.message);
            res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
    })


    app.post('/punto-cancelado',async(req:any,res:any)=>{
        try{
            const {lugar,id}=req.body;
            console.log(req.body);
            const resultado=await PuntodereciclajeClass.puntocancelado(lugar,id);
            res.status(200).json(resultado);
        }catch(e:any){
            console.error("Error al insertar el usuario: ", e.message);
            res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
    })


    app.post('/realizar-punto', async (req:any, res:any) => {
        try {
            console.log("Body,"+req.body.id_usuario);
            const { tipo, punto, idu, id } = req.body;

            

            const puntotipo = fabricapunto(tipo);
            if (!puntotipo) {
                throw new Error("Tipo de material no válido");
            }

            const objetopunto = puntotipo.crearpuntodereciclaje(punto);
            console.log("Objetnto final"+objetopunto);
            const respuesta = await objetopunto.realizarpunto(idu, id);
            res.status(200).json(respuesta);

        } catch (e:any) {
            console.error("Error al realizar el punto de reciclaje: ", e.message);
            res.status(500).json({ mensaje: e.message, res: false });
        }
    });

    app.post('/punto-cancelado-qr',async(req:any,res:any)=>{
        try{
            //const {punto,id}=req.body;
            const {id,tipo,lugarseleccionado,latitud,longitud,lugar,cantidad}=req.body;

            const punto={
                id:id,
                latitud:latitud,
                longitud:longitud,
                lugar:lugar,
            }
            const puntotipo=fabricapunto(tipo);
            if(!puntotipo){
                throw new Error("Tipo de material no valido");
            }

            const objetopunto=puntotipo.crearpuntodereciclaje(punto);
            const respuesta=await objetopunto.puntorealizadoqr(lugarseleccionado,cantidad,id);
            res.status(200).json(respuesta)
            
            
        }catch (e:any) {
            console.error("Error al realizar el punto de reciclaje: ", e.message);
            res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
        }
    })


    app.post('/agregar-punto',async(req:any,res:any)=>{
        try{
            const {latitud,longitud,lugar,tipo}=req.body;
            console.log(req.body);
            const punto={
                id:null,
                latitud:req.body.latitud,
                longitud:req.body.longitud,
                lugar:req.body.lugar,
            }
            const puntotipo=fabricapunto(tipo);
            if(!puntotipo){
                throw new Error("Tipo de material no valido");
            }
            const objetopunto=puntotipo.crearpuntodereciclaje(punto);
            const respuesta=await objetopunto.agregarpunto();
            res.status(200).json(respuesta);
        }catch (e:any) {
            console.error("Error al realizar el punto de reciclaje: ", e.message);
            res.status(500).json({ mensaje: "Error interno en el servidor", res: false });
        }
    })



}