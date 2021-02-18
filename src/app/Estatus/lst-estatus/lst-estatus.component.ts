import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../Modelo/Empleado';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { EmpleadoServiceService } from 'src/app/Services/empleado.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { EstatusService } from '../../Services/estatus.service'
import { Estatus } from 'src/app/Modelo/Estatus';
import { DialogSuccessComponent } from '../../dialog-success/dialog-success.component';
import { DialogErrorComponent } from 'src/app/dialog-error/dialog-error.component';
@Component({
  selector: 'app-lst-estatus',
  templateUrl: './lst-estatus.component.html',
  styleUrls: ['./lst-estatus.component.scss']
})
export class LstEstatusComponent implements OnInit {
  public busqueda: string = "";
  public filtro: string = "Nombre"
  public lstMostrar: any[] = [];
  public lstMostrars: any[] = [];
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
  ) { }

  ngOnInit(): void {

    this.id = Number(this.routerActivated.snapshot.paramMap.get('id'));
    this.MostrarEstatus();
  }
  MostrarEstatus() {

    this.EstatusService.GetEstatus().subscribe(respuesta => {
      this.lstestatus = respuesta.datos;
      this.lstMostrar = this.lstestatus;
    });
  }

  EnviarEstatus(estatus: Estatus) {
    this.router.navigate(['/FormEstatus', estatus.id_Estatus])
  }

  Eliminar(estatus: Estatus) {


    this.EmpleadoService.GetEmpleados().subscribe(respuesta => {
      this.lstEmpleados = respuesta.datos;
      let queryEstatus=this.lstEmpleados.find(item=>item.estatus===estatus.id_Estatus);
      if(queryEstatus){
        const DialogRef=this.dialog.open(DialogErrorComponent,{
          width:"300px",
          data:{mensaje:"El estatus que desea eliminar contiene empleados."
          +"Para eliminar este estatus elimine o cambie de estado los empleados con este estatus"}
      });
      }else{
        const DialogRef = this.dialog.open(DialogComponent, {
          width: "300px",
          data:{mensaje:"¿Estas seguro que deseas eliminar este estatus?"}
        });
        DialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.EstatusService.delete(estatus.id_Estatus).subscribe(response => {
              if (response.exito === 1) {
                const DialogRef = this.dialog.open(DialogSuccessComponent, {
                  width: "300px",
                  data: { mensaje: "Estatus eliminado con exito!" }
                }).afterClosed().subscribe(result=>{
                  location.href="/Estatus"
                });
              }
            });
          }
        });

      }
    });

  }

  AddLink() {
    location.href = "/FormEstatus"
  }
}
