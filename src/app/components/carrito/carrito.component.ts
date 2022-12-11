import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { metodoPago, venta } from 'src/app/models/models';
import { CarritoCompraService } from 'src/app/services/carrito-compra.service';
import { ClienteServiceService } from 'src/app/services/cliente-service.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  venta: venta;
  carritoLLeno: boolean;
  subtotal: number;
  metodoPago: metodoPago;
  metodoDePagoActual: FormGroup;

  collection = {
    data: [] as any[],
  };

  collection2 = {
    data: [] as any[],
  };

  constructor(
    private _carritoService: CarritoCompraService,
    public afAuth: AngularFireAuth,
    private _router: Router,
    private _venta: VentaService,
    private fbauth: FirebaseauthService,
    private fb: FormBuilder,
    private _cliente: ClienteServiceService
  ) {
    this.metodoPago = {
      uidCliente: '',
      titular: '',
      tarjeta: '',
      cvv: 0,
      fechaCaducidad: new Date(),
    };

    this.venta = {
      nombre: '',
      apellidos: '',
      direccion: '',
      cantidad: 0,
      total: 0,
      titular: '',
      tarjeta: '',
      cvv: 0,
      fechaCaducidad: new Date(),
      fechaVenta: new Date(),
    };

    this.totalCarrito();

    this.subtotal = 0;

    this.carritoLLeno = false;

    this._carritoService.getCarrito().subscribe(async (resp) => {
      var user = await this.afAuth.currentUser;

      var uid: any;

      uid = user?.uid;

      this.collection.data = resp.map((e: any) => {
        if (uid == e.payload.doc.data().uidCliente) {
          this.carritoLLeno = true;

          return {
            token: e.payload.doc.id,
            marca: e.payload.doc.data().marca,
            modelo: e.payload.doc.data().modelo,
            cantidad: e.payload.doc.data().cantidad,
            imagen:e.payload.doc.data().imagen,
            precio: e.payload.doc.data().precio,

            total: e.payload.doc.data().cantidad * e.payload.doc.data().precio,
          };
        } else {
          return null;
        }
      });
    });

    this._cliente.getCliente().subscribe(async (resp) => {
      var user = await this.afAuth.currentUser;

      var uid: any;

      uid = user?.uid;

      this.collection2.data = resp.map((e: any) => {
        if (uid == e.payload.doc.data().uid) {
        
   

          return {

            
            nombre: e.payload.doc.data().nombre,
            apellidos: e.payload.doc.data().apellidos,
            direccion: e.payload.doc.data().direccion,
          };
        } else {
          return null;
        }
      });
    });

    this.metodoDePagoActual = this.fb.group({
      titular: ['', Validators.required,],
      tarjeta: ['', Validators.required,],
      cvv: [0, Validators.required,],
      fechaCaducidad: [new Date(), Validators.required,],
    });
  }

  ngOnInit(): void {}

  eliminar(id: string) {
    this._carritoService.deleteCarrito(id);
    this._router.navigate(['carrito']);
    this.carritoLLeno = false;
  }

  volver() {
    this._router.navigate(['home']);
  }

  totalCarrito() {
    this._carritoService.getCarrito().subscribe(async (resp) => {
      var user = await this.afAuth.currentUser;

      var uid: any;

      uid = user?.uid;

      resp.map((e: any) => {
        if (uid == e.payload.doc.data().uidCliente) {
          return (this.subtotal +=
            e.payload.doc.data().cantidad * e.payload.doc.data().precio);
        } else {
          return null;
        }
      });
    });

    return this.subtotal;
  }

  async terminarCompra(): Promise<void> {
    const uid = await this.fbauth.getUid;

    if (uid != null) {
      for (let data of this.collection.data) {
        this.venta.cantidad = data.cantidad;
        this.venta.total = data.total;
        this.venta.titular = this.metodoDePagoActual.value.titular;
        this.venta.tarjeta = this.metodoDePagoActual.value.tarjeta;
        this.venta.cvv = this.metodoDePagoActual.value.cvv;
        this.venta.fechaCaducidad =
          this.metodoDePagoActual.value.fechaCaducidad;
      }


      for(let data of this.collection2.data){

        if(data!=null){

          console.log(data.nombre);

          this.venta.nombre=data.nombre;
          this.venta.apellidos=data.apellidos;
          this.venta.direccion=data.direccion;



        }


      }

   
      this._venta.createVenta(this.venta);

      this._router.navigate(['gracias']);

      this._carritoService.vaciarCarrito();
    } else {
      this._router.navigate(['home']);
    }
  }
}
