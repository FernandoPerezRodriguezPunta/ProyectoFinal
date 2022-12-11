import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; //importar la autentificacion
import { Router } from '@angular/router'; //importar clase para redirecionar a otras instancias de la aplicación
import { ToastrService } from 'ngx-toastr'; //importar servicio de mensajes para el usuario
import { Observable } from 'rxjs';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseauthService {
  public userData$;

  constructor(
    public afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.userData$ = this.afAuth.currentUser;
  }


  /*Metodo para recuperar el uid del usuario*/

  async getUid() {
    const user = await this.afAuth.currentUser;

    if (user === null) {
      return null;
    } else {
      return user.uid;
    }
  }

  /*metodo para registrar al usuario*/

  registrarAuth(email2: string, password2: string, repetirPassword2: string) {
    const email = email2;

    const password = password2;

    const repetirPassword = repetirPassword2;

    if (password !== repetirPassword) {
      this.toastr.error('las contraseñas no coinciden.', 'Error');
    } else {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.toastr.success('El Usuario fue registrado correctamente !'); // si esta todo correcto
          this.router.navigate(['/home']); //para redireccionar al home
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          this.toastr.error(this.firebaseError.CodeError(error.code), 'Error'); //si el usuario comete algun error
        });
    }
  }

  /*Metodo para logearse*/

loginAuth( email2: string , password2: string ): void {

  var email = email2;
  var password = password2;

  this.afAuth.signInWithEmailAndPassword(email,password);

 // this.mantenerSesion(email,password);

   this.router.navigate(['/dashboard']); 
  

}



  /*metodo para mantener la sesion*/
  mantenerSesion(email2: string, password2: string) {
    const email = email2;
    const password = password2;

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.

        return signInWithEmailAndPassword(auth, email2, password2);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  /*metodo para deslogearse*/
  logOutAuth() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
