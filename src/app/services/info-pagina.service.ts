import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  // public infoPaginaServices: InfoPaginaService
  info: InfoPagina = {};
  cargada = false;
  equipo: any[];
  constructor(private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }
  private cargarInfo(){
    this.http.get('assets/data/data.json')
      .subscribe((res: InfoPagina) => {
        this.cargada = true;
        this.info = res;
      });
  }
  private cargarEquipo(){
    this.http.get('https://retacitos-5b575.firebaseio.com/equipo.json')
      .subscribe((resp:any) => {
        this.cargada = true;
        this.equipo = resp;
      });
  }
}
