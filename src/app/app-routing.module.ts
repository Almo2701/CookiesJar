import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LstEmpleadosComponent } from './Empleados/lst-empleados/lst-empleados.component';
import { InicioComponent } from './inicio/inicio.component';
import {FormEmpleadoComponent} from '../app/Empleados/form-empleado/form-empleado.component';
import { LstEstatusComponent } from './Estatus/lst-estatus/lst-estatus.component';
import { FormEstatusComponent } from './Estatus/form-estatus/form-estatus.component';

const routes: Routes = [
  {path:"Inicio" ,component:InicioComponent},
  {path:"Empleados",component:LstEmpleadosComponent},
  {path:"FormEmpleado",component:FormEmpleadoComponent},
  {path:"FormEmpleado/:id" ,component:FormEmpleadoComponent},
  {path:"FormEstatus/:id" ,component:FormEstatusComponent},
  {path:"FormEstatus" ,component:FormEstatusComponent},
  {path:"Estatus" ,component:LstEstatusComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
