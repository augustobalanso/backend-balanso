import knex from 'knex'

class ProductsClass{
    constructor(){}

    getAllProducts(){
        return [
            {
                productName:"Firebase DB Class"
            }
        ]
    }
}

export default ProductsClass