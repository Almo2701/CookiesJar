import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../Modelo/Empleado';
import { Respuesta } from '../Modelo/Respuesta';

const httpOption={
  headers: new HttpHeaders({
     'Contend-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})

export class EmpleadoServiceService {

  url:string = "https://localhost:44307/api/empleado";
  constructor(

    private _http:HttpClient
  ) { }
  GetEmpleados(): Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url);

  }

  Add(empleado:Empleado): Observable<Respuesta>{
    return this._http.post<Respuesta>(this.url,empleado,httpOption)

  }
  Edit(empleado:Empleado): Observable<Respuesta>{
   return this._http.put<Respuesta>(this.url,empleado,httpOption);

  }
  delete(id:number):Observable<Respuesta>{
    return this._http.delete<Respuesta>(`${this.url}/${id}`);
  }
  getPorNombre(busqueda:string):Observable<Respuesta>{
    return this._http.get<Respuesta>(`${this.url}/${busqueda}`);
  }
}
