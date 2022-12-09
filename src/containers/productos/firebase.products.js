import { collection, getDocs, getDoc, setDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import firebaseDb from "../../config/firebase.config.js"

class ProductsClass{
    constructor(collection) {
        this.db = firebaseDb;
        this.collection = collection;
    }

    async getAll(){
        const querySnapshot = await getDocs(collection(this.db, this.collection))
        const parsedData = []
        querySnapshot.forEach((doc) => {
            parsedData.push({
                id: doc.id,
                ...doc.data()
            })
        })

        return parsedData
    }

    async addItem(item){
        item.id = uuidv4()
        const docRef = doc(this.db, this.collection, item.id)
        try {
            await setDoc(docRef, item)
        } catch(err) {
            return err
        }
        return item
    }

    async getById(id){
        try {
            const docRef = doc(this.db,this.collection, id)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()){
                return {
                    success: false,
                    msg: 'doc not found'
                }
            }
            return docSnap.data()
        } catch(err) {
            return err
        }
    }

    async updateItem(id,item){
        try{
            const docRef = doc(this.db,this.collection, id)
            const docSnap = await getDoc(docRef)
            const boolRef = docSnap.exists()
    
            if(!boolRef){
                return{
                    error : "doc not found"
                }
            }
    
            await updateDoc(docRef, item)
            return {
                oldProduct: docSnap.data(),
                newProduct: await (await getDoc(docRef)).data(),
                msg:'item updated!'
            }
        } catch(err) {
            return err
        }
    }

    async deleteItem(id){
        try {

            const docRef = doc(this.db,this.collection, id)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()){
                return {
                    success: false,
                    msg: 'doc not found'
                }
            }
            
            await deleteDoc(docRef)
            return {
                success:true,
                msg: "item deleted!"
            }

        } catch(err) {
            return err
        }
    }
}

export default ProductsClass