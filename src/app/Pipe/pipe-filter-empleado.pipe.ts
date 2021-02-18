import { Pipe, PipeTransform } from '@angular/core';
import { ɵangular_packages_router_router_e } from '@angular/router';

@Pipe({
  name: 'pipeFilterEmpleado'
})
export class PipeFilterEmpleadoPipe implements PipeTransform {

  transform(value: any,arg: any,tipo:string): any {
     const lstEmpleados=[];

     for (const Empleado of value){
         if(tipo==="Nombre"){
          if(Empleado.nombre.indexOf(arg)>-1){
            lstEmpleados.push(Empleado);
          }
         } else if(tipo==="Apellido"){
          if(Empleado.apellido.indexOf(arg)>-1){
            lstEmpleados.push(Empleado);
          }
        }else if(tipo==="Correo"){
          if(Empleado.correo.indexOf(arg)>-1){
            lstEmpleados.push(Empleado);
          }
        }else if(tipo==="Estatus"){
          if(Empleado.estatus.indexOf(arg)>-1){
            lstEmpleados.push(Empleado);
          }
        }

     }
    return lstEmpleados;
  }

}
