import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router';//importar clase para redirecionar a otras instancias de la aplicación
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginusuario: FormGroup;
  loading: boolean = false;

  constructor(
    //inyecciones de servicio

    private fb: FormBuilder,
    private auth:FirebaseauthService,
    private router: Router,
    public afAuth: AngularFireAuth,


  ) {
    this.loginusuario = this.fb.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
    });



  }

  ngOnInit(): void {}


  login(): void{

    
  
   this.afAuth.signInWithEmailAndPassword(this.loginusuario.value.email,this.loginusuario.value.password);
   
   this.router.navigate(['/home']);



  }


}
