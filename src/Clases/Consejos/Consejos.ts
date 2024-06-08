import { Response } from "../../Interfaces/Response";
import { Consejos } from "../../../models/Consejo";
class Consejo{
    private des:string;
    private dia:number;

    constructor(des:string,dia:number){
        this.des=des;
        this.dia=dia;
    }

    static async RecuperarConsejos():Promise<Response>{
        try{
            const diaactual=new Date().getDay() || 7;
            const consejoshoy=await Consejos.findAll({
              where:{
                dia:diaactual
              }
            })
            if(!consejoshoy){
              return {mensaje: "Consejo no encontrado", res: false };
            }
        
            return { mensaje: "Consejos encontrados", res: true,data:consejoshoy };
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }

    async AgregarConsejos():Promise<Response>{
        try{
            const consejo=await Consejos.create({
              des:this.des,
              dia:this.dia
            })
            return {mensaje:"Consejo creado",res:true};
        
          }catch(e){
            console.error("Error al realizar la operación: ", e);
            return { mensaje: "Error interno en el servidor", res: false };
          }
    }
}

export {Consejo};