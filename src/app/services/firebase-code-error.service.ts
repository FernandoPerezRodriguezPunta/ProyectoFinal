import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

 CodeError(code: string) {
    

    switch (code) {

      //El correo existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse :
        return 'El usuario ya existe';

     //Contraseña débil   
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debíl longitud mínima 6 caracteres';

      //Correo invalido  
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'El correo no es válido';

       
      //contraseña incorrecta 
      case FirebaseCodeErrorEnum.WrongPassword:

        return 'email o contraseña incorrectos';

        //si el usuario no existe en ambos casos la respuesta sera la misma para evitar
        //intenciones maliciosas como suplantacion de usuario o robo de datos
 
       case FirebaseCodeErrorEnum.UserNotFound:

       return 'email o contraseña incorrectos';

      default:
        return 'error desconocido';
    
      }
  }

}
