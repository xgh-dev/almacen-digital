//llamar a la libreria
let mysql = require('mysql');

//crear la conexion
let conexion = mysql.createConnection({
    host: 'localhost',
    database: 'almacen',
    user: 'root',
    password: '',
});

conexion.connect(function(err){
    if (err){
        console.log('error en ',err.message);
    } else {
        console.log("conexion exitosa")
    };
});

//crear la consulta
const listaHerramientas = 'SELECT * from herramientas';
conexion.query(listaHerramientas,function(error,lista){
    if (error){
        throw error;
    } else {
        console.log(lista);
    }
})

//terminar la conexion
conexion.end();