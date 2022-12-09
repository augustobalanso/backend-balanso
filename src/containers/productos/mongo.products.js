import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

class ProductsClass{
    constructor(collection, schema) {
        this.model = mongoose.model(collection, schema)
    }

    async getAll(){
        const items = await this.model.find()
        return items
    }

    async addItem(item){
        item._id = uuidv4()
        this.model.create(item)
        return item
    }

    async getById(id){
        
        const boolDocRef = await this.model.exists({_id : id})

        if(!_.isNil(boolDocRef)){
            return this.model.findOne({_id : id})
        }
        return 'item not found'
    }

    async updateItem(id,item){

        const boolDocRef = await this.model.exists({_id : id})

        if(!_.isNil(boolDocRef)){
            return this.model.updateOne({_id: id}, item)
        }

        return 'item not found'
    }

    async deleteItem(id){
        const boolDocRef = await this.model.exists({_id : id})

        if(!_.isNil(boolDocRef)){
            return this.model.remove({_id : id})
        }
        
        return 'item not found'
    }
}

export default ProductsClass