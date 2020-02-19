export interface IObjetos{
    "id" : number;
    "nombre" : string;
    "descripcion" : string;
    "precio" : number;
    "categoria" : string;
    "propietario" : string;
    
}

export interface ITecnologia extends IObjetos{
    "Tecnologia" : boolean;
    "perfectoEstado" : boolean;
    "usado" : boolean;
}

export interface INmobiliaria extends IObjetos{
    "Inmobiliaria" : boolean;
    "metrosDevivienda" : number;
    "numeroBanyos" : number;
    "numeroHabitacions" : number;
    "localidad" : string;
}

export interface IMotor extends IObjetos{
    "Motor" : boolean;
    "coche" : boolean;
    "moto" : boolean;
    "Km" : number;
    "anyo" : number;
}

export interface IUsuarios{
    "correo" : string;
    "nombreUsuario" : string;
    "identificador" : string;
}


