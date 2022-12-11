import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardarProductoServiceService {



  private producto:Subject<string> = new Subject<string> ();

  constructor() {


  }


   public productos:Observable<string> = this.producto.asObservable();

   public setProducto(tipo:string):void{


    this.producto.next(tipo);

   }

}
