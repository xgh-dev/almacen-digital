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
    let formulario = document.forms["formulario-operacion-agregar"];
    //obtener sus componentes mediante los imputs
    let id = formulario["id"]
    let herramienta = formulario["nombre"];
    let cantidad = formulario["cantidad"];
    
    //seguiremos con la evaluacion de los inputs enviados
    if (id.value !== "" && herramienta.value !== "" && cantidad.value !== ""){
        arrayHerramientas.push(new Herramienta(id.value,herramienta.value,+cantidad.value))
        //llamamos a las funciones que carguen la estructura del html
        cargarHerramientas();
        
    } /*else if (operacion.value === "eliminar" && (id.value !== "" || herramienta.value !== "")){
        eliminarHerramienta(id.value,herramienta.value);
    }*/
    limpiarInputs(formulario);
}

const eliminarHerramientaFormulario = () => {
    let formulario = document.forms["formulario-operacion-eliminar"];
    //obtener sus componentes mediante los imputs
    let id = formulario["id"]
    let herramienta = formulario["nombre"];
    if (id.value !== "" || herramienta.value !== ""){
        eliminarHerramienta(id.value,herramienta.value);
    }
    limpiarInputs(formulario);
}

//limpiar inputs
const limpiarInputs = (formulario) => {
    //recibe la llamada de un formulario, este debe iterar el formulario y a sus elementos agregar el valor '' para indicar que es un string vacio y poder "borrar" lo que se escribio anteriormente
    for (input of formulario){
        //console.log(input)
        input.value = '';
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
    let seleccionarHerramienta = arrayHerramientas.findIndex(equipo => equipo.id === id)
    //esta nos devolvera un atributo del objeto seleccionado 
    let estadoActual = arrayHerramientas[seleccionarHerramienta]["estado"];
    if (estadoActual == "IN"){
        let usuario = prompt("Ingresa nombre del ususario: ");
        // de la siguiente forma definimos los prestamos que iremos ingresando en nuesto array de herramientas prestadas
        //definir una variable que llame al array y reciba un elemento de posicion para poder tener el objeto deseado
        let herramientaSeleccionada = arrayHerramientas[seleccionarHerramienta];
        herramientaSeleccionada.estado = "OUT"
        console.log(herramientaSeleccionada)
        //añadir mediante push la nueva clase que crearemos mediante herencia
        arrayHerramientasPrestadas.push(
            new Prestar(
                herramientaSeleccionada.id,
                herramientaSeleccionada.herramienta,
                herramientaSeleccionada.cantidad,
                herramientaSeleccionada.estado,
                usuario));
        console.log(arrayHerramientasPrestadas)
    } else {
        alert("herramienta en uso")
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
        <td><button onclick="devolverrHerramienta('${prestar.id}')">Entregar</button></td>
    </tr>
    `
    //estructura que usaremos para el boton que regrese la herramienta
    //<td><button onclick="devolverrHerramienta('${herramienta.id}')">Entregar</button></td>

    //retornamos
    return estructura
}

//crear la funcion que devuelva laas herramientas, esto debe eliminarlas de la lista
const devolverrHerramienta = (id) => {
    //crear una variable que busque una coincidencia mediante findindex y realizamos la busqueda
    let herramientaEntregar = arrayHerramientasPrestadas.findIndex(herramienta => herramienta.id === id);
    //mediante un splice eliminamos el elemento
    arrayHerramientasPrestadas.splice(herramientaEntregar,1);
    //cargarHerramientasPrestadas();
    cambiarEstadoInventario(id);
    cargarApp()
}

//funcion que cambie el estado de el inventario al devolver la herramienta
const cambiarEstadoInventario = (id) => {
    //mediante el id realizar la busqueda con findIndex que nos encuentre el indice del elemento, para poder llamar al elemento especifico del array mediante la variable en la que almacenemos el indice
    let cambiarEstado = arrayHerramientas.findIndex(herramienta => herramienta.id == id);
    //llamamos al elemento del array mediante el indice encontra y cambiamos el valor de su estado
    arrayHerramientas[cambiarEstado].estado = "IN";
    //funciona
    //console.log(arrayHerramientas[cambiarEstado])    
}

const buscarHerramientaFormulario = () => {
    let lista = [];
    //crear una variable que llame al formulario
    let buscarFormulario = document.forms["formulario-operacion-buscar"];
    //guardamos los valores
    //no olvidar indicar el value a la hora de hacer la llamada
    let porID = buscarFormulario["id"].value
    let porNombre = buscarFormulario["nombre"].value
    let porEstado = buscarFormulario["estado"].value
    //console.log(porID)
    //console.log(porNombre)
    //console.log(porEstado)
    for (let i = 0; i < arrayHerramientas.length; i++){
        let busqueda = arrayHerramientas[i]
        if (busqueda.id == porID || busqueda.nombre == porNombre || busqueda.estado == porEstado){
            lista.push(busqueda)
        }
    }
    limpiarInputs(buscarFormulario)
    console.log(lista)
    console.log("funciona")
    //retornamos la lista
    cargarHerramientasBuscadas(lista)
    
}

const cargarHerramientasBuscadas = (lista) => {
    //creamos una variable que reciba strings en los que guardaremos nustras estructuras html
    let renderBuscarHtml = '';
    //crear un ciclo for que nos itere las los elementos del array y obtengamos los dados por la variable indices
    for (herramienta of lista){
        renderBuscarHtml += crearHerramientaBuscadaHtml(herramienta)
    }
    //insertamos los htmnl
    document.getElementById('tbodyInventario').innerHTML = renderBuscarHtml;
};

// Crear la función que cree el formato de la tabla
const crearHerramientaBuscadaHtml = (herramienta) => {
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
