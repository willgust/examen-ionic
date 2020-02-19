import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ObjetosService } from '../services/objeto.service';
import { IObjetos,IMotor,ITecnologia,INmobiliaria } from '../interfaces';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  objetos: (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [];
  miBusqueda: (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [];
  miItem: (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [];


  buscar : string;
  Todos : boolean = false;

  constructor(private _toastCtrl : ToastController,  private _objetosService : ObjetosService,private _activatedRoute : ActivatedRoute,private _db : AngularFireDatabase) { }

  ngOnInit() {
    
    // let ref = this._db.database.ref("objetos");
    // ref.orderByChild("nombre").equalTo("chalet").on("value",snapshot =>{
    //   snapshot.forEach(child =>{
    //     let value = child.val()
    //     this.miBusqueda.push(value);
    //     console.log("------------he misProductos-------------------- "+this.miBusqueda.length)
    //   })
      
    // })

//     let ref = this._objetosService.getObjetos(); //hacemos una llamada xa visualizar los objetos
// //once se ejecuta una unica vez, on se ejecuta cada vez
//     ref.once("value", snapshot => { //procesamos la referencia, recuperamos un elemento llamado snapshot, todos los nodos q encuentre en la referencia objetos
//       snapshot.forEach(child => { //recorremos el elemento snapshot y recuperamos casa uno de los hijos
//         let value = child.val(); //nos quedamos con cada 1 de los nodos en la variable
//         this.objetos.push(value); // añade al array objetos los elementos que encuentra value
//         //console.log("he encontrado " + child.val().nombre);//val().elementos del objeto (nombre,precio, descripcion,...)

//       })
//     })

//   this.miItem = this.arrayBuscar(this.objetos);
  }

  cambiar_Todos() : void {
    this.Todos = !this.Todos;
  }

  arrayBuscar(productos): (IObjetos |ITecnologia)[]{
    let arrayBuscar = [];
    for(let i=0; i<productos.length; i++){
      if(productos[i].nombre == this.buscar) {
        arrayBuscar.push(productos[i]);
      }
    }
    console.log (arrayBuscar);
    return arrayBuscar;
  }
//metodo xa mostrar busqueda
  mostrar(){
    this.miBusqueda = [];
    let ref = this._db.database.ref("objetos");
    ref.orderByChild("nombre").equalTo(this.buscar).on("value",snapshot =>{
      snapshot.forEach(child =>{
        let value = child.val()
        this.miBusqueda.push(value);
        console.log("------------he misProductos-------------------- "+this.miBusqueda.length);
        console.log("------------he misProductos-------------------- "+this.miBusqueda[0].nombre)
      })
      
    })
  }
//metodo xa meter busqueda en el usuario
  setBusqueda(objeto : (IObjetos | IMotor | ITecnologia | INmobiliaria)){
    let ref=this._db.database.ref("busquedas");//referencia al nodo de bocadillos
    let res = ref.push(objeto);//creamos un nuevo nodo con el metodo push y lo inserta en el nodo objetos
    console.log("he insertado " + res.key);
    ref.child(res.key).set({
      "busqueda" : "-M-xvfM8UhvfKgkcs_oV ",
      "obtejoBuscado" : this.buscar

    })

  }
  

}
