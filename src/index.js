/* 
En este archivo inicializo mi proyecto.
*/
//Modulos-------------------------------------------------------------------------------------------------------
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//const path = require(`path`); //Permite concatenar directorios usando __dirname
//const uniqid = require("uniqid");


//Creas la APP--------------------------------------------------------------------------------------------------
const app = express();

//Settings------------------------------------------------------------------------------------------------------
app.set("port" , 3001);


//Middlewares---------------------------------------------------------------------------------------------------
app.use(express.json());//Permite a mi servidor poder recibir formato json y entenderlo.
app.use(morgan(`dev`)); //Permite ver por consola lo que va llegando al servidor.
app.use(cors());


//Static files
//app.use(express.static(path.join(__dirname, `../public`))); //Lo que se envia al navegador

//Rutas - Se crean los archivos init.js y compras.js y se importan----------------------------------------------
app.use(require("./api/inicial"));
app.use(require("./api/compras"));


//Puerto
app.listen(app.get("port")); 
console.log(`Maraton Guayerd running on PORT: `, app.get("port"));


// ----------------------------------------------------------------------------------------------------------