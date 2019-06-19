import { Injectable } from '@angular/core';
import { Formulario } from '../shared/formulario.model';
import { HttpClient } from '@angular/common/http';

import { URL_API } from '../shared/api';

import 'rxjs'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private http: HttpClient) {
  }


  public addEssencia(form: Formulario): Observable<Formulario> {
    const url = `${URL_API}/essencias`
    return this.http.post<Formulario>(url, form)
  }

  public getEssencias(): Observable<Formulario[]> {
    return this.http.get<Formulario[]>(`${URL_API}/essencias`)
  }

  public getEssencia(id: number): Observable<Formulario> {
    return this.http.get<Formulario>(`${URL_API}/essencias/${id}`)
  }

  public editaEssencia(form: Formulario): Observable<Formulario> {
    return this.http.put<Formulario>(`${URL_API}/essencias/${form.id}`, form)
  }

  public deleteEssencia(id: number): Observable<Formulario> {
    return this.http.delete<Formulario>(`${URL_API}/essencias/${id}`)
  }


}
