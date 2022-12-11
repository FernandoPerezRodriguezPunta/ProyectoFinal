import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Injectable({
  providedIn: 'root',
})

/*Con los Guard de Angular puedo evitar que un usuario entre
 *por ejemplo en la página del administrador*/
export class VigilanteGuard implements CanActivate {

  datauser:any;

  constructor(
    private router: Router,
    private auth: FirebaseauthService,
    private afAuth: AngularFireAuth
  ) {


    

    this.afAuth.user.subscribe(response=>{

      this.datauser=response?.uid;

    });


  }




  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {


 

    if(this.datauser=='g6YmK4QOzhZNgPhFJUZAV7S2eA63'){

      return true;
    }else{
  

    return false;


    }
    
    
  }


}
