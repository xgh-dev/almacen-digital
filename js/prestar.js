//extender la clase herramienta
class Prestar extends Herramienta{
    //no hace falta un contador
    //crear el constructor
    constructor(id, herramienta, cantidad, estado, usuario){
        //realizar la herencia de clase
        super(id, herramienta, cantidad, estado);
        //definir nuestro atributo de esta clase
        this._usuario = usuario;
    }
    // Establecemos los get y los set para hacer privado el constructor
    get id() {
        return this._id;
    }

    get herramienta() {
        return this._herramienta;
    }

    get cantidad() {
        return this._cantidad;
    }

    set cantidad(prestar_cantidad) {
        this._cantidad = prestar_cantidad;
    }

    get estado() {
        return this._estado;
    }
    set estado(estado_prestar) {
        this._estado = estado_prestar;
    }
    get usuario(){
        return this._usuario;
    }
    set usuario(agregar_usuario){
        this.usuario = agregar_usuario;
    }
    // Función de prueba
    /*obtenerDatos() {
        console.log(`id: ${this.id}\nherramienta: ${this.herramienta}\ncantidad: ${this.cantidad}\nestado: ${this.estado}\nusuario: ${this.usuario}`);
    }*/
}

/*
let herramienta = new Prestar("C1", "martillo", 1, "disponible","xavier");
herramienta.obtenerDatos(); // Esto debería mostrar los datos en la consola

herramienta.estado = "en uso";
herramienta.obtenerDatos()
*/