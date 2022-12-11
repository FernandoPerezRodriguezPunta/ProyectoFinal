import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //todo lo necesario para el formulario
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';//servicio creado por mi con lso metodos de autentificación
import { Router } from '@angular/router';//importar clase para redirecionar a otras instancias de la aplicación
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {


  registrarUsuario: FormGroup;


  constructor(
    private fb: FormBuilder,
    private fbauth:FirebaseauthService,
    private router: Router,
    public afAuth: AngularFireAuth,
 
  ) {

    




    this.registrarUsuario = this.fb.group({

      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required,Validators.minLength(6)],
      repetirPassword: ['', Validators.required],
    


    });


  


  }

 ngOnInit() {


  }


  registrar(){

   this.fbauth.registrarAuth(this.registrarUsuario.value.email,this.registrarUsuario.value.password,this.registrarUsuario.value.repetirPassword);
 

  }

  

}
