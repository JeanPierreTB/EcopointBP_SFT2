import { CComentarioFactory } from "../../Clases/Comentario/CComentarioFactory";
import { CSoporteFactory } from "../../Clases/Comentario/CSoporteFactory";
import { CSugerenciaFactory } from "../../Clases/Comentario/CSugerenciaFactory";
import { Comentarioclass } from "../../Clases/Comentario/Comentarioclass";


export default function ComentarioEndpoints(app:any){
    const fabricacomentario=(tipo:number)=>{
        let comentariotipo;
        switch(tipo){
            case 1:
                return comentariotipo=new CSoporteFactory();
            case 2:
                return comentariotipo=new CComentarioFactory();
            case 3:
                return comentariotipo=new CSugerenciaFactory();
            default:
                return null;
        }

    }
    app.get('/obtener-comentarios',async(req:any,res:any)=>{
        try{
            const comentarios=await Comentarioclass.recuperarComentarios();
            res.status(200).json(comentarios);
        }catch(e:any){
            console.error("Error al insertar el usuario: ", e.message);
            res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
    })

    app.post('/realizar-comentario',async(req:any,res:any)=>{
        try{
            const {tipo,des,id}=req.body;
            const comentariotipo=fabricacomentario(tipo);
            if(!comentariotipo){
                throw new Error("Tipo de comentario no valido")
            }
            const objetocomentario=comentariotipo.crearComentario(des);
            const respuesta=await objetocomentario.agregarComentario(id);
            res.status(200).json(respuesta);
            
            
        }catch(e:any){
            console.error("Error al insertar el usuario: ", e.message);
            res.status(500).send({ mensaje: "Error interno en el servidor", res: false });
        }
    })
}