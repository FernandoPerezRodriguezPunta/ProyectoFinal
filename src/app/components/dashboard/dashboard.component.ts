import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoCompraService } from 'src/app/services/carrito-compra.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tipo: FormGroup;
  dataUser: any;
  uid: any = '';
  iniciaSesion: boolean;
  peticionProducto: string;
  cantidad: any;

  constructor(
    private afAuth: AngularFireAuth, //inyección de dependencias
    private router: Router,
    private fireAuth: FirebaseauthService,
    private fb: FormBuilder,
    private _dataAervice: DataServiceService,

    private _carritoService: CarritoCompraService
  ) {
    this.cantidad = 0;

    this.iniciaSesion = true;

    this.peticionProducto = 'message from parent"';

    this.tipo = this.fb.group({
      producto: ['', Validators.required],
    });

    _carritoService.getCarrito().subscribe(async (resp) => {
      const user = await this.afAuth.currentUser;

      var cantidadP = 0;

      var uid: any;

      uid = user?.uid;

      resp.map((e: any) => {
        if (e.payload.doc.data().uidCliente == uid)
          cantidadP += e.payload.doc.data().cantidad;

        console.log(this.cantidad);
      });

      this.cantidad = cantidadP;
    });
  }

  async ngOnInit(): Promise<void> {
    this.afAuth.user.subscribe((response) => {
      this.dataUser = response;

      if (this.dataUser != undefined) {
        this.iniciaSesion = false;
      }
    });
  }

  logIN(): void {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.fireAuth.logOutAuth();
    this.iniciaSesion = true;
  }

  async veruid() {
    //tmb puedes hacer que te retorne el string

    const uid = await this.fireAuth.getUid();

    return uid;
  }

  /*si se tabula encima del search este te redirecciona a la página list-productos*/
  onFocus() {
    this.router.navigate(['list-productos']);
  }

  /*metodo para realizar una busqueda en la barra search*/

  buscarProducto() {

    var producto = this.tipo.value.producto.toLowerCase(); /*por si el usuario mete algo en mayusculas*/

    this._dataAervice.comprobar(producto);

    this.router.navigate(['list-productos']);

  }

  irCarrito() {
    this.router.navigate(['carrito']);
  }
}
