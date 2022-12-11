import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/models';
import { ClienteServiceService } from 'src/app/services/cliente-service.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-detalles-personales',
  templateUrl: './detalles-personales.component.html',
  styleUrls: ['./detalles-personales.component.css'],
})
export class DetallesPersonalesComponent implements OnInit {
  cliente: Cliente;
  userID: string;
  clienteActual: FormGroup;
  existe: boolean;

  constructor(
    private fb: FormBuilder,
    private fbauth: FirebaseauthService,
    private _clienteService: ClienteServiceService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.comprobarExiste();



    this.userID = '';

    this.cliente = {
      uid: '',
      nombre: '',
      apellidos: '',
      dni: '',
      fecha_nacimiento: '',
      sexo: '',
      pais: '',
      provincia: '',
      localidad: '',
      direccion: '',
      telefono: 0,
      codigoPostal: 0,
    };

    this.clienteActual = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      pais: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      codigoPostal: ['', Validators.required],
    });

    this.existe = false;

    console.log(this.existe);

  }

  ngOnInit(): void {}




  async comprobarExiste() {

    var listClientes: any[];

    this._clienteService.getCliente().subscribe((response) => {
      response.map(async (cliente: any) => {
        //Importante debe ser any para poder sacar un dato en concreto

        if ((await this.fbauth.getUid()) == cliente.payload.doc.data().uid) {
          // console.log('existe');

          // console.log(await this.fbauth.getUid() +"y"+ cliente.payload.doc.data().uid);

          // console.log(
          //   this.fbauth.getUid() +
          //     'comprobación de si existe' +
          //     cliente.payload.doc.data().uid
          // );

          this.existe = true;

        } else {
        //   console.log('no es igual');
        //   console.log(
        //     this.fbauth.getUid() +
        //       'comprobación de si existe' +
        //       cliente.payload.doc.data().uid
        //   );
         }
      });
    });





  }

  /*metodo que agrega a un nuevo cliente a la colección mediante el formulario*/

  async rellenar(): Promise<void> {
    const uid = await this.fbauth.getUid();

    if (this.existe == false) {
      if (uid != null) {
        this.cliente.uid = uid;
      }

      this.cliente.dni = this.clienteActual.value.dni;
      this.cliente.nombre = this.clienteActual.value.nombre;
      this.cliente.apellidos = this.clienteActual.value.apellidos;
      this.cliente.sexo = this.clienteActual.value.sexo;
      this.cliente.pais = this.clienteActual.value.pais;
      this.cliente.provincia = this.clienteActual.value.provincia;
      this.cliente.localidad = this.clienteActual.value.localidad;
      this.cliente.direccion = this.clienteActual.value.direccion;
      this.cliente.fecha_nacimiento = this.clienteActual.value.fecha_nacimiento;
      this.cliente.telefono = this.clienteActual.value.telefono;
      this.cliente.codigoPostal = this.clienteActual.value.codigoPostal;

      this._clienteService.createCliente(this.cliente);

     // this.router.navigate(['/home']);
    }else{

        this.modificarUsuario();

    }
  }


 async  modificarUsuario(){


    const uid = await this.fbauth.getUid();


    
    this._clienteService.getCliente().subscribe((response) => {


      response.map(async (cliente: any) => {


        if ((await this.fbauth.getUid()) == cliente.payload.doc.data().uid) {

          const idCliente = cliente.payload.doc.id;

          console.log(idCliente);

        
          if (uid != null) {
            this.cliente.uid = uid;
          }
      

          this.cliente.dni = this.clienteActual.value.dni;
          this.cliente.nombre = this.clienteActual.value.nombre;
          this.cliente.apellidos = this.clienteActual.value.apellidos;
          this.cliente.sexo = this.clienteActual.value.sexo;
          this.cliente.pais = this.clienteActual.value.pais;
          this.cliente.provincia = this.clienteActual.value.provincia;
          this.cliente.localidad = this.clienteActual.value.localidad;
          this.cliente.direccion = this.clienteActual.value.direccion;
          this.cliente.fecha_nacimiento = this.clienteActual.value.fecha_nacimiento;
          this.cliente.telefono = this.clienteActual.value.telefono;
          this.cliente.codigoPostal = this.clienteActual.value.codigoPostal;
    
         this._clienteService.updateCliente(idCliente ,this.cliente);






        }


  });
});




}


}
