// capturar DOM
let divCatalogo = document.getElementById("catalogoProds")
let divMensaje = document.getElementById("mensajeFiltroBusqueda")
let buscarVela = document.getElementById("buscarVela")
let buscarEsencia = document.getElementById("buscarEsencia")
let buscarTextil = document.getElementById("buscarTextil")
let buscarDeco = document.getElementById("buscarDeco")
let buscarTodo = document.getElementById("buscarTodo")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("bodyCarritoModal")
let precioTotal = document.getElementById("precioTotalCarrito")
let buscador = document.getElementById("buscador")
let ordenarMayorMenor = document.getElementById("ordenarMayorMenor")
let ordenarMenorMayor = document.getElementById("ordenarMenorMayor")
let ordenarAlfabeticamente = document.getElementById("ordenarAlfabeticamente")

// inicializacion del array de los productos en carrito
let prodsEnCarrito

if(localStorage.getItem("carrito")){
    //si ya existe algo en el storage con el key carrito
    prodsEnCarrito = JSON.parse(localStorage.getItem("carrito"))
 }else{
    //si no existe carrito en el storage
    prodsEnCarrito = []
    localStorage.setItem("carrito", prodsEnCarrito)
 }


// funciones 

// la funcion muestra el catalogo, es llamada al final del js, no responde a ningun evento inicialemnte (a diferencia del ejemploi mostrado en clase)
function mostrarCatalogo(array){
    divCatalogo.innerHTML=``
for (let prod of array){
    let nuevoProducto = document.createElement("div")
    nuevoProducto.className = "col-6 col-lg-4 itemCatalogo"
    nuevoProducto.innerHTML = `<div id="${prod.id}" class= = " ">
                                <img class="img-fluid" src="img/productos/${prod.imagen}" alt="${prod.categoria + prod.nombre}" />
                                <div class="zonaText d-flex flex-wrap my-1 ">
                                    <h5 class="nombreItem col-6">${prod.nombre} </h5>
                                    <h6 class="catItem col-6 text-end">${prod.categoria} </h6>
                                </div>
                                <div class="d-flex flex-wrap justify-content-between">
                                    <h5 class="nombreItem col-6">$${prod.precio * prod.cantidad} </h5>
                                    <div class="botonSumaResta d-inline-flex btn-light col-3 justify-content-end rounded-pill p-1">
                                        <button class="restaProd btn">
                                            <strong>-</strong>
                                        </button>
                                        <h4>  ${prod.cantidad}  </h4>
                                        <button class="sumaProd btn">
                                            <strong>+</strong>
                                        </button>
                                    </div>
                                    <button type="button" id="agrCarr${prod.id}" class="btn btn-light col-12 btnAgregarACarrito "><img class="img-fluid" src="img/icons/shopping-cart.png" alt="Carrito de compra"
                                    width="20">
                                    Agregar a Carrito</button>
                                </div>
                                
                            </div>`
    divCatalogo.appendChild(nuevoProducto) 
  // captura del dom del boton de agrtegar al carrito 
    let agregACarr = document.getElementById(`agrCarr${prod.id}`)
    agregACarr.addEventListener("click", () => {agregarAlCarrito(prod)})
}
}

// funcion que es llamada cuando se filtra por categoria desde la navbar
function mostrarCategoria(array, cat){
    let filtro = array.filter(prod => prod.categoria.toLowerCase() == cat.toLowerCase())
    if (cat == "todo"){
        divMensaje.innerHTML = ``
        mostrarCatalogo(array)
    }else{
        divMensaje.innerHTML = `<h3 class="text-center"> Filtro: ${cat.toUpperCase()}</h3>`
        mostrarCatalogo(filtro)
    }
}

// funcion para agregar productos al carrito
function agregarAlCarrito(prod){
     let prodAgregado = prodsEnCarrito.find((elem) => elem.id == prod.id )

     prodAgregado == undefined ? (prodsEnCarrito.push(prod),localStorage.setItem("carrito", JSON.stringify(prodsEnCarrito)), console.log(prodsEnCarrito))
     : console.log(`el prod ya existe en el carrito`)
}


// funcion que agrega al dom los productos seleccionados
function cargarProdsCarrito(array){
    modalBodyCarrito.innerHTML = ``

    for (let prod of array ){
        modalBodyCarrito.innerHTML += `<div class="elemento d-flex row justify-content-around my-1 border-bottom d-flex align-items-center" id ="productoCarrito${prod.id}">
                                            <img class= "itemCarrito  col-3" src="img/productos/${prod.imagen}" alt="${prod.nombre}">
                                            <div class="flex-column col-3">
                                                <h5 class="" >${prod.nombre}</h5>
                                            <h6>$${prod.precio}</h6>
                                            </div>
                                            <div class="botonSumaResta d-inline-flex btn-light col-3 rounded-pill p-1 justify-content-center">
                                        <button id="restaProd${prod.id}" class="btn">
                                            <strong>-</strong>
                                        </button>
                                        <h4>  ${prod.cantidad}</h4>
                                        <button id="sumaProd${prod.id}" class="btn">
                                            <strong>+</strong>
                                        </button>
                                    </div>
                                            <div class="col-3 d-flex justify-content-end align-items-center">
                                                <h5>
                                                    $${prod.precio * prod.cantidad }
                                                </h5>
                                                <a href="#" id="borrarProd${prod.id}" class="d-flex img-fluid m-1"><img src="img/icons/trash_can.png" alt=""></a>
                                            </div>
                                        </div>`}
    
    // para SUMAR prods en carrito 
     for (let prod of array ){
         let sumaParaCarrito = document.getElementById(`sumaProd${prod.id}`)
         sumaParaCarrito.addEventListener(`click`, () =>{
             console.log(`se agrego una unidad`)
            let cantidadDeProducto = sumarUnidad(prod)
            // para que no se puedan agregar mas de 200 elementos. 
            // esta funcion ahora que se agrega y resta productos con un boton no es tan util, porque es raro que alguien aprete un boton 200 veces, pero para
            // un futuro donde se permita tambien un input para introducir directamente el valor de productos que se quiere agregar en el carrito
            if (cantidadDeProducto > 200){
                prod.cantidad = 200
                localStorage.setItem("carrito", JSON.stringify(array))
                console.log(prod.cantidad)
            }else{
                localStorage.setItem("carrito", JSON.stringify(array))
                console.log(prod.cantidad)
            }
          cargarProdsCarrito(array)

         })
     }

     // para RESTAR prods en carrito 
    for(let prod of array){
        let restaParaCarrito = document.getElementById(`restaProd${prod.id}`)
        restaParaCarrito.addEventListener("click", () => {
            console.log(`se resto una unidad`)
            let cantidadDeProducto = restarUnidad(prod)
            if (cantidadDeProducto <= 0){
                // para que no se pueda poner elemenots en negativo, pero que si lo queire eliminar, que lo haga con el boton. (no se pueden tener elem en 0)
                prod.cantidad = 1 
                localStorage.setItem("carrito", JSON.stringify(array))
                console.log(prod.cantidad)

            }else{
                localStorage.setItem("carrito", JSON.stringify(array))
            console.log(prod.cantidad)

            }
            cargarProdsCarrito(array)
        })
    }
    calcularTotal(array)

    // para ELIMINAR prods del carrito
    for(let prod of array){
    document.getElementById(`borrarProd${prod.id}`).addEventListener("click", () => {
        console.log(`Eliminar el producto `)

        let cardProd = document.getElementById(`productoCarrito${prod.id}`)
        cardProd.remove()
        let prodAEliminar  = array.find((prod) => prod.id == prodsEnCarrito.id)
        console.log(prodAEliminar)

        let posicion = array.indexOf(prodAEliminar)
        array.splice(posicion,1)
        console.log(array)
        localStorage.setItem("carrito", JSON.stringify(array))
        calcularTotal(array)
    })
}
}

// funciones que son llamadas para sumar y restar cantidades de elementos desde el carrito
 function sumarUnidad(elem){
     elem.cantidad = elem.cantidad + 1
    return elem.cantidad
 }
 function restarUnidad(elem){
    elem.cantidad = elem.cantidad - 1
    return elem.cantidad
 }

// funcin que es llamada para calcular el precio final total del carrito
function calcularTotal(array){

    let total = array.reduce((acc, prodEnCarrito)=> acc + prodEnCarrito.precio * prodEnCarrito.cantidad, 0)
    console.log(`El total es ${total}`)
    if (total == 0){
        precioTotal.innerHTML = `Oops! El carrito esta vacio`
    }else{precioTotal.innerHTML = `El total es <strong>$${total}</strong>`}
 }

// funciuon para buscar productos por la barra de busqueda
 function buscarProds(prodBuscado, array){
    console.log(prodBuscado)
    let buscar = array.filter(
        (prod)=> prod.categoria.toLowerCase().includes(prodBuscado.toLowerCase()) || prod.nombre.toLowerCase().includes(prodBuscado.toLowerCase()))

    if (buscar.length == 0){
        divMensaje.innerHTML = `<h3 class="text-center"> No se ha encontrado "${prodBuscado}"</h3>`
        mostrarCatalogo(buscar)
    }else{
        divMensaje.innerHTML = `<h3 class="text-center"> Busqueda: ${prodBuscado}</h3>`
        mostrarCatalogo(buscar)
    }
 }

 // funciones para ordenar segun el dropdown
 function ordenarMenMay(array){
    const menorMayor = [].concat(array)
    console.log(menorMayor)
    menorMayor.sort((a,b) => a.precio - b.precio)

    mostrarCatalogo(menorMayor)
 }

 function ordenarMayMen(array){
    const mayorMenor = [].concat(array)
    console.log(mayorMenor)
    mayorMenor.sort((a,b) => b.precio - a.precio)
    mostrarCatalogo(mayorMenor)
 }

 function ordenarAlf(array){
    const arrayAlf = [].concat(array)
    console.log(arrayAlf)
    arrayAlf.sort((a,b) => {
        if(a.nombre > b.nombre){
            return 1
        }
        if (a.nombre < b.nombre){
            return -1
        }
        return 0
    })
    mostrarCatalogo(arrayAlf)
 }


//eventos
buscarVela.addEventListener("click", () => {
    mostrarCategoria(catalogo, "vela")
})
buscarEsencia.addEventListener("click", () => {
    mostrarCategoria(catalogo, "esencia")

})
buscarTextil.addEventListener("click", () => {
    mostrarCategoria(catalogo, "textil")

})
buscarDeco.addEventListener("click", () => {
    mostrarCategoria(catalogo, "decoracion")

})
buscarTodo.addEventListener("click", () => {
    mostrarCategoria(catalogo, "todo")
})

botonCarrito.addEventListener("click", () => {cargarProdsCarrito(prodsEnCarrito)})

buscador.addEventListener("input", ()=>{
    buscarProds(buscador.value, catalogo)
})

ordenarMayorMenor.addEventListener("click", () => {ordenarMayMen(catalogo)})
ordenarMenorMayor.addEventListener("click", () => {ordenarMenMay(catalogo)})
ordenarAlfabeticamente.addEventListener("click", () =>{ordenarAlf(catalogo)})

// llamada a funcion que muestra el catalogo, no respone a ningun evento, se muestra sola
mostrarCatalogo(catalogo)