// Crear los arrays que nos guarden nuestros objetos
const arrayHerramientas = [
    new Herramienta("C1", "martillo", 1),
];
const arrayHerramientasPrestadas = [
    
];


// Menu de cargar app mediante onload en el HTML
window.onload = () => {
    cargarApp();
};

let cargarApp = () => {
    cargarHerramientas();
    cargarHerramientasPrestadas();
};

// Crear la función que cargue las herramientas en la tabla
const cargarHerramientas = () => {
    // Creamos una variable que reciba strings vacíos que cada que ejecutemos esta función nos irá agregando más strings a la variable y estos los cargará en el HTML
    let herramientasHTML = '';
    for (let herramienta of arrayHerramientas) {
        herramientasHTML += crearHerramientaHtml(herramienta);
    }
    // Después de que termine el ciclo debemos cargar el HTML mediante una búsqueda y innerHTML
    document.getElementById('tbodyInventario').innerHTML = herramientasHTML;
};


// Crear la función que cree el formato de la tabla
const crearHerramientaHtml = (herramienta) => {
    // Creamos una variable que guarde la estructura HTML
    let ingresoTemplate = `
        <tr>
            <th scope="row">${herramienta.id}</th>
            <td>${herramienta.herramienta}</td>
            <td>${herramienta.cantidad}</td>
            <td><button class="boton-estado" onclick="prestarHerramienta('${herramienta.id}')">${herramienta.estado}</button></td> 
        </tr>
    `;
    // Retornamos la variable
    return ingresoTemplate;
};

//crear la funcion que agregue datos que se envien desde el formulario 
const agregarHerramienta = () => {
    //escribir las llamadas realizadas al formulario y guardarlas en variables que hagan referencias a su nombre 
    //llamar al formulario 
    let formulario = document.forms["formulario-operacion"];
    //obtener sus componentes mediante los imputs
    let operacion = formulario["operacion"];
    let id = formulario["id"]
    let herramienta = formulario["nombre"];
    let cantidad = formulario["cantidad"];
    
    //seguiremos con la evaluacion de los inputs enviados
    if (id.value !== "" && herramienta.value !== "" && cantidad.value !== ""){
        if (operacion.value === "agregar"){
            arrayHerramientas.push(new Herramienta(id.value,herramienta.value,+cantidad.value))
            //llamamos a las funciones que carguen la estructura del html
            cargarHerramientas();
        }
    } else if (operacion.value === "eliminar" && (id.value !== "" || herramienta.value !== "")){
        eliminarHerramienta(id.value,herramienta.value);
    }
}

const eliminarHerramienta = (id,nombre) => {
    let herrmaientaEliminar = arrayHerramientas.findIndex(equipo => equipo.id === id || equipo.nombre === nombre)
    //console.log(herrmaientaEliminar)
    arrayHerramientas.splice(herrmaientaEliminar,1);
    cargarHerramientas();
}

//funicon de busqueda para despues
/*const buscarHerramienta = (id,nombre) => {

}*/


//funicon de prestamo de herramientas
const prestarHerramienta = (id) => {
    //console.log(id)
    let usuario = prompt("Ingresa nombre del ususario: ");
    let seleccionarHerramienta = arrayHerramientas.findIndex(equipo => equipo.id === id)
    //esta nos devolvera un atributo del objeto seleccionado 
    let estado = arrayHerramientas[seleccionarHerramienta]["estado"];
    if (estado == "IN"){
        //estado = "No disponible"
        arrayHerramientas[seleccionarHerramienta]["estado"] = "OUT";
        
        // de la siguiente forma definimos los prestamos que iremos ingresando en nuesto array de herramientas prestadas
        //definir una variable que llame al array y reciba un elemento de posicion para poder tener el objeto deseado
        let herramientaSeleccionada = arrayHerramientas[seleccionarHerramienta];
        //añadir mediante push la nueva clase que crearemos mediante herencia
        arrayHerramientasPrestadas.push(
            new Prestar(
                herramientaSeleccionada.id,
                herramientaSeleccionada.herramienta,
                herramientaSeleccionada.cantidad,
                herramientaSeleccionada.estado,
                usuario));
        console.log(arrayHerramientasPrestadas)

    }

    //console.log(estado);
    //cargamos el render de la pagina
    cargarHerramientas();
    cargarHerramientasPrestadas();
} 

//funcion cargarHerramientasPrestadas
const cargarHerramientasPrestadas = () => {
    //definir una ariable que nos guarde los arrays del html conforme los llamemos
    let herramientaPrestada = "";
    //crear un ciclo for of que itere directamente sobre los elementos del array de herramientas prestadas
    for (prestar of arrayHerramientasPrestadas){
        herramientaPrestada += cearHerramientasPrestadasHtml(prestar);
    }
    //llamar al documento y inyectar el html
    document.getElementById("tbodyEnUso").innerHTML = herramientaPrestada;
}

const cearHerramientasPrestadasHtml = (prestar) => {
    //creamos una variable que reciba los elementos iterados del array y con ella cremos nuestra estructura html y la retornamos
    let estructura = `
    <tr>
        <th scope="row">${prestar.id}</th>
        <td>${prestar.herramienta}</td>
        <td>${prestar.cantidad}</td>
        <td>${prestar.usuario}</td>
    </tr>
    `
    //retornamos
    return estructura
}

