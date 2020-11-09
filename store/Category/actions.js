import firebase from "firebase";

export default {
    async actGetCategories(context){
        try {
            const getCategories = firebase.firestore().collection('categories').orderBy('createAt', 'desc').get()
            const awaitCat = await getCategories
            let categories = []
            awaitCat.forEach(doc => {
                categories.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    name: doc.data().name,
                })
            })
            context.commit('getCategories', categories)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeCategory(context){
        try {
            let initState = true
            firebase.firestore().collection('categories').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let categories = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                categories.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    name: doc.data().name,
                                })
                                
                                context.commit('addCategory', categories)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeCategory', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editCategory', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    actAddCategory(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        firebase.firestore().collection('categories').doc(formatId).set({
            id: formatId,
            createAt: Date.now(),
            name: data
        })
    },
    async actRemoveCategory(context, data){

        firebase.firestore().collection('categories').doc(data.id).delete()

        const getProduct = firebase.firestore().collection('products').where("categoryId","==",data.id).get()
        const awaitProduct = await getProduct
        awaitProduct.forEach(response => {
            firebase.firestore().collection('products').doc(response.id).update({
                categoryName: "Uncategory",
                categoryId: null,
            })
        })
    },
    async actEditCategory(context, data){

        // Update category

        firebase.firestore().collection('categories').doc(data.id).update({
            name: data.catUpdate
        })

        // Update Products

        const getProduct = firebase.firestore().collection('products').where("categoryId","==",data.id).get()
        const awaitProduct = await getProduct
        awaitProduct.forEach(response => {
            firebase.firestore().collection('products').doc(response.id).update({
                categoryName: data.catUpdate
            })
        })
        
    },
}