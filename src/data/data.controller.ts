import { Controller, Get, Param, Query } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {

    constructor(
        private readonly dataService: DataService
    ){}

    @Get('filter/idCom/:idCom/idUsr/:idUsr/fechas/:fechas/inter/:inter')
    async getMany(
        @Param('idCom') idCom:number,
        @Param('idUsr') idUrs:number,
        @Param('fechas') fechas: string,
        @Param('inter') inter:number

    ){
        console.log('Solicitud Recibida')
        const [eventos,usuarios] = await this.dataService.getFilter(idCom,idUrs,fechas,inter)
        console.log('Solicitud Finalizada')
        return {
            eventos,
            usuarios
        }
    }
}
