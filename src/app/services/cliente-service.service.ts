import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ClienteServiceService {


  uid:String;

  constructor(private firestore: AngularFirestore) {

    this.uid='';

  }

  /*añade un nuevo cliente a la colección*/
  createCliente(cliente: Cliente): void {
    this.firestore.collection('cliente').add(cliente);
  }

  /*devuelve la colección de clientes*/

  getCliente() {
    return this.firestore.collection('cliente').snapshotChanges();
  }

  /*cambia los datos personales del cliente pasado por cabecera*/

  async updateCliente(id: any, cliente: any) {
    this.firestore.collection('cliente').doc(id).update(cliente);
  }

  /*borra a un cliente de la colleción cuyo id es pasado por cabecera*/

  deleteCliente(id: any): void {
    this.firestore.collection('cliente').doc(id).delete();
  }

 async uidCliente(uid:string){


    const document = this.firestore.collection('producto').ref.where("uid","==",uid).get();
   
   

  (await document).forEach(doc => {
   


  return  this.uid=doc.id;


  })


  return this.uid;



  }


}
