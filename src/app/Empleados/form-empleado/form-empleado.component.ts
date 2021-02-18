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
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.scss']
})
export class FormEmpleadoComponent implements OnInit {


  public EmpleadoForm = this.formbuilder.group({
    id_Empleado: [1],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required,, Validators.email]],
    estatus: ['',Validators.required],

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
    this.getEstatu();
    this.EmpleadoIsValid(this.id);
  }

  EmpleadoIsValid(id: number) {

    this.EmpleadoService.GetEmpleados().subscribe(respuesta => {
      this.lstempleado = respuesta.datos;
      let EmpleadoEdit = this.lstempleado.find(item => item.id_Empleado === id);
      console.log(EmpleadoEdit)
      if (EmpleadoEdit) {

        this.EmpleadoForm.controls['id_Empleado'].setValue(EmpleadoEdit.id_Empleado);
        this.EmpleadoForm.controls['nombre'].setValue(EmpleadoEdit.nombre);
        this.EmpleadoForm.controls['apellido'].setValue(EmpleadoEdit.apellido);
        this.EmpleadoForm.controls['telefono'].setValue(EmpleadoEdit.telefono);
        this.EmpleadoForm.controls['correo'].setValue(EmpleadoEdit.correo);
        this.EmpleadoForm.controls['estatus'].setValue(EmpleadoEdit.estatus);



      }
      else if (id > 0 && EmpleadoEdit === undefined) {
        location.href = "/404"
      }

    });

  }
  addEmpleado() {
    let correo=this.EmpleadoForm.controls['correo'].value;
    let id_Estatus= Number(this.getEstatus().value);
    this.getEstatus().setValue(id_Estatus);

    this.EmpleadoService.GetEmpleados().subscribe(respuesta=>{
       let queryEmpleado=this.lstempleado.find(item=>item.id_Empleado===this.id)
      let queryExiste=this.lstempleado.find(item=>
        item.correo.toLowerCase()===correo.toLowerCase()&&item.correo!==queryEmpleado?.correo);
       console.log(queryExiste)
      if (queryExiste){
           const DialogRef=this.dialog.open(DialogErrorComponent,{
               width:"300px",
               data:{mensaje:"Ya existe un empleado con este correo"}
           })
      }else{
        this.EmpleadoService.Add(this.EmpleadoForm.value).subscribe(response => {
          if (response.exito === 1) {
            const DialogRef = this.dialog.open(DialogSuccessComponent, {
              width: "300px",
              data:{mensaje:"Empleado creado exitosamente!"}
            }).afterClosed().subscribe(response=>{
              location.href="/FormEmpleado"
            });
          };

        });
      }
     });

  }

  EditEmpleado() {
    let correo=this.EmpleadoForm.controls['correo'].value;
    let id_Estatus= Number(this.getEstatus().value);
    this.getEstatus().setValue(id_Estatus);

    this.EmpleadoService.GetEmpleados().subscribe(respuesta=>{
       let queryEmpleado=this.lstempleado.find(item=>item.id_Empleado===this.id)
      let queryExiste=this.lstempleado.find(item=>
        item.correo.toLowerCase()===correo.toLowerCase()&&item.correo!==queryEmpleado?.correo);
       console.log(queryExiste)
      if (queryExiste){
           const DialogRef=this.dialog.open(DialogErrorComponent,{
               width:"300px",
               data:{mensaje:"Ya existe un empleado con este correo"}
           })
      }else{
        this.EmpleadoService.Edit(this.EmpleadoForm.value).subscribe(response => {
          if (response.exito === 1) {
            const DialogRef = this.dialog.open(DialogSuccessComponent, {
              width: "300px",
              data:{mensaje:"Empleado editado exitosamente!"}
            }).afterClosed().subscribe(response=>{
              location.href="/Empleados"
            });
          };

        });
      }
     });

  }

  getEstatu(){

    this.EstatusService.GetEstatus().subscribe(respuesta => {
      this.lstestatus = respuesta.datos;
      console.log(this.lstestatus)
    });

  }
  getErrorMessage(campo: string) {
    let MsgError;
    if (this.EmpleadoForm.controls[campo].getError('required')) {
      MsgError = "Campo vacio";
    }
    else if (this.EmpleadoForm.controls[campo].getError('email')) {
      MsgError = "Ingrese un correo valido";
    }
    return MsgError;
  }

  isValidField(campo: string) {

    return (this.EmpleadoForm.controls[campo].touched
      || this.EmpleadoForm.controls[campo].dirty &&
      !this.EmpleadoForm.controls[campo].valid);
  }
  //get campos del formulario
  getNomre() { return this.EmpleadoForm.controls['nombre'] }
  getApellido() { return this.EmpleadoForm.controls['apellido'] }
  getTelefono() { return this.EmpleadoForm.controls['telefono'] }
  getCorreo() { return this.EmpleadoForm.controls['correo'] }
  getEstatus() { return this.EmpleadoForm.controls['estatus'] }

}
