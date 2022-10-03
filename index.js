class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota)
        return `Agregasta a ${nombreMascota} como mascota`
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor})
        return `Agregaste satisfactoriamente el libro ${nombre} del autor ${autor}`
    }

    getBookNames() {
        const bookNames = this.libros.map((el) => {
            return el.nombre
        })
        return bookNames
    }
}

const newUsuario = new Usuario("Augusto","Balanso",[{nombre: "nidea", autor: "autor1"},{nombre: "nidea2", autor: "autor2"}],["Berta"])

console.log(newUsuario.getFullName())
console.log(newUsuario.addMascota("Olivia"))
console.log(newUsuario.countMascotas())
console.log(newUsuario.addBook("nidea3","autor3"))
console.log(newUsuario.getBookNames())