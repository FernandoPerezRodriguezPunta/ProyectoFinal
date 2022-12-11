import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetallesPersonalesComponent } from './components/detalles-personales/detalles-personales.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { GraciasCompraComponent } from './components/gracias-compra/gracias-compra.component';
import { HomeComponent } from './components/home/home.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { LoginComponent } from './components/login/login.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { ResultadoErrorComponent } from './components/resultado-error/resultado-error.component';



const routes: Routes = [
  

  
{path:'' ,redirectTo:'home',pathMatch:'full'}, //si el usuarario no pone nada página por defecto



{path:'home',component:HomeComponent},


 /*El Vigilante evita que cualquiera pueda entrar en la Págian de administrador
 2 comprobaciones 1 en el login y otra en el navegador
 *
 
  {path:'admin',component:AdminComponent,canActivate: [VigilanteGuard]}

  lo dejo comentado para preguntarle a pilar

 */

{path:'login' , component:LoginComponent},
{path:'admin' , component:AdminComponent},

{path:'registrar-usuario' , component:RegistrarUsuarioComponent},
{path:'recuperar-password' , component:RecuperarPasswordComponent},
{path:'detalles-personales',component:DetallesPersonalesComponent},
{path:'list-productos',component:ListProductosComponent},
{path:'error-page',component:ErrorPageComponent},
{path:'resultado-error',component:ResultadoErrorComponent},
{path:'carrito',component:CarritoComponent},
{path:'dashboard' , component:DashboardComponent},
{path:'gracias',component:GraciasCompraComponent},
{path:'metodo-pago',component:MetodoPagoComponent},


{path:'**' ,redirectTo:'error-page' ,pathMatch:'full'},  //página de error 404 página no encontrada


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
