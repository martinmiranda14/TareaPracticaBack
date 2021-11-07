import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as rl from 'readline';
import { dateInterval, intervalActive, isCompany, isUser } from 'src/functions/funciones';
;



@Injectable()
export class DataService {

    constructor(){}

    private readonly Data = 'src/dataBD/data.csv'; /// Ruta del archivo
    
    async getFilter(idCom:number,idUsr:number,fechas:string,inter:number){
       /* Lectura  archivo */
       const readInterface = rl.createInterface({
           input: fs.createReadStream(this.Data),
           output: process.stdout,
           terminal: false
       });

       const [fIn,fFin] = fechas.split('_');
       const eventFecha= {  };
       const lastUser = { };
       for await (const line of readInterface){
           const [compId,usrId,,,date]= line.split(',')
           const [fecha,]=date.split('T')
        
           if(fecha < fIn){ // solo se revisa un intervalo
               continue
           }
           if(fecha > fFin){ // no se revisan fechas menores
            break
           }
           if( // Filtros
               isCompany(idCom.toString(),compId) && // Reviso compañia solicitada
               isUser(idUsr.toString(),usrId)                // Reviso usuario solicitado
           ){
               if(!lastUser[usrId]){ // Usuario no tiene solicitudes previas
                   lastUser[usrId] = date; // añado solicitud al usuario
                   if(!eventFecha[fecha]) eventFecha[fecha] = 1 ; // registro un evento a la fecha
                   else eventFecha[fecha] = eventFecha[fecha] + 1 ;
               }
               else{
                   //console.log('Usuario existe',usrId)
                   if(!intervalActive(lastUser[usrId],date,inter)) { // comparo la solicitud con la ultima del usuario para ver si es parte el intervalo
                       lastUser[usrId] = date ; // se cambia la ultima solicitud del usuario
                       if(!eventFecha[fecha]) eventFecha[fecha] = 1;
                       else eventFecha[fecha] = eventFecha[fecha] + 1 ;
                   }
               }

           }
       }
       return [eventFecha,lastUser]
        
        
    }

    
    
}

