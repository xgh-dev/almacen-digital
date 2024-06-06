// Crear los arrays que nos guarden nuestros objetos
const arrayHerramientas = [
    new Herramienta("C1", "martillo", 1, "disponible"),
];

// Menu de cargar app mediante onload en el HTML
window.onload = () => {
    cargarApp();
};

let cargarApp = () => {
    cargarHerramientas();
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
            <td>${herramienta.estado}</td>
        </tr>
    `;
    // Retornamos la variable
    return ingresoTemplate;
};
