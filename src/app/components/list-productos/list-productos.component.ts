import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrito, detalle } from 'src/app/models/models';
import { CarritoCompraService } from 'src/app/services/carrito-compra.service';
import { ClienteServiceService } from 'src/app/services/cliente-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { ProductoService } from 'src/app/services/producto.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css'],
})
export class ListProductosComponent implements OnInit {
  config: any;
  tipo: string = 'teclado';
  boolean: boolean;
  uidProducto: any;
  uidCliente: any;
  cantidadProducto: FormGroup;
  carrito: Carrito;
  detalle: detalle;
  contador: number;
  response:string;
  relleno:boolean;




  collection = {
    count: 8 /**el contador es el total de lo que va a haber habria que cambiarlo */,
    data: [] as any[],
  };

  constructor(
    private _producto: ProductoService,
    private _dataService: DataServiceService,
    private _router: Router,
    private fbauth: FirebaseauthService,
    private fb: FormBuilder,
    private _carritoService: CarritoCompraService,
    private _detalleService: DetalleService,
    private _clienteService: ClienteServiceService,
    public afAuth: AngularFireAuth
  ) {
    this.contador = 0;

    this.response='';

     this.relleno = false;

  

    this.carrito = {
      id: 0,
      uidCliente: '',
      tipo: '',
      marca: '',
      modelo: '',
      imagen: '',
      precio: 0,
      cantidad: 0,
    };

    this.detalle = {
      uidCliente: '',
      nombre: '',
      apellidos: '',
      direccion: '',
      cantidad: 0,
      tipo: '',
      marca: '',
      modelo: '',
      imagen: '',
      precio: 0,
      total: 0,
    };

    this._detalleService.deleteDetalle();

    this.cantidadProducto = this.fb.group({
      cantidad: ['', Validators.required],
    });

    this.boolean = true;

    this._dataService.tipos.subscribe((response) => {
      /**recibe del search de dashboar el tipo de producto que esta buscando el cliente */

      this.response=response;

      
      this._producto.getProducto().subscribe((resp) => {
        this.collection.data = resp.map((e: any) => {
          if (e.payload.doc.data().tipo == response) {
            console.log(e.payload.doc.data().tipo);

            this.boolean = false;


            

            return {
              tipo: e.payload.doc.data().tipo,

              marca: e.payload.doc.data().marca,

              modelo: e.payload.doc.data().modelo,

              imagen: e.payload.doc.data().imagen,

              precio: e.payload.doc.data().precio,
            };
          } else {
            return false;
          }
        });
      });




    });




  }

  async ngOnInit(): Promise<void> {
    this.config = {
      /**para la paginación  */ itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.collection.count,
    };
  } /*acaba el OnInit*/

  /*guarda el string del modelo que ha comprado el usuario para recuperarlo en el metodo de pago*/

  async comprar(item: any) {
    let contador: number = 0;

    const cliente = this._clienteService.getCliente();

    if ((await this.afAuth.currentUser) != null) {
      this._clienteService.getCliente().subscribe((response) => {
        response.map(async (cliente: any) => {
          //Importante debe ser any para poder sacar un dato en concreto

         

          if (
            (await this.fbauth.getUid()) == cliente.payload.doc.data().uid &&
            contador == 0
          ) {

            if(cliente.payload.doc.data().direccion!="" ){

               let direccion = cliente.payload.doc.data().direccion;
              console.log(direccion);

            this.detalle.uidCliente = cliente.payload.doc.data().uid;
            this.detalle.nombre = cliente.payload.doc.data().nombre;
            this.detalle.apellidos = cliente.payload.doc.data().apellidos;
            this.detalle.direccion = cliente.payload.doc.data().direccion;
            this.detalle.cantidad = this.cantidadProducto.value.cantidad;
            this.detalle.tipo = item.tipo;
            this.detalle.marca = item.marca;
            this.detalle.modelo = item.modelo;
            this.detalle.imagen = item.imagen;
            this.detalle.total =
              this.cantidadProducto.value.cantidad * item.precio;
            this._detalleService.createDetalle(this.detalle);

            this._router.navigate(['metodo-pago']);

            this.relleno=true;

            contador++;
          }

        }

        });
      });

      /**
       * aqui buscar al cliente para meter en detalle
       */
    } else {
      alert('debe estar logeado para poder agregar un producto');
    }

    
    if(!this.relleno){


      this._router.navigate(['detalles-personales']);
    }



  }

  /*Agregar al carro sin comprobaciones*/

  async agregarCarro(
    tipo: string,
    marca: string,
    modelo: string,
    precio: number,
    imagen:string,
  ) {
  


    let contador: number = 0;

    const cliente = this._clienteService.getCliente();

    if ((await this.afAuth.currentUser) != null) {
      this._clienteService.getCliente().subscribe((response) => {
        response.map(async (cliente: any) => {
          //Importante debe ser any para poder sacar un dato en concreto

         

          if (
            (await this.fbauth.getUid()) == cliente.payload.doc.data().uid &&
            contador == 0
          ) {

            if(cliente.payload.doc.data().direccion!="" ){

              this.relleno=true;

              contador++;


            }

          }

          });
        });

      }


      if(!this.relleno){

  
        this._router.navigate(['detalles-personales']);
      }



    if ((await this.afAuth.currentUser) != null) {
      const user = await this.afAuth.currentUser;

  

      var uid: any;

      uid = user?.uid;

      this.carrito.uidCliente = uid;
      this.carrito.tipo = tipo;
      this.carrito.marca = marca;
      this.carrito.modelo = modelo;
      this.carrito.imagen = imagen;
      this.carrito.precio = precio;
      this.carrito.cantidad = this.cantidadProducto.value.cantidad;

      this._carritoService.createCarrito(this.carrito);

      this._router.navigate(['carrito']);
    

      

    } else {
      alert('debe estar logeado para poder agregar un producto');
    }

  }




  pageChanged(event: any) {
    this.config.currentPage = event;
  }
}
