import { Component, OnInit } from '@angular/core';
import { IObjetos,IMotor,ITecnologia,INmobiliaria } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { ObjetosService } from '../services/objeto.service';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.page.html',
  styleUrls: ['./misproductos.page.scss'],
})
export class MisproductosPage implements OnInit {

  misProductos: (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [];
  objetos : [];
  objetosTecnologia : (IObjetos | ITecnologia )[] = [];
  objetosMotor : (IObjetos | IMotor )[] = [];
  objetosInmobiliaria : (IObjetos | INmobiliaria)[] = [];
  objetosHogar : (IObjetos )[] = [];

  Tecnologia : boolean = false;
  Motor : boolean = false;
  Inmobiliaria : boolean = false;
  Hogar : boolean = false;
  Todos : boolean = false;

  constructor(private _activatedRoute : ActivatedRoute, private _objetosService : ObjetosService,private _db : AngularFireDatabase) { }

  ngOnInit() {

    let ref = this._db.database.ref("objetos");
    ref.orderByChild("propietario").equalTo("-M-xvfM8UhvfKgkcs_oV").on("value",snapshot =>{
      snapshot.forEach(child =>{
        let value = child.val()
        this.misProductos.push(value);
        console.log("------------he misProductos-------------------- "+this.misProductos.length)
      })
      
    })

    //------------no siempre se ejecuta cuando toca y no se porcesa(pocas veces se procesa correctamente)--------------
    this.objetosTecnologia = this.arrayTecnologia(this.misProductos);
    console.log("------------he objetosTecnologia-------------------- "+this.objetosTecnologia.length)
    this.objetosMotor = this.arrayMotor(this.misProductos);
    console.log("------------he objetosMotor-------------------- "+this.objetosMotor.length)
    this.objetosInmobiliaria = this.arrayInmobiliaria(this.misProductos);
    console.log("------------he objetosInmobiliaria-------------------- "+this.objetosInmobiliaria.length)
    this.objetosHogar = this.arrayHogar(this.misProductos);
    console.log("------------he objetosHogar-------------------- "+this.objetosHogar.length)

  }



  eliminar(id : string){
    let ref = this._db.database.ref("objetos");
    ref.orderByChild("id").equalTo(id).on("value", snapshot =>{
      this.objetos=[];
      snapshot.forEach(child=>{
        let clave = child.key;
        ref.child(clave).remove();
      })
    })

  }

  cambiar_Tecnologia() : void {
    this.Tecnologia = !this.Tecnologia;
  }
  cambiar_Motor() : void {
    this.Motor = !this.Motor;
  }
  cambiar_Inmobiliaria() : void {
    this.Inmobiliaria = !this.Inmobiliaria;
  }
  cambiar_Hogar() : void {
    this.Hogar = !this.Hogar;
  }
  cambiar_Todos() : void {
    this.Todos = !this.Todos;
  }

  arrayTecnologia(productos): (IObjetos |ITecnologia)[]{
    let arrayTecnologia = [];
    for(let i=0; i<productos.length; i++){
      if(productos[i].Tecnologia) {
         arrayTecnologia.push(productos[i]);
      }
    }
    console.log (arrayTecnologia);
    return arrayTecnologia;
  }

  arrayMotor(productos): (IObjetos |IMotor)[]{
    let arrayMotor = [];
    for(let i=0; i<productos.length; i++){
      if(productos[i].Motor) {
        arrayMotor.push(productos[i]);
      }
    }
    console.log (arrayMotor);
    return arrayMotor;
  }
  arrayInmobiliaria(productos): (IObjetos |INmobiliaria)[]{
    let arrayInmobiliaria = [];
    for(let i=0; i<productos.length; i++){
      if(productos[i].Inmobiliaria) {
        arrayInmobiliaria.push(productos[i]);
      }
    }
    console.log (arrayInmobiliaria);
    return arrayInmobiliaria;
  }

  arrayHogar(productos): (IObjetos)[]{
    let arrayHogar = [];
    for(let i=0; i<productos.length; i++){
      if(productos[i].Inmobiliaria == false && productos[i].Motor == false && productos[i].Tecnologia == false) {
        arrayHogar.push(productos[i]);
      }
    }
    console.log (arrayHogar);
    return arrayHogar;
  }

}
