import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estatus } from '../Modelo/Estatus';
import { Respuesta } from '../Modelo/Respuesta';
const httpOption={
  headers: new HttpHeaders({
     'Contend-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class EstatusService {
  url:string = "https://localhost:44307/api/estatus";
  constructor(

    private _http:HttpClient
  ) { }
  GetEstatus(): Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url);

  }

  Add(estatus:Estatus): Observable<Respuesta>{
    return this._http.post<Respuesta>(this.url,estatus,httpOption)

  }
  Edit(estatus:Estatus): Observable<Respuesta>{
   return this._http.put<Respuesta>(this.url,estatus,httpOption);

  }
  delete(id:number):Observable<Respuesta>{
    return this._http.delete<Respuesta>(`${this.url}/${id}`);
  }

}

