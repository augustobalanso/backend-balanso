import { faker } from "@faker-js/faker/locale/es"
 
class ProductsRandom {
    constructor(){
    }

    async get5random(){
        return [
            {
                name: faker.commerce.product(),
                price: faker.commerce.price(0,10000,0,'$'),
                photo: faker.image.business(50,50, true)
            },
            {
                name: faker.commerce.product(),
                price: faker.commerce.price(0,10000,0,'$'),
                photo: faker.image.business(50,50, true)
            },
            {
                name: faker.commerce.product(),
                price: faker.commerce.price(0,10000,0,'$'),
                photo: faker.image.business(50,50, true)
            },
            {
                name: faker.commerce.product(),
                price: faker.commerce.price(0,10000,0,'$'),
                photo: faker.image.business(50,50, true)
            },
            {
                name: faker.commerce.product(),
                price: faker.commerce.price(0,10000,0,'$'),
                photo: faker.image.business(50,50, true)
            }
        ]
    }
}

const productsRandom = new ProductsRandom()

export default productsRandom