import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/models';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  comprobar: boolean;
  producto:Producto;
  productoActual:FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private _producto: ProductoService
  ) {
    this.comprobar = false;

    this.producto={
     
        tipo:'',
        marca:'',
        modelo:'',
        imagen:'',
        precio:0,
    }

   this.productoActual = this.fb.group({

       tipo:['',Validators.required],
       marca:['',Validators.required],
       modelo:['',Validators.required],
       imagen:['',Validators.required],
       precio:[0,Validators.required],




   });


  }

  ngOnInit() {
    /** si no se entra con la cuenta registrada como administrador te devuelve la págian de error */

    this.afAuth.user.subscribe((response) => {
      if (response?.uid == 'g6YmK4QOzhZNgPhFJUZAV7S2eA63') {
      

        this.comprobar = true;

      
      } else {
        this.router.navigate(['/error-page']);
      }
    });


      

  }
  
  /*metodo que agrega un producto a la colleción desde el formulario*/

  rellenar():void{

     this.producto.tipo=this.productoActual.value.tipo;
     this.producto.marca=this.productoActual.value.marca;
     this.producto.modelo=this.productoActual.value.modelo;
     this.producto.imagen=this.productoActual.value.imagen;
     this.producto.precio=this.productoActual.value.precio;


     this._producto.createProducto(this.producto);

     // window.location.reload();




  }


}
