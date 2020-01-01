let productos = [
  [1, "Notebook Lenobo S400", 100, true],
  [2, "Celular Notorola G5", 135, false],
  [3, 'Smart TV Filips 43"', 100, true],
  [4, "Sorny PS 7", 100, true]
];

let operacion= "";
let repetirOperacion = "";
let carritoDeCompras = []; // ID, nombre del producto, precio, cantidad, subtotal (precio x cantidad), aplica descuento
let codigoDescuento = "10OFF"
let descuento = 0.1
 
/*
1) Agregar productos a nuestro carrito 
Mostrar todos los productos 
Debe pedir el ID del producto a agregar en el carrito 
Si el producto existe, preguntar cuantas unidades va a llevar del producto y agregarlo al carrito 
Si el producto ya se encontraba en el carrito, debe incrementar la cantidad de unidades que está comprando
Si el producto no existe debe mostrar un mensaje informándolo 
A continuación debe pedir si se desea realizar nuevamente el procedimiento 
Si la respuesta es afirmativa debe volver a realizar el procedimiento 
Si la respuesta es negativa debe llevar al menú de operaciones
*/

const agregarProducto = (idProducto) =>  {

  let productoExiste = false;
  let productoExisteEnCarrito= false;

  for (let i=0; i<productos.length; i++){ //recorro el arreglo de productos para ver si existe el producto
    if (idProducto == productos[i][0]){ 
      productoExiste = true;
      let unidadesAllevar = parseInt(prompt(`Cuantas unidades del producto quiere llevar?`));
      for (let j=0; j<carritoDeCompras.length; j++){ // tengo que validar si ya lo tengo agregado al carrito
        if (idProducto == carritoDeCompras[j][0]){ 
          productoExisteEnCarrito = true;
          carritoDeCompras[j][3] += unidadesAllevar ;
          carritoDeCompras [j][4] += productos[i][2]*unidadesAllevar ;
        }
      }

      if (!productoExisteEnCarrito){
      productoCarrito = [idProducto, productos[i][1], productos[i][2], unidadesAllevar, productos[i][2]*unidadesAllevar, productos[i][3] ]
      carritoDeCompras.push(productoCarrito);
      }
    }   
  }

  if (!productoExiste){
    alert(`El ID del producto ingresado no es correcto`);
  }
}


/*

2) Mostrar el detalle de la compra (mostrarDetalle)

Mostrar el detalle de la compra con:
nombre del producto, precio, cantidad y subtotal (precio x cantidad)
cantidad total de productos
total (suma de subtotales)
Luego debe llevar al menú de operaciones
*/

const mostrarDetalle = (carrito) => {
  
  let listaCarro = mostrarProductosCarrito(carrito);
  let cantidadProductos = contarTotalDeProductos(carrito);
  let totalCarro = subtotalDeCompra (carrito);

  if (carrito.length != 0){
  alert(` Detalle de su compra: 
          ${listaCarro}
          Cantidad Total de Productos: ${cantidadProductos}
          Precio Total: $ ${totalCarro} `)
  }else{
    alert(`No tiene productos agregados al carrito de compras`);
  }
}
/*
contarTotalDeProductos: 
recibe el array del carrito de compras y tiene que retornar la cantidad de productos en el carrito
*/
const contarTotalDeProductos = (carrito) => {
  let cantidadProductosCarrito = 0;
  for (let i=0; i<carrito.length; i++){
    cantidadProductosCarrito +=  Number(carrito[i][3]);
  }
  return cantidadProductosCarrito;
}

/*
subtotalDeCompra: recibe el array del carrito de compras y tiene que retornar el monto total del carrito
*/

const subtotalDeCompra = (carrito) => {
  let subtotal = 0;
  for (let i=0; i<carrito.length; i++){
    subtotal += carrito[i][4];
  }
  return subtotal;
}
/*
mostrarProductos: recibe el array del carrito de compras y muestra el listado de productos con los siguientes datos: 
nombre del producto, precio, cantidad y subtotal (precio x cantidad)
*/
const mostrarProductosCarrito = (carrito) =>{
  let listaCarrito = "";
  for (let i=0; i<carrito.length; i++){
          listaCarrito = listaCarrito  + 
           `
            PRODUCTO = ${carrito[i][1]}
            PRECIO = $ ${carrito[i][2]}
            CANTIDAD = ${carrito[i][3]}
            SUBTOTAL = $ ${carrito[i][4]}
            -----------
            `;
  }
  return listaCarrito;
}
/*
Eliminar productos (eliminarProducto)

Debe pedir ingresar el id del producto a quitar
Si el producto existe y está en el carrito debe mostrar los datos del producto
(nombre y cantidad a comprar) y preguntar si desea confirmar la operación
Si la respuesta es afirmativa debe eliminar el producto del carrito y mostrar un mensaje de éxito
Si la respuesta es negativa debe mostrar un mensaje indicando que la operación fue cancelada
A continuación debe pedir si se desea realizar nuevamente el procedimiento
Si la respuesta es afirmativa debe volver a realizar el procedimiento
Si la respuesta es negativa debe llevar al menú de operaciones
*/


const eliminarProducto = (idProducto) =>{
  let productoExiste = false;

  for (let i=0; i<productos.length; i++){ //recorro el arreglo de productos para ver si existe el producto
    if (idProducto == productos[i][0]){ 
      productoExiste = true;
      for (let j=0; j<carritoDeCompras.length; j++){ // tengo que validar si ya lo tengo agregado al carrito
        if (idProducto == carritoDeCompras[j][0]){ 
          productoExisteEnCarrito = true;
          let confirmaOperacion = prompt(` 
           Desea eliminar del carrito:
           PRODUCTO = ${carritoDeCompras[j][1]}
           CANTIDAD = ${carritoDeCompras[j][3]} unidades? (SI-NO)`)
           if (confirmaOperacion== "SI"){
              carritoDeCompras.splice(j,1);
              alert(`Se ha eliminado el producto de su carrito`)
           }else{
             alert(`La operacion ha sido cancelada`);
           }
        }
      }
    }
  }
} 
/*
Vaciar el carrito (vaciarCarrito)
Debe preguntar si desea confirmar la operación (eliminar todos los productos del carrito)
Si la respuesta es afirmativa debe eliminar todos los productos del carrito y mostrar un mensaje de éxito
Si la respuesta es negativa debe mostrar un mensaje indicando que la operación fue cancelada
A continuación debe llevar al menú de operaciones
*/
const vaciarCarrito = (carrito)=>{
  carrito.length = 0;
  alert(`Se han eliminado todos los productos del carrito exitosamente`)
}

/*
Confirmar la compra (confirmarCompra)
Mostrar el detalle de la compra con:
nombre del producto, precio, cantidad y subtotal (precio x cantidad)
cantidad total de productos
total (suma de subtotales)
Preguntar si tiene un código de descuento
si la respuesta es "SÍ", pedir que ingrese el código
mostrar si el código ingresado es correcto o incorrecto
Mostrar el detalle de la compra con:
nombre del producto, precio, cantidad y subtotal (precio x cantidad)
cantidad total de productos
total (suma de subtotales)
si tiene código y lo ingresó bien, mostrar el descuento y el total final
Preguntar si desea concretar la compra
Si la respuesta es afirmativa debe mostrar un mensaje de confirmación y despedida
Si la respuesta es negativa debe llevar al menú de operaciones
*/

const confirmarCompra = (carrito) =>{
  mostrarDetalle(carrito);
  let descuento = prompt(`Tiene un codigo de descuento? (SI-NO)`)
  if (descuento == "SI"){
    let codigoIngresado = prompt ("Ingrese el codigo de descuento")
      if (codigoIngresado == codigoDescuento) {
        alert(`El codigo ingresado es correcto`)
        mostrarProductosCarrito(carrito)
        let totalSinDescuento = subtotalDeCompra(carrito)
        let nuevoTotal = totalDescuento(carrito)
        let ahorro = totalSinDescuento - nuevoTotal
        if (ahorro != 0){
        alert (`
                El total de su compra sin descuento es: $ ${totalSinDescuento}
                El nuevo total con descuento es: $ ${nuevoTotal}
                Usted ahorro: $${ahorro}! 🎉`)
        } else{
          alert( `
                El total de su compra es: $ ${totalSinDescuento}
                El producto no calificaba para descuento 😓 `)
        }
      }else{
        alert(`El codigo ingresado no es correcto`)
      }
  }
  let concretarCompra = prompt(`Desea concretar la compra? (SI-NO)`)
  if (concretarCompra == "SI"){
    alert(`Su compra ha sido exitosa!`)
    saludoDespedida();
  }
}


/*
totalDescuento: recibe el array del carrito de compras y tiene que retornar el monto total del descuento que aplica.
Como no todos los productos aplican para descuento, solo se debe calcular sobre el subtotal de los productos que si aplican
*/

const totalDescuento = (carrito) =>{
  let totalConDescuento = 0;
  for (let i=0; i<carrito.length; i++){
  if (carrito[i][5] == true){
    totalConDescuento += carrito[i][4] * (1-descuento)
  } else{
    totalConDescuento += carrito[i][4] 
  }
  }
  return totalConDescuento
}

/*
Cancelar la compra (cancelarCompra)

Debe preguntar si desea confirmar la operación
Si la respuesta es afirmativa debe mostrar un mensaje de despedida y
salir del programa
Si la respuesta es negativa debe volver al menú de operaciones
*/

const cancelarCompra = () => {
  let confirmarOperacion = prompt (` Esta seguro de que desea cancelar la compra? (SI-NO)`)
  if (confirmarOperacion =="SI"){
    saludoDespedida();
  }
  
}

const mostrarProductos = (arrayProductos) => {
  let listaProductos = "";

  for (i=0; i<arrayProductos.length; i++){
          listaProductos = listaProductos  + 
           `
            ID = ${arrayProductos[i][0]}
            PRODUCTO = ${arrayProductos[i][1]}
            PRECIO = ${arrayProductos[i][2]}
            -----------
            `;
  }
  alert (`
            Estos son los productos disponibles:
            ${listaProductos}`);
}

const saludoDespedida = () => {
  alert( `Gracias por visitarnos! Esperamos verlo pronto 💖`);
  return operacion="7";
}

//MENU PRINCIPAL

while (operacion != "7"){
  
  operacion = prompt(
 ` Indique el número de la operacion que desea realizar:
  1. Agregar producto al carrito 💸
  2. Mostrar detalle de compra 🛒
  3. Eliminar producto del carrito 🚫
  4. Vaciar el carrito 🗑
  5. Confirmar la compra ✅
  6. Cancelar la compra ❌
  7. SALIR 👋🏼`);

  switch (operacion){
    case "1": //agregar producto al carrito
      repetirOperacion = "SI";
      while(repetirOperacion == "SI"){ 
      mostrarProductos(productos);
      let idAagregar = prompt (`Indique el ID del producto que desea agregar al carrito de compras`) ;
      agregarProducto(idAagregar);
      repetirOperacion =prompt(`Desea agregar otro producto al carrito?`);
      }
    break;
    case "2": //mostrar carrito
      mostrarDetalle(carritoDeCompras);
    break;
    case "3": //eliminar producto del carrito
      if (carritoDeCompras.length == 0){
      alert(`No tiene productos agregados al carrito de compras`)
      }else{
      repetirOperacion = "SI";

      while(repetirOperacion == "SI"){ 
        let idAeliminar = prompt (`Indique el ID del producto que desea eliminar del carrito de compras`) ;
        eliminarProducto(idAeliminar);
        repetirOperacion = prompt(`Desea eliminar otro producto del carrito?`);
      }
      }
    break;
    case "4": //vaciar el carrito
      if (carritoDeCompras.length == 0){
        alert(`No tiene productos agregados al carrito de compras`)
      }else{
        let confirmaOperacion = prompt(`Desea vaciar el carrito? (SI-NO)`);
        if (confirmaOperacion == "SI"){
        vaciarCarrito(carritoDeCompras)
        } else{
        alert(`La operacion ha sido cancelada`)
      }
      } 
    break;
    case "5": //confirmar la compra
      if (carritoDeCompras.length != 0){
      confirmarCompra(carritoDeCompras)
      }else{
        alert('No tiene productos agregados al carrito de compras')
      }
    break;
    case "6": //cancelar la compra
      cancelarCompra();
    break;
    case "7": //salir
      saludoDespedida();
    break;
  
  }
}

