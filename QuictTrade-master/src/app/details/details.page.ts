import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { ObjetosService } from '../services/objeto.service';
import { IObjetos,IMotor,ITecnologia,INmobiliaria } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';
import { REFERENCE_PREFIX } from '@angular/compiler/src/render3/view/util';
import { ListaPageRoutingModule } from '../lista/lista-routing.module';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
 
  id: number;
  listando: (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [];
  

  constructor(private _activatedRoute : ActivatedRoute, private _objetosService : ObjetosService,private _db : AngularFireDatabase) { }
  
  // buscarId(id : string){
  //   let ref = this._db.database.ref("objetos");

  //   ref.orderByChild("id").equalTo(id).once("value",snapshot =>{
  //     snapshot.forEach(child =>{
  //       let value = child.val()
  //       ref = value
  //       console.log("------------he encontrado-------------------- "+value.precio)
  //     })

  //   })
  //   return ref;
  // }

  ngOnInit() {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');
    console.log("he recibido un " + this.id);

    let ref = this._db.database.ref("objetos");
    ref.orderByChild("id").equalTo(this.id).once("value",snapshot =>{
          snapshot.forEach(child =>{
            let value = child.val()
            this.listando.push(value);
            console.log("------------he encontrado-------------------- "+value.precio)
          })
          
        })
        
      
    
    // console.log("antes de procesar el array tiene " + this.listando.length);

    // var that = this;

    // this._objetosService.buscarId(this.id).then(function(val) { 
    //     console.log(val);
    //     console.log(this);
    //     this.listando.push(val);
        
        
    // });
    
    console.log("-----------------------------------" + this.listando.length);
    // ref.once("value", snapshot => { //procesamos la referencia, recuperamos un elemento llamado snapshot, todos los nodos q encuentre en la referencia objetos
    //   snapshot.forEach(child => { //recorremos el elemento snapshot y recuperamos casa uno de los hijos
    //     let value = child.val(); //nos quedamos con cada 1 de los nodos en la variable
    //     this.listando.push(value); // añade al array objetos los elementos que encuentra value
    //     console.log("=======================")
    //     console.log("he encontrado en detalles el: " + child.val().nombre);//val().elementos del objeto (nombre,precio, descripcion,...)
    //     console.log("el array tiene: " + this.listando.length);
    //   })
    // })

    // let ref = this._db.database.ref("objetos");
    // ref.orderByChild("id").equalTo(this.id).once("value",snapshot =>{
    //   snapshot.forEach(child =>{
    //     console.log("tienes algo en el val"+ child.val().nombre);
    //     let value = child.val();
    //     this.listando.push(value);
    //   })
    // })
    console.log("tengo estos elementos. Marcador1 " + this.listando.length)
    // let res=this._objetosService.getObjeto(this.id);
    // console.log("el nombre es " +res.nombre);
    // console.log("el nombre es " +res.descripcion);
    // console.log("el nombre es " +res.precio);

    // let ref = this._objetosService.getObjetoId(this.id);
    // console.log("estoy mirando el valor de ref " +ref);

    // let ref = this.objetoSeleccionado(this.id);
    // console.log("estoy mirando el valor de ref " +ref);
    

    // this.listando.push(res);


  }



async objetoSeleccionado( objetoId : string) {
  await this._objetosService.getObjetoId(objetoId).then(value =>{
    console.log(value);
    // this.producto = value;
  })
}

}


// ngOnInit() {
//   this.id = this._activatedRoute.snapshot.paramMap.get('id');
//   console.log("he recibido un " + this.id);

//   let ref = this._objetosService.buscarId(this.id);
//   ref.once("value",snapshot =>{
//     snapshot.forEach(child =>{
//       let value = child.val();
//       this.listando.push(value);
//     })

//   })