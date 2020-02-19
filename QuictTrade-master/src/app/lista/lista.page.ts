import { Component, OnInit } from '@angular/core';
import { ObjetosService } from '../services/objeto.service';
import { IObjetos,IMotor,ITecnologia,INmobiliaria } from '../interfaces';
import { snapshotChanges } from '@angular/fire/database';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  objetos : (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [
    
  ];

  constructor(private _objetosService : ObjetosService) { 
    
  }

  ngOnInit() {
    let ref = this._objetosService.getObjetos(); //hacemos una llamada xa visualizar los objetos
//once se ejecuta una unica vez, on se ejecuta cada vez
    ref.once("value", snapshot => { //procesamos la referencia, recuperamos un elemento llamado snapshot, todos los nodos q encuentre en la referencia objetos
      snapshot.forEach(child => { //recorremos el elemento snapshot y recuperamos casa uno de los hijos
        let value = child.val(); //nos quedamos con cada 1 de los nodos en la variable
        this.objetos.push(value); // añade al array objetos los elementos que encuentra value
        console.log("he encontrado " + child.val().nombre);//val().elementos del objeto (nombre,precio, descripcion,...)

      })
    })
    
  }

}
