import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { detalle } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DetalleService {
  constructor(private firestore: AngularFirestore) {}

  createDetalle(detalle: detalle) {
    this.firestore.collection('detalle').add(detalle);
  }

  getDetalle() {
    return this.firestore.collection('detalle').snapshotChanges();
  }

  updateDetalle(id: any, detalle: detalle) {
    this.firestore.collection('detalle').doc(id).update(detalle);
  }

  deleteDetalle() {
    this.firestore
      .collection('detalle')
      .get()
      .forEach((resp) => {
        resp.forEach((doc) => {
          this.firestore
            .collection('detalle')
            .doc(doc.id)
            .delete()
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }
}
