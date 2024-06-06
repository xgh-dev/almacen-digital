//crear la clase que permita crear herramientas

class Herramienta {
    // Crear el constructor que nos cree los nuevos objetos que almacenaremos en la lista
    constructor(id, herramienta, cantidad) {
        // Creamos los atributos de la clase, mediante this
        this._id = id;
        this._herramienta = herramienta;
        this._cantidad = cantidad;
        this._estado = "IN";
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

    // Función de prueba
    /*obtenerDatos() {
        console.log(`id: ${this.id}\nherramienta: ${this.herramienta}\ncantidad: ${this.cantidad}\nestado: ${this.estado}`);
    }*/
}

// Exportar la clase Herramienta
//export default Herramienta;


// Crear una instancia de Herramienta y llamar a obtenerDatos
/*let herramienta = new Herramienta("C1", "martillo", 1, "disponible");
herramienta.obtenerDatos(); // Esto debería mostrar los datos en la consola

herramienta.estado = "en uso";
herramienta.obtenerDatos()
*/