import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module'; //modulo para usar las rutas de angular
import { ReactiveFormsModule } from '@angular/forms'; //modulo para usar formulariso reactivos
import {AngularFireModule}  from    '@angular/fire/compat'; //modulo para usar firebase
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//Repositorio 
import { ToastrModule } from 'ngx-toastr';   //para que se vean más bonitos los mensajes de alerta
import { NgxPaginationModule } from 'ngx-pagination';


//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { environment } from 'src/environments/environment';
import { DetallesPersonalesComponent } from './components/detalles-personales/detalles-personales.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { ResultadoErrorComponent } from './components/resultado-error/resultado-error.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { GraciasCompraComponent } from './components/gracias-compra/gracias-compra.component';









//servicios



@NgModule({
  declarations: [

    
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    DetallesPersonalesComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    ErrorPageComponent,
    ListProductosComponent,
    MetodoPagoComponent,
    ResultadoErrorComponent,
    CarritoComponent,
    GraciasCompraComponent,

  ],
  imports: [

    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added    
    AngularFireModule.initializeApp(environment.firebaseConfig)//aquí se carga la configuración de mi base de datos de firebase
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
