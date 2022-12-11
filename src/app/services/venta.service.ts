import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { venta } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private firestore: AngularFirestore) { }


    createVenta(venta:venta){

      this.firestore.collection('venta').add(venta);


    }


    getVenta(id: any,venta:venta){


      return this.firestore.collection('venta').doc(id).update(venta);


    }




}
