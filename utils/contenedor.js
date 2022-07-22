const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(array) {
    try {
      const productsFetch = JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8")
      );
      let id = 1;

      if (productsFetch.length === 0) {
        array.forEach((element) => {
          element.id = id;
          id++;
        });
      } else {
        array.forEach((element) => {
          let newID = productsFetch[productsFetch.length-1].id + id;
          element.id = newID;
          id++;
        });
      }

      array.forEach((el) => {
        productsFetch.push(el);
      });

      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(productsFetch)
      );

      return array;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async getById(idFilter) {
    const searchableArray = JSON.parse(
      await fs.promises.readFile(this.fileName)
    );

    // CHECKS IF ID EXISTS, ERROR IF NOT
    if (searchableArray.some((element) => element.id === idFilter)) {
      const filteredObject = searchableArray.filter(
        (element) => element.id == idFilter
      );
      return filteredObject;
    } else {
      return { error: 'producto no encontrado' }
    }
  }

  async UpdateById(idFilter, newObject) {
    const searchableArray = JSON.parse(
      await fs.promises.readFile(this.fileName)
    );

    // CHECKS IF ID EXISTS, ERROR IF NOT
    if (searchableArray.some((element) => element.id === idFilter)) {
      const foundIndex = searchableArray.findIndex((element) => element.id == idFilter)

      newObject.id = idFilter      
      searchableArray[foundIndex] = newObject
      
      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(searchableArray)
      );

      return searchableArray[foundIndex];
    } else {
      return { error: 'producto no encontrado' }
    }

  }

  async getAll() {
    const readArray = JSON.parse(await fs.promises.readFile(this.fileName));
    return readArray;
  }

  async deleteById(idDelete) {
    const searchableArray = JSON.parse(
      await fs.promises.readFile(this.fileName)
    );
    if (searchableArray.some((element) => element.id === idDelete)) {
      const deletedObject = searchableArray.filter(
        (element) => element.id == idDelete
      );
      const filteredObject = searchableArray.filter(
        (element) => element.id != idDelete
      );
      console.log("Borrando ID...");
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(filteredObject)
      );
      return deletedObject
    } else {
      return { error : 'id no encontrado'};
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.fileName, JSON.stringify([]));
    console.log("Base de datos eliminada");
  }

}

module.exports = Contenedor;