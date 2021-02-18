import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {DialogSuccessComponent} from '../../dialog-success/dialog-success.component';
import{DialogErrorComponent} from '../../dialog-error/dialog-error.component'
import { EmpleadoServiceService } from 'src/app/Services/empleado.service';
import{EstatusService}from '../../Services/estatus.service';
import { Estatus } from 'src/app/Modelo/Estatus';
import{Empleado}from 'src/app/Modelo/Empleado';
@Component({
  selector: 'app-form-estatus',
  templateUrl: './form-estatus.component.html',
  styleUrls: ['./form-estatus.component.scss']
})
export class FormEstatusComponent implements OnInit {
  public EstatusForm = this.formbuilder.group({
    id_Estatus: [1],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],


  });

  public id: number = 0;
  public lstempleado: Empleado[] = [];
  public lstestatus: Estatus[] = [];

  constructor(
    public EmpleadoService: EmpleadoServiceService,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private EstatusService:EstatusService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.getEstatus();
    this.EstatusIsValid(this.id);
  }

  EstatusIsValid(id: number) {

    this.EstatusService.GetEstatus().subscribe(respuesta => {
      this.lstestatus = respuesta.datos;
      let EstatusEdit = this.lstestatus.find(item => item.id_Estatus === id);
      console.log(EstatusEdit)
      if (EstatusEdit) {

        this.EstatusForm.controls['id_Estatus'].setValue(EstatusEdit.id_Estatus);
        this.EstatusForm.controls['nombre'].setValue(EstatusEdit.nombre);
        this.EstatusForm.controls['descripcion'].setValue(EstatusEdit.descripcion);

      }
      else if (id > 0 && EstatusEdit === undefined) {
        location.href = "/404"
      }

    });

  }
  addEstatus() {
    let nombre=this.EstatusForm.controls['nombre'].value;
    let id_Estatus= Number(this.getEstatusId().value);
    this.getEstatusId().setValue(id_Estatus);

    this.EstatusService.GetEstatus().subscribe(respuesta=>{
      this.lstestatus=respuesta.datos;
      let queryEstatus=this.lstestatus.find(item=>item.id_Estatus===this.id)
      let queryExiste=this.lstestatus.find(item=>
        item.nombre.toLowerCase()===nombre.toLowerCase()&&item.nombre!==queryEstatus?.nombre);
       console.log(queryExiste)
        if (queryExiste){
           const DialogRef=this.dialog.open(DialogErrorComponent,{
               width:"300px",
               data:{mensaje:"Ya existe un estatus con este nombre"}
           })
      }else{
        this.EstatusService.Add(this.EstatusForm.value).subscribe(response => {
          if (response.exito === 1) {
            const DialogRef = this.dialog.open(DialogSuccessComponent, {
              width: "300px",
              data:{mensaje:"Estatus creado exitosamente!"}
            }).afterClosed().subscribe(response=>{
              location.href="/FormEstatus"
            });
          };

        });
      }
     });

  }

  EditEstatus() {
    let nombre=this.EstatusForm.controls['nombre'].value;
    let id_Estatus= Number(this.getEstatusId().value);
    this.getEstatusId().setValue(id_Estatus);

    this.EstatusService.GetEstatus().subscribe(respuesta=>{
      this.lstestatus=respuesta.datos;
      let queryEstatus=this.lstestatus.find(item=>item.id_Estatus===this.id)
      let queryExiste=this.lstestatus.find(item=>
        item.nombre.toLowerCase()===nombre.toLowerCase()&&item.nombre!==queryEstatus?.nombre);
      if (queryExiste){
           const DialogRef=this.dialog.open(DialogErrorComponent,{
               width:"300px",
               data:{mensaje:"Ya existe un estatus con este nombre"}
           })
      }else{
        this.EstatusService.Edit(this.EstatusForm.value).subscribe(response => {
          if (response.exito === 1) {
            const DialogRef = this.dialog.open(DialogSuccessComponent, {
              width: "300px",
              data:{mensaje:"Estatus editado exitosamente!"}
            }).afterClosed().subscribe(response=>{
              location.href="/Estatus"
            });
          };

        });
      }
     });


  }

  getEstatus(){

    this.EstatusService.GetEstatus().subscribe(respuesta => {
      this.lstestatus = respuesta.datos;
      console.log(this.lstestatus)
    });

  }
  getErrorMessage(campo: string) {
    let MsgError;
    if (this.EstatusForm.controls[campo].getError('required')) {
      MsgError = "Campo vacio";
    }

    return MsgError;
  }

  isValidField(campo: string) {

    return (this.EstatusForm.controls[campo].touched
      || this.EstatusForm.controls[campo].dirty &&
      !this.EstatusForm.controls[campo].valid);
  }
  //get campos del formulario
  getEstatusId() { return this.EstatusForm.controls['id_Estatus'] }
  getNomre() { return this.EstatusForm.controls['nombre'] }
  getDescripcion() { return this.EstatusForm.controls['descripcion'] }

}

