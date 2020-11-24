import firebase from "firebase";

export default {
    async actGetProducts(context){
        try {

            const getProducts = firebase.firestore().collection('products').orderBy('createAt', 'desc').get()
            const awaitProduct = await getProducts
            let products = []
            awaitProduct.forEach(doc => {
                products.push({
                    id: doc.id,
                    categoryId: doc.data().categoryId,
                    createAt: doc.data().createAt,
                    image: doc.data().image,
                    categoryName: doc.data().categoryName,
                    name: doc.data().name,
                    regularPrice: doc.data().regularPrice,
                    salePrice: doc.data().salePrice,
                    quantity: doc.data().quantity,
                    description: doc.data().description,
                })
                
            })
            context.commit('getProducts', products)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeProduct(context){
        try {
            let initState = true
            firebase.firestore().collection('products').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let products = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                products.push({
                                    id: doc.id,
                                    categoryId: doc.data().categoryId,
                                    createAt: doc.data().createAt,
                                    image: doc.data().image,
                                    categoryName: doc.data().categoryName,
                                    name: doc.data().name,
                                    regularPrice: doc.data().regularPrice,
                                    salePrice: doc.data().salePrice,
                                    quantity: doc.data().quantity,
                                    description: doc.data().description,
                                })
                                
                                context.commit('addProduct', products)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeProduct', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editProduct', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    async actAddProduct(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        // Upload image to storage

        let storageRef = firebase.storage().ref('products/' + data.image.name)

        let uploadImage = await storageRef.put(data.image);
        
        let urlImage = await uploadImage.ref.getDownloadURL()

        let cate = {
            name: 'Uncategory',
            id: null,
        }
        if(data.category != null){
            cate.name = data.category.name
            cate.id = data.category.id
        }

        firebase.firestore().collection('products').doc(formatId).set({
            id: formatId,
            image: urlImage,
            createAt: Date.now(),
            name: data.name,
            regularPrice: +data.regularPrice,
            salePrice: +data.salePrice,
            quantity: +data.quantity,
            description: data.description,
            categoryName: cate.name,
            categoryId: cate.id,
        })
        
    },
    async actRemoveProduct(context, data){

        firebase.firestore().collection('products').doc(data.id).delete()

        const getComment = firebase.firestore().collection('comments').where("postId","==",data.id).get()
        const awaitComment = await getComment
        awaitComment.forEach(response => {
            firebase.firestore().collection('comments').doc(response.id).delete()
        })

    },
    async actEditProduct(context, data){
        let cate = {
            name: 'Uncategory',
            id: null,
        }
        if(data.category != null){
            cate.name = data.category.name
            cate.id = data.category.id
        }

        let urlImage = data.imageOld

        if(data.image != null){

            let storageRef = firebase.storage().ref('products/' + data.image.name)

            let uploadImage = await storageRef.put(data.image);
            
            urlImage = await uploadImage.ref.getDownloadURL()
        }

        firebase.firestore().collection('products').doc(data.id).update({
            name: data.name,
            image: urlImage,
            regularPrice: +data.regularPrice,
            salePrice: +data.salePrice,
            quantity: +data.quantity,
            description: data.description,
            categoryName: cate.name,
            categoryId: cate.id,
        })

        // Update comments in product

        const getComment = firebase.firestore().collection('comments').where("postId","==",data.id).get()
        const awaitComment = await getComment
        awaitComment.forEach(response => {
            firebase.firestore().collection('comments').doc(response.id).update({
                postImage: urlImage,
                postName: data.name
            })
        })
        
    },
}