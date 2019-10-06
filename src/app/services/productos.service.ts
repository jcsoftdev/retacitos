import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando=true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve,reject)=>{
      this.http.get('https://retacitos-5b575.firebaseio.com/productos_idx.json')
        .subscribe((res: Producto[]) => {
          this.productos = res;
          this.cargando = false;
          resolve();
        });
    })
    
  }
  getProducto(id: string){
   return this.http.get(`https://retacitos-5b575.firebaseio.com/productos/${id}.json`)
  }
  buscarProducto(termino: string){
    let me = this;
    if (this.productos.length===0) {
      this.cargarProductos().then(()=>{
        me.filtrarProductos(termino);
      });
    } else {
      me.filtrarProductos(termino);
    }
    
  }
  private filtrarProductos(termino: string){
    // this.productosFiltrado = this.productos.filter(producto => {
    //   return true
    // });
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    console.log(this.productos);
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    })
  }
}
