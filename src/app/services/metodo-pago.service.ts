import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { metodoPago } from '../models/models';
@Injectable({
  providedIn: 'root',
})
export class MetodoPagoService {
  constructor(private firestore: AngularFirestore) {}

  /*añade un nuevo metodo de pago a la colección*/

  createMetodoPago(metodoPago: metodoPago): void {
    this.firestore.collection('metodoPago').add(metodoPago);
  }

  /*devuelve la colección de metodo de pago*/

  getMetodoPago() {
    return this.firestore.collection('metodoPago').snapshotChanges();
  }

  /*cambia el metodo de pago del cliente*/

  updateMetodoPago(id: any, metodoPago: metodoPago): void {
    this.firestore.collection('metodoPago').doc(id).update(metodoPago);
  }

  /*borra un metodo de pago de un cliente*/

  deleteMetodoPago(id: any): void {
    this.firestore.collection('metodoPago').doc(id).delete();
  }
}
