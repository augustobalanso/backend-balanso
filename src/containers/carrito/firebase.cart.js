import { collection, getDocs, addDoc } from "firebase/firestore"
import firebaseDb from "../../config/firebase.config.js"

class CartClass{
    constructor(collection){
        this.db = firebaseDb
        this.collection = collection
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
}

export default CartClass