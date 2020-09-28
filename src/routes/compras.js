/*                             ACLARACIONES:

- Router: Este método  me permite definir nuevas rutas para mi servidor.
- Undercore: Brinda ciertas funciones para procesar datos: recorrer un arreglo, etc.
- COLECCION POSTMAN: https://www.getpostman.com/collections/1fcba44e489330377b47

- _.each (forEach) - (list, iteratee, [context]). Itera sobre una lista de elementos, dando cada uno a su vez a una función iteratee . El iteratee está vinculado al objeto de contexto , si se pasa uno. Cada invocación de iteratee se llama con tres argumentos: (elemento, índice, lista) . Si la lista es un objeto de JavaScript, los argumentos de iteratee serán (valor, clave, lista).

- Método post: Guardo en  las constantes creadas {} los datos que me envian. Si obtengo los datos, corroboro el arreglo, le sumo uno y creo la nueva compra, le paso todos los objetos que tiene el req.body dentro de un nuevo objeto y guardo en el arreglo de compras, una nueva con el numero de id siguiente. En caso contrario, muestro un mensaje de error.

- Método delete: Guardo en la constante el objeto id todos los parámetros que contenga. Recorro el arreglo compras. Si el id de la compra que recibo es igual al id que tengo en la ruta, eliminalo.
*/

// Importo los modulos------------------------------------------------------------------------------------------
const { Router } = require(`express`); 

// Creo la APP--------------------------------------------------------------------------------------------------
const router = Router();

// Base de datos
let compras = 
[
    {
        "id": "1",
        "clientId": "1000",
        "products": ["100", "300" , "400" , "500" , "600" , "700" , "800"],
        "amount": 10000,
        "paymentMethod": "Credit Card",
        "createdAt":  new Date()
    },
    {
        "id": "2",
        "clientId": "2000",
        "products": ["100" , "400" , "500" , "700"],
        "amount": 6000,
        "paymentMethod": "Bitcoin",
        "createdAt":  new Date()
        
    }
]

// Rutas (métodos)----------------------------------------------------------------------------------------------
// GET ALL COMPRAS--------------------------------------------------------
router.get("/compras", function (req, res) 
{
  res.status(200).json({compras});
  console.log(compras);
});

// GET BY ID--------------------------------------------------------------
router.get("/compras/:id", function (req, res)
{
    const { id } = req.params;

    let compraEncontrada = undefined;

    compras.forEach(function(compra) 
    {
        if (compra.id == id)
        {
            compraEncontrada = compra;
            
            return res.status(200).json({compra:compraEncontrada});
        }
    });


    return res.status(404).send({"message":"Compra Not Found - 404"});

});

// POST-------------------------------------------------------------------
router.post("/compras/", function (req, res)
{
    const { clientId, products, amount, paymentMethod } = req.body; 
    
    if (clientId && products && amount && paymentMethod ) 
    {   
        const createdAt = new Date();

        const id = compras.length + 1; 
        
        const NUEVA_COMPRA = {...req.body , createdAt , id};
        
        compras.push(NUEVA_COMPRA);
        
        res.status(200).json(compras);
    }   
    else
    {
        res.status(404).json({error: "La compra no ha sido encontrada"});
    }

});

// PUT-------------------------------------------------------------------
router.put("/compras/:id", function (req, res) 
{
    const { id } = req.params;

    const { clientId, products, amount, paymentMethod } = req.body;

    if (clientId && products && amount && paymentMethod )
    {
        compras.forEach(function(compra) 
        {
            if (compra.id == id)
            {
                compra.clientId = clientId;
                compra.products = products;
                compra.amount = amount;
                compra.paymentMethod = paymentMethod;
            }
        });

        res.status(200).send(compras);
    }
    else
    {
        res.status(404).json({error: "La compra no ha sido encontrada"});
    }

});

//DELETE------------------------------------------------------------------
router.delete("/compras/:id", function (req, res)
{
    const { id } = req.params; 

    compras.forEach(function(compra , i)  
    {
        if (compra.id == id)
        {
            compras.splice(i , 1); 
        }
    });
    res.status(200).send({message:"La compra ha sido eliminada"});

})

// Se exporta el archivo----------------------------------------------------------------------------------------
module.exports = router; 

// ----------------------------------------------------------------------------------------------------------