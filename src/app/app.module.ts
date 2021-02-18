import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import{HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './inicio/inicio.component';
import { LstEmpleadosComponent } from './Empleados/lst-empleados/lst-empleados.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import{MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { PipeFilterEmpleadoPipe } from './Pipe/pipe-filter-empleado.pipe';
import { FormEmpleadoComponent } from './Empleados/form-empleado/form-empleado.component';
import { DialogSuccessComponent } from './dialog-success/dialog-success.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { LstEstatusComponent } from './Estatus/lst-estatus/lst-estatus.component';
import { FormEstatusComponent } from './Estatus/form-estatus/form-estatus.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LstEmpleadosComponent,
    DialogComponent,
    PipeFilterEmpleadoPipe,
    FormEmpleadoComponent,
    DialogSuccessComponent,
    DialogErrorComponent,
    LstEstatusComponent,
    FormEstatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
