class Usuario {
    constructor (nombre,apellido,libros,mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascota(newMascota) {
        this.mascotas.push(newMascota)
        return console.log(this.mascotas)
    }

    countMascota(){
        return console.log(this.mascotas.length)
    }

    addBook(nombre,autor) {
        this.libros.push({ nombre: nombre, autor: autor})
        console.log(this.libros)
    }

    getBookNames() {
        let bookNames = this.libros.map(libro => libro.nombre)
        return console.log(bookNames)
    } 
}

const userJuan = new Usuario('Juan', 'Valdez',[{nombre: 'Violeta', autor : 'Isabel Allende'}],['loro','pez'])

console.log(userJuan)

userJuan.getFullName()
userJuan.addMascota('perro')
userJuan.countMascota()
userJuan.addBook('El coronel no tiene quien le escriba','García Marquez')
userJuan.getBookNames()
