import { Component } from '@angular/core';
import { IObjetos,IMotor,ITecnologia,INmobiliaria } from '../interfaces';
import { ToastController } from '@ionic/angular';
import { ObjetosService } from '../services/objeto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  titulo : string = "Objeto";
  oculto : boolean = false;
  Tecnologia : boolean = false;
  Motor : boolean = false;
  Inmobiliaria : boolean = false;
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
  perfectoEstado : boolean = false;
  coche : boolean = false;
  Km : number = null;
  anyo: number = null;
  
  

  objetos : (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [
    // {
    //   "id" : 1,
    //   "nombre" : "algo1",
    //   "descripcion" : "una breve descripcion1",
    //   "precio" : 5.2,
      
    // },
    // {
    //   "id" : 2,
    //   "nombre" : "algo2",
    //   "descripcion" : "una breve descripcion2",
    //   "precio" : 54.2
    // },{
    //   "id" : 3,
    //   "nombre" : "algo3",
    //   "descripcion" : "una breve descripcion2",
    //   "precio" : 100,
      
    // }
  ];
  
  constructor(private _toastCtrl : ToastController,  private _objetosService : ObjetosService) {}

  // realiza la accion q tenga dentro cuando inicia la aplicacion, forma parte del cilo de vidda de la aplicacion
  ngOnInit(){
    let ref = this._objetosService.getObjetos();
    ref.on("value", snapshot => { //procesamos la referencia, recuperamos un elemento llamado snapshot, todos los nodos q encuentre en la referencia objetos
      snapshot.forEach(child => { //recorremos el elemento snapshot y recuperamos casa uno de los hijos
        let value = child.val(); //nos quedamos con cada 1 de los nodos en la variable
        this.objetos.push(value); // añade al array objetos los elementos que encuentra value
        

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

  async presentToast() {
    const toast = await this._toastCtrl.create({
      message: 'Insertado el objeto con exito',
      duration: 1000,
      position: "bottom"
    });
    toast.present();
  }

  
// falta poner el id xa q se actualice solo
insertar(){
  
  if(this.Tecnologia == true){
    let objetoTecnologia : (IObjetos | ITecnologia )={
      "id": this.objetos.length+2,
      "nombre" : this.nombre,
      "descripcion" : this.descripcion,
      "precio" : this.precio,
      "categoria" : this.categoria,
      "propietario" :"-M-xvfM8UhvfKgkcs_oV",
      "Tecnologia" : this.Tecnologia,
      "perfectoEstado" : this.perfectoEstado,                                 
        };
        this._objetosService.setObjeto(objetoTecnologia); //llamamos a la funcion desde _objetosService definido en el constructor xa insertar
        this.presentToast();
  }
  else if(this.Motor == true){
    let objetoMotor : (IObjetos | IMotor )={
      "id": this.objetos.length+2,
      "nombre" : this.nombre,
      "descripcion" : this.descripcion,
      "precio" : this.precio,
      "categoria" : this.categoria,
      "propietario" :"-M-xvfM8UhvfKgkcs_oV",
      "Motor" : this.Motor,
      "coche" : this.coche,
      "Km" : this.Km,
      "anyo" : this.anyo                                 
  };
  this._objetosService.setObjeto(objetoMotor);
  this.presentToast();
  }
  else if(this.Inmobiliaria == true){
    let objetoInmobiliaria : (IObjetos | INmobiliaria)={
      "id": this.objetos.length+2,
      "nombre" : this.nombre,
      "descripcion" : this.descripcion,
      "precio" : this.precio,
      "categoria" : this.categoria,
      "propietario" :"-M-xvfM8UhvfKgkcs_oV",
      "Inmobiliaria" : this.Inmobiliaria,
      "metrosDevivienda" : this.metrosDevivienda,
      "numeroBanyos" : this.numeroBanyos,
      "numeroHabitacions" : this.numeroHabitacions,
      "localidad" : this.localidad,                             
          };
          this._objetosService.setObjeto(objetoInmobiliaria);
          this.presentToast();
  }
  else{
    let objetoHogar : (IObjetos )={
      "id": this.objetos.length+2,
      "nombre" : this.nombre,
      "descripcion" : this.descripcion,
      "precio" : this.precio,
      "categoria" : this.categoria,
      "propietario" :"-M-xvfM8UhvfKgkcs_oV",
                                                                
    };
    this._objetosService.setObjeto(objetoHogar);
    this.presentToast();
          
  }
}


}
