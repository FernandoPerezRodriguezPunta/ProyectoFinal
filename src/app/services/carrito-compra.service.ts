import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { Carrito } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CarritoCompraService {

  constructor(private firestore:AngularFirestore) { }


  /*añade un nuevo carrito a la collection*/ 

  createCarrito(carrito:Carrito){

   
    this.firestore.collection('carrito').add(carrito);


  }


 /*Devuelve la colleción del carrito*/

  getCarrito(){


    return this.firestore.collection('carrito').snapshotChanges();

  }

  /*cambia los datos del id del carrito pasado por cabecera*/ 

   updateCarrito(id:any,carrito:Carrito):void{

     this.firestore.collection('carrito').doc(id).update(carrito);



   } 

   deleteCarrito(id:string){

      this.firestore.collection('carrito').doc(id).delete();


   }


   vaciarCarrito(){


    this.firestore.collection("carrito").get().subscribe(res => {
    res.forEach(element => {
      element.ref.delete();
    });
  });


   }




}
