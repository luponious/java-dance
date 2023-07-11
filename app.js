//Simulador de stock + compra + taxa de import (opcional descuento con valores acima de 10k) Basado originalmente en el modelo hecho en clase.
let resultado = 0;
let ticket = "Detalle de la compra:\n";
let rta = "";

// Control de unidades en stock
let inventario = {
    choclo: 15,
    cebolla: 3,
    bolsa_de_papas: 10,
    caja_de_tomates: 5,
    caja_de_nabos: 8,
};

// Impuesto de importación por producto
function impuesto(precio) {
    return precio * 0.19;
}

// Función para mostrar el stock actual
function mostrarInventario() {
    let stockDisponible = "Stock disponible:\n";
    for (let producto in inventario) {
        stockDisponible += producto + ": " + inventario[producto] + "\n";
    }
    alert(stockDisponible);
}

// Solicitar al usuario ver el stock
let verInventario = prompt("¿Desea ver el stock disponible? (Sí o No)").toLowerCase();
if (verInventario === "sí" || verInventario === "si") {
    mostrarInventario();
}

// Validar el nombre del producto
function validarNombreProducto(nombreProducto) {
    return inventario.hasOwnProperty(nombreProducto);
}

// Validar el precio
function validarPrecio(precio) {
    return !isNaN(precio) && precio > 0;
}

// Validar la cantidad
function validarCantidad(cantidad, nombreProducto) {
    return !isNaN(cantidad) && cantidad > 0 && cantidad <= inventario[nombreProducto];
}

// Solicitador de detalles del producto y validaciones
function solicitarDetallesProducto() {
    let nombreProducto;
    do {
        nombreProducto = prompt(
            "Ingrese el nombre del producto:"
        ).toLowerCase().replace(/\s/g, "_");// para ignorar el underscore 

        if (!validarNombreProducto(nombreProducto)) {
            alert("Por favor, ingrese un nombre de producto válido.");
        }
    } while (!validarNombreProducto(nombreProducto));

    let precio;
    do {
        precio = Number(prompt("Ingrese el precio del producto"));

        if (!validarPrecio(precio)) {
            alert("Por favor, ingrese un precio válido.");
        }
    } while (!validarPrecio(precio));

    let cantidad;
    do {
        cantidad = Number(prompt("Ingrese la cantidad que desea comprar"));

        if (!validarCantidad(cantidad, nombreProducto)) {
            alert("Por favor, ingrese una cantidad válida dentro del inventario disponible.");
        }
    } while (!validarCantidad(cantidad, nombreProducto));

    return {
        nombreProducto,
        precio,
        cantidad,
    };
}

// Funcion para calcular os detalhes del producto e atualizar el ticket y el inventario
function procesarDetallesProducto(detallesProducto) {
    const { nombreProducto, precio, cantidad } = detallesProducto;

    const subtotal = precio * cantidad;
    const impuestoImportacion = impuesto(subtotal);
    const total = subtotal + impuestoImportacion;

    resultado += total;
    ticket += `\n${nombreProducto}\t$${total.toFixed(2)} ARS`;  //toFixed para arredondar decimais !retorna string!
    inventario[nombreProducto] -= cantidad;
}

// Loop principal para solicitar los detalles del producto hasta que el usuario elija salir
do {
    const detallesProducto = solicitarDetallesProducto();
    procesarDetallesProducto(detallesProducto);

    rta = prompt("¿Desea salir? (Escriba 'salir' para salir).").toLowerCase();
} while (rta !== "salir");

// Mostrar los resultados finales
if (resultado >= 10000) {
    // Descuento del 10%
    let resultadoConDescuento = resultado * 0.9;

    alert(
        ticket +
        "\n\nTotal: $" +
        resultado.toFixed(2) +
        " ARS" +
        "\nTotal con descuento: $" +
        resultadoConDescuento.toFixed(2) +
        " ARS"
    );
} else {
    alert(ticket + "\n\nTotal: $" + resultado.toFixed(2) + " ARS");
}