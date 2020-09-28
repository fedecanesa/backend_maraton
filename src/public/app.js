//
const GET_COMPRAS = document.querySelector(".compras-realizadas");
const CREATE_COMPRA = document.querySelector(".card-body");

//Eventos
GET_COMPRAS.addEventListener("click" , getAllCompras);
CREATE_COMPRA.addEventListener("submit" , agregarCompra);


function getAllCompras()
{
    let tarjetas = "";
    let tabla_contenido = document.querySelector(".tablaContenido");


    fetch(`http://localhost:3001/compras`)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(res)
    {
        tabla_contenido.innerHTML = "";

        res.compras.forEach(function(compra)
        {
            let nuevaTarjeta = `<tr>
                                    <td scope="row">${compra.id}</td>
                                    <td>${compra.clientId}</td>
                                    <td>${compra.products}</td>
                                    <td>${compra.amount}</td>
                                    <td>${compra.paymentMethod}</td>
                                    <td>${compra.createdAt}</td>
                                </tr>`

            tarjetas += nuevaTarjeta;
    
        });

        tabla_contenido.innerHTML += tarjetas;
    });
    
}

function agregarCompra(event)
{
    event.preventDefault();

    let nro_cliente = document.querySelector("#clientId");
    let productos = document.querySelector("#products");
    let monto    = document.querySelector("#amount");
    let metodo_pago    = document.querySelector("#paymentMethod");

    let compra_a_guardar =
    {
        'clientId': nro_cliente.value,
        'products': productos.value,
        'amount': monto.value,    
        'paymentMethod': metodo_pago.value,
        "createdAt" : new Date()    
    };

    fetch('http://localhost:3001/compras',{
        method:'POST',
        body: JSON.stringify(compra_a_guardar),
        headers:{'Content-Type':'application/json'}
    }).then(function(res)
    {
        return res.json()
    })
    .then(function(mensaje)
    {
        getAllCompras();
    });
        
}

// ----------------------------------------------------------------------------------------------------------