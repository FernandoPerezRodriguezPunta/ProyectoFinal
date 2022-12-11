
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { querystring } from '@firebase/util';
import { identity } from 'rxjs';
import { Producto } from '../models/models';
import { query, where } from "firebase/firestore";






@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
  uid:String;


  constructor(private firestore: AngularFirestore) {


    this.uid='';

  }

  /*añade un nuevo producto a la collección*/

  createProducto(producto: Producto): void {
    this.firestore.collection('producto').add(producto);
  }

  /*Devulve la colleción de productos*/

  getProducto() {
    return this.firestore.collection('producto').snapshotChanges();
  }

  /*cambia los datos del id del producto pasado por cabecera*/

  updateProducto(id: any, producto: Producto): void {
    this.firestore.collection('producto').doc(id).update(producto);
  }

  /*devuelve el token del producto*/ 

 async devuelveProductoToken(modelo:string){
  
  const document = this.firestore.collection('producto').ref.where("modelo","==",modelo).get();
   
   

  (await document).forEach(doc => {
   


  return  this.uid=doc.id;


  })


  return this.uid;
  
 }

  


  /*borra de la collecion al producto cuyo id es pasado por cabecera*/

  deleteProducto(id: any): void {
    this.firestore.collection('producto').doc(id).delete();
  }
}
