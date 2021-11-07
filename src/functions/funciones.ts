export function isCompany(idComp1:string,idComp2:string){
    if(idComp1 === '-1' ) return true;
    if(idComp1 === idComp2) return true;
    return false
}

export function isUser(idUsr1:string, idUsr2:string){
    if(idUsr1 === '-1') return true;
    if(idUsr1 === idUsr2) return true;
    return false

}

export function dateInterval(fIn:string,fFin:string,fecha:string){
    if((fecha >= fIn) && (fecha <= fFin)) return true;
    return false 
}

export function intervalActive(fechaAnterior:string, fechaActual:string,interval){
    const [fechaAn,horaAn]= fechaAnterior.split('.')[0].split('T') // Separo fecha y Hora
    const [hAn,mAn,sAn] = horaAn.split(':') // Separo Hora en Hora, Minuto, Segundo
    const [fechaAc,horaAc]= fechaActual.split('.')[0].split('T')
    const [hAc,mAc,sAc] = horaAc.split(':')

    const segAn = Number(hAn)*3600 + Number(mAn)*60 + Number(sAn) // Convierto todo a segundos
    let segAc = Number(hAc)*3600 + Number(mAc)*60 + Number(sAc)
    if(fechaAc !== fechaAn){ // Si hay diferencia de 1 dia en fecha para el intervalo
        segAc = Number(hAc+24)*3600 + Number(mAc)*60 + Number(sAc)
    }
    if((segAc-segAn) <= interval*60  ){ // Si diferencia de segundos esta en el intervalo significa que es intervalo activo
        return true // SI es parte del intervalo
    }
    return false // No es parte del intervalo 
    
}