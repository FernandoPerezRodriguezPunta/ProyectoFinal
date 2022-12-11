import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css'],
})
export class RecuperarPasswordComponent implements OnInit {
 
  recuperarUsuario:FormGroup;
  loading:boolean=false;
  
  constructor(
    //inyecciones de servicio

    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
   


    this.recuperarUsuario= this.fb.group({

      email:['',Validators.required,Validators.email]


    })

  }

  ngOnInit(): void {}


  recuperarContrasena(){

    const email  = this.recuperarUsuario.value.email;

    this.loading=true;

    //si el email existe en la base de datos enviara a esa direcion un correo para recuperar la contraseña
    //el correo se encuentra configurado en Firebase
    this.afAuth.sendPasswordResetEmail(email).then(()=>{  

      this.toastr.success('El mensaje fue enviado a su correo para restablecer su contraseña','Enviado');
      this.router.navigate(['/login']);
      

    }).catch((error)=>{

      this.loading=false;

      this.toastr.error(this.firebaseError.CodeError(error.code), 'Error'); 


    })


  }


}
