import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  compr: boolean;

  private tipo: Subject<string> = new Subject<string>();

  constructor(private _producto: ProductoService, private _router: Router) {
    this.compr = false;
  }

  public tipos: Observable<string> = this.tipo.asObservable();

  public comprobar(tipo: string) {
    this._producto.getProducto().subscribe((resp) => {
      resp.map((e: any) => {
        if (e.payload.doc.data().tipo == tipo) {
          this.compr = true;
        }
      });
    });

    if (this.compr) {
      this.setTipo(tipo);
      return true;
    } else {
      return false;
    }
  }

  public setTipo(tipo: string): void {
    this.tipo.next(tipo);
  }
}
