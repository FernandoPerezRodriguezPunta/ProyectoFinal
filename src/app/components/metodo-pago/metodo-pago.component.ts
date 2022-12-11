import { Component, OnInit,Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { metodoPago } from 'src/app/models/models';
import { DataServiceService } from 'src/app/services/data-service.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { GuardarProductoServiceService } from 'src/app/services/guardar-producto-service.service';
import { MetodoPagoService } from 'src/app/services/metodo-pago.service';
import { VentaService } from 'src/app/services/venta.service';
import { venta } from 'src/app/models/models';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent implements OnInit {

  metodoPago:metodoPago;
  venta:venta;
  metodoDePagoActual:FormGroup;
  userID:string;
  existe:boolean;
  carritoLLeno:boolean;


  collection = {

    data:[] as any[],

  };


  constructor(
 
    private _data:DataServiceService,
    private fb:FormBuilder,
    private fbauth:FirebaseauthService,
    private _metodoPago:MetodoPagoService,
    private afAuth:AngularFireAuth,
    private _producto:GuardarProductoServiceService,
    private _detalle:DetalleService,
    private _router:Router,
    private _venta:VentaService,


  ) { 


    this.carritoLLeno=false;

    this.mostrar();
  
    this._producto.productos.subscribe(response=>{


      console.log(response);

      if(response!=null){

        console.log('null');

      }else{

        console.log('not null');


      }

    
    
     });


    this.existe=false;

    this.userID='';

   this.metodoPago={
    
     uidCliente:'',
     titular:'',
     tarjeta:'',
     cvv:0,
     fechaCaducidad:new Date,




   } 



   this.venta={

  

    nombre:'',
    apellidos:'',
    direccion:'',
    cantidad:0,
    total:0,
    titular:'',
    tarjeta:'',
    cvv:0,
    fechaCaducidad:new Date(),
    fechaVenta:new Date(),



   }



    this.metodoDePagoActual= this.fb.group({

            titular:['',Validators.required],
            tarjeta:['',Validators.required],
            cvv:[0,Validators.required],
            fechaCaducidad:[new Date ,Validators.required],

    });


 


  }

  ngOnInit(): void {


  
  


  
    



  }


   async terminarCompra():Promise<void>{

    const uid = await this.fbauth.getUid();


    if (uid!=null){


      for( let data of this.collection.data ){


        this.venta.nombre=data.nombre;
        this.venta.apellidos=data.apellidos;
        this.venta.direccion=data.direccion;
        this.venta.cantidad=data.cantidad;
        this.venta.total=data.total;
        this.venta.titular=this.metodoDePagoActual.value.titular;
        this.venta.tarjeta=this.metodoDePagoActual.value.tarjeta;
        this.venta.cvv=this.metodoDePagoActual.value.cvv;
        this.venta.fechaCaducidad=this.metodoDePagoActual.value.fechaCaducidad;
   
        this._venta.createVenta(this.venta);

        
        this._router.navigate(['gracias']);


      }



   


    } else{


      this._router.navigate(['home']);
    }

  



   }


   async mostrar(){


    const uid = await this.fbauth.getUid();


    if(uid!=null){

  
      this._detalle.getDetalle().subscribe(async resp=>{



        this.collection.data= resp.map((e:any)=>{


          if(uid==e.payload.doc.data().uidCliente){


            this.carritoLLeno=true;

          return {
        
            nombre:e.payload.doc.data().nombre,
            apellidos:e.payload.doc.data().apellidos,
            direccion:e.payload.doc.data().direccion,
            cantidad:e.payload.doc.data().cantidad,
            tipo:e.payload.doc.data().tipo,
            marca:e.payload.doc.data().marca,
            modelo:e.payload.doc.data().modelo,
            imagen:e.payload.doc.data().imagen,
            total:e.payload.doc.data().total,
          }

        }else{

          return null;
        }

        });

      });
    }



   }



}
