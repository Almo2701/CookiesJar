import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../Modelo/Empleado';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { EmpleadoServiceService } from 'src/app/Services/empleado.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { EstatusService } from '../../Services/estatus.service'
import { Estatus } from 'src/app/Modelo/Estatus';
import { ViewModelEmpleados } from 'src/app/Modelo/ViewModelEmpleados';
import { DialogSuccessComponent } from '../../dialog-success/dialog-success.component';

@Component({
  selector: 'app-lst-empleados',
  templateUrl: './lst-empleados.component.html',
  styleUrls: ['./lst-empleados.component.scss']
})
export class LstEmpleadosComponent implements OnInit {

  public busqueda: string = "";
  public filtro: string = "Nombre"
  public lstMostrar: any[] = [];
  public lstpush: any[] = [];
  public lstEmpleados: Empleado[] = [];
  public lstestatus: Estatus[] = [];
  public estatusNombre: string = "clear"
  public id: number = 0;

  constructor(

    private EmpleadoService: EmpleadoServiceService,
    public dialog: MatDialog,
    private router: Router,
    private routerActivated: ActivatedRoute,
    private EstatusService: EstatusService,

  ) {

  }

  ngOnInit(): void {

    this.id = Number(this.routerActivated.snapshot.paramMap.get('id'));
    this.MostrarEmpleados();
  }

  MostrarEmpleados() {

    this.EmpleadoService.GetEmpleados().subscribe(respuesta => {
      this.lstEmpleados = respuesta.datos;
      for (const item of this.lstEmpleados) {
        let ViewModelEmpleados: ViewModelEmpleados = {
          id_Empleado: item.id_Empleado,
          nombre: item.nombre,
          apellido: item.apellido,
          telefono: item.telefono,
          correo: item.correo,
          estatus: ""
        }

        this.EstatusService.GetEstatus().subscribe(respuesta => {
          this.lstestatus = respuesta.datos;
          let query = this.lstestatus.find(estatus => estatus.id_Estatus === item.estatus);
          if (query !== undefined)
            ViewModelEmpleados.estatus = query.nombre;
        });
        this.lstpush.push(ViewModelEmpleados)
      }
      this.lstMostrar = this.lstpush;


    });
  }

  EnviarEmpleado(empleado: Empleado) {
    this.router.navigate(['/FormEmpleado', empleado.id_Empleado])
  }

  Eliminar(empleado: Empleado) {

    const DialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data:{mensaje:"¿Estas seguro que deseas eliminar este empleado?"}
    });

    DialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.EmpleadoService.delete(empleado.id_Empleado).subscribe(response => {
          if (response.exito === 1) {
            const DialogRef = this.dialog.open(DialogSuccessComponent, {
              width: "300px",
              data: { mensaje: "Empleado eliminado con exito!" }
            }).afterClosed().subscribe(result=>{
              location.href="/Empleados"
            });
          }
        });
      }
    });

  }

  AddLink() {
    location.href = "/FormEmpleado"
  }


}
