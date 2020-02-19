import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { ObjetosService } from '../services/objeto.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { IObjetos,IMotor,ITecnologia,INmobiliaria } from '../interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  id: number;
  modificar: (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [];
  objeto : [];
  

  titulo : string = "Objeto";
  oculto : boolean = false;
  Tecnologia : boolean;
  Motor : boolean;
  Inmobiliaria : boolean;
  ruta : string = "../../assets/ejemplo.jpg";
  width : number = 300;
  nombre : string;
  precio : number = null;
  categoria : string = null;
  descripcion : string = null;
  metrosDevivienda : number = null;
  numeroBanyos : number = null;
  numeroHabitacions : number = null;
  localidad : string = null;
  perfectoEstado : boolean;
  coche : boolean;
  Km : number = null;
  anyo: number = null;

  constructor(private _toastCtrl : ToastController,private _activatedRoute : ActivatedRoute,private _db : AngularFireDatabase) { }

  ngOnInit() {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');
    console.log("he recibido un " + this.id);

    let ref = this._db.database.ref("objetos");
    ref.orderByChild("id").equalTo(this.id).on("value",snapshot =>{
      snapshot.forEach(child =>{
        let value = child.val()
        this.modificar.push(value);
        console.log("------------he encontrado-------------------- "+value.precio)
      })
      
    })
  }

  async presentToast() {
    const toast = await this._toastCtrl.create({
      message: 'Modificado el objeto con exito',
      duration: 1000,
      position: "bottom"
    });
    toast.present();
  }

  modificarObjeto(id : number,Tecnologia : boolean,Motor : boolean,Inmobiliaria : boolean ){
    console.log("q tiene en el " +id);
    let ref=this._db.database.ref("objetos");
    ref.orderByChild("id").equalTo(id).on("value", snapshot =>{
      this.objeto=[];
      snapshot.forEach(child =>{
        let clave = child.key;
        ref.child(clave).child("nombre").set(this.nombre);
        ref.child(clave).child("descripcion").set(this.descripcion);
        ref.child(clave).child("precio").set(this.precio);
        ref.child(clave).child("categoria").set(this.categoria);
        if(Tecnologia == true){
          ref.child(clave).child("perfectoEstado").set(this.perfectoEstado);
        }
        else if(Motor == true){
          ref.child(clave).child("coche").set(this.coche);
          ref.child(clave).child("Km").set(this.Km);
          ref.child(clave).child("anyo").set(this.anyo);
        }
        else if(Inmobiliaria == true){
          ref.child(clave).child("metrosDevivienda").set(this.metrosDevivienda);
          ref.child(clave).child("KnumeroBanyosm").set(this.numeroBanyos);
          ref.child(clave).child("numeroHabitacions").set(this.numeroHabitacions);
          ref.child(clave).child("localidad").set(this.localidad);
        }
        
      })
    })
    
    this.presentToast();


  }

}
