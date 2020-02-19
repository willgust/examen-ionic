import { Component, OnInit } from '@angular/core';
import { ObjetosService } from '../services/objeto.service';
import { IObjetos,IMotor,ITecnologia,INmobiliaria, IUsuarios } from '../interfaces';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo : string=null;
  nombreUsuario : string=null;
  identificador : string=null;

  

  objetoUsuario : IUsuarios[] =[];
  constructor(private _toastCtrl : ToastController,  private _objetosService : ObjetosService) { }

  ngOnInit() {
    // let valorIdentificador = this.insertarUser();
    // console.log("q estoy mirando "+valorIdentificador);
  }

  async presentToast() {
    const toast = await this._toastCtrl.create({
      message: 'Insertado el objeto con exito',
      duration: 1000,
      position: "bottom"
    });
    toast.present();
  }


  insertarUser(){
    let usuario : IUsuarios ={
      "correo":this.correo,
      "nombreUsuario":this.nombreUsuario,
      "identificador":this.identificador
    }
    let claveUsuario= this._objetosService.setUsuarios(usuario); //llamamos a la funcion desde _objetosService definido en el constructor xa insertar
    this.presentToast();
    // return claveUsuario;
  }

}
