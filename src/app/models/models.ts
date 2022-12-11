
export interface Cliente {

    uid:string;
    nombre:string;
    apellidos:string;
    dni:string;
    fecha_nacimiento:string;
    sexo:string;
    pais:string;
    provincia:string;
    localidad:string;
    direccion:string;
    telefono:number;
    codigoPostal:number;


}

export interface Producto{


    tipo:string;
    marca:string;
    modelo:string;
    imagen:any;
    precio:number;

}


export interface Carrito{

    id:number;
    uidCliente:string;
    tipo:string;
    marca:string;
    modelo:string;
    imagen:string;
    precio:number;
    cantidad:number;
  

}


export interface detalle{

   uidCliente:string;
   nombre:string;
   apellidos:string;
   direccion:string;
   cantidad:number;
   tipo:string;
   marca:string;
   modelo:string;
   imagen:any;
   precio:number;
   total:number;




}


export interface metodoPago{

    uidCliente:string;
    titular:string;
    tarjeta:string;
    cvv:number;
    fechaCaducidad:Date;
    

}

export interface venta{

    nombre:string;
    apellidos:string;
    direccion:string;
    cantidad:number;
    total:number;
    titular:string;
    tarjeta:string;
    cvv:number;
    fechaCaducidad:Date;
    fechaVenta:Date;



}









