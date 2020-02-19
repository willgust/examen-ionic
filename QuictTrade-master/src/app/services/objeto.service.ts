import { Injectable } from '@angular/core';
import { IObjetos,IMotor,ITecnologia,INmobiliaria, IUsuarios } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()

export class ObjetosService{
  

    // objetos : (IObjetos | IMotor | ITecnologia | INmobiliaria)[] = [
    //     {
    //       "id" : 1,
    //       "nombre" : "algo1",
    //       "descripcion" : "una breve descripcion1",
    //       "precio" : 5.2,
    //       "categoria" : "tecnologia",
    //       "localidad" : "valencia"
          
    //     },
    //     {
    //       "id" : 2,
    //       "nombre" : "algo2",
    //       "descripcion" : "una breve descripcion2",
    //       "precio" : 54.2,
    //       "categoria" : "motor",
    //     },{
    //       "id" : 3,
    //       "nombre" : "algo3",
    //       "descripcion" : "una breve descripcion2",
    //       "precio" : 100,
    //       "categoria" : "inmobiliaria",
          
          
    //     }
    //   ];

    //referencia a la base de datos
    constructor(private _db : AngularFireDatabase){
      
    }


    

    getObjetos(): firebase.database.Reference{ //tipo de objeto firebase.data.....
      let ref=this._db.database.ref("objetos");
      return ref;
    }


    //xa seguir explorando nodos hacia abajo usariamos despues del foreach child --->snapshot.forEach(child =>{child.foreach(subChild =>{let value = subChild.val()})
    getObjetoId(id : string) {
      var ref = this._db.database.ref("objetos").once("value",snapshot => {
        snapshot.forEach(child =>{
          let value = child.val()
          if(value.id == id){
            ref = value
          }
        })
      })
      return ref;
      }

    
      buscarId(id : string){
        let ref = this._db.database.ref("objetos");

        ref.orderByChild("id").equalTo(id).once("value",snapshot =>{
          snapshot.forEach(child =>{
            let value = child.val()
            ref = value
            console.log("------------he encontrado-------------------- "+value.precio)
          })

        })
        return ref;
      }

    // async buscarId(id : string): Promise<(IObjetos | IMotor | ITecnologia | INmobiliaria)>{
    //   var ref = this._db.database.ref("objetos");
    //   let res;
    //   await ref.once("value",snapshot =>{
    //     snapshot.forEach(child =>{
    //       let value = child.val();
    //         if(value.id == id) {
    //           res = value;
    //           console.log("--------------estas entrando---------")
    //         }
    //     })
    //   })
    //   return res;
    // }
      
    

    // getObjeto(id : number) : firebase.database.Reference{
    //     let ref=this._db.database.ref("objetos");
    //     return this.ref.find(x => x.id == id);
    // }

    //_db es la variable q tiene la referencia a la base de datos y ref hace referencia al nodo q queramos
    setObjeto(objeto : (IObjetos | IMotor | ITecnologia | INmobiliaria)){
      let ref=this._db.database.ref("objetos");//referencia al nodo de bocadillos
      let res = ref.push(objeto);//creamos un nuevo nodo con el metodo push y lo inserta en el nodo objetos
      console.log("he insertado " + res.key);

    }

    

    setUsuarios(objeto : (IUsuarios)){
      let ref=this._db.database.ref("usuarios");//referencia al nodo de bocadillos
      let res = ref.push(objeto);//creamos un nuevo nodo con el metodo push y lo inserta en el nodo objetos
      console.log("he insertado " + res.key);
      ref.child(res.key).set({
        "nombre" : objeto.nombreUsuario,
        "correo" : objeto.correo,
        "identificador" : res.key

      })
      // return res.key;

    }
    

}