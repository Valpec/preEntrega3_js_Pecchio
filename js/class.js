class Producto {
    constructor(id, categoria, nombre, precio, imagen) {
        this.id = id,
            this.categoria = categoria,
            this.nombre = nombre,
            this.precio = precio,
            this.imagen = imagen, 
            this.cantidad = 1
    }
    mostrarProducto() {
        console.log(`${this.id} | ${this.categoria} | ${this.nombre} | $${this.precio}`)
    }

   
}
// objetos del catalogo
const prod1 = new Producto(1, "Vela", "Vela Copon", 3500, "vela_copon.jpg"   )
const prod2 = new Producto(2, "Vela", "Vela Alba", 3700, "vela_alba.jpg")
const prod3 = new Producto(3, "Vela", "Vela Bir", 3000, "vela_bir.jpg")
const prod4 = new Producto(4, "Vela", "Vela Esfera", 3000, "vela_esfera.jpg")
const prod5 = new Producto(5, "Vela", "Vela Hexa", 3000, "vela_hexa.jpg")
const prod6 = new Producto(6, "Vela", "Vela Ren", 3000, "vela_ren.jpg")

const prod7 = new Producto(7, "Esencia", "Aromatizador Rita", 2000, "esencia.jpg" )
const prod8 = new Producto(8, "Esencia", "Aromatizador Diana", 2000, "esencia_carrousel.jpeg")
const prod9 = new Producto(9, "Esencia", "Esencia Solida", 2000, "esencia_solida.jpg")

const prod10 = new Producto(10, "Textil", "Almohadón a rayas", 1500, "almohadones_ray.jpg")
const prod11 = new Producto(11, "Textil", "Camino de mesa", 1500, "camino_mesa.jpeg")
const prod12 = new Producto(12, "Textil", "Repasador de panal", 1500, "repasadores.jpg")

const prod13 = new Producto(13, "Decoracion", "Colgante Corazon", 1000, "colg_cora.jpg")
const prod14 = new Producto(14, "Decoracion", "Colgante Flor", 1000, "colg_flor.jpg")
const prod15 = new Producto(15, "Decoracion", "Ramo de flores de tela", 1000, "flores_tela.jpg")

// array de objetos producto
let catalogo = []

if(localStorage.getItem("catalogo")){
    console.log("ya existe la key catalogo")
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}else{
    console.log(`entra por primera vez, seteo array`)
    catalogo.push(prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15)
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}
// catalogo.push(prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15)
