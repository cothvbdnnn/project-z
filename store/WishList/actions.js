import firebase from "firebase";

export default {
    async actGetWishLists(context){
        try {
            const getWishLists = firebase.firestore().collection('wishlists').orderBy('createAt', 'desc').get()
            const awaitWishList = await getWishLists
            let wishlists = []
            awaitWishList.forEach(doc => {
                wishlists.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    userId: doc.data().userId,
                    userName: doc.data().userName,
                    userImage: doc.data().userImage,
                    postId: doc.data().postId,
                    postName: doc.data().postName,
                    postImage: doc.data().postImage,
                    regularPrice: doc.data().regularPrice,
                    salePrice: doc.data().salePrice,
                })
            })
            context.commit('getWishLists', wishlists)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeWishList(context){
        try {
            let initState = true
            firebase.firestore().collection('wishlists').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let wishlists = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                wishlists.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    userId: doc.data().userId,
                                    userName: doc.data().userName,
                                    userImage: doc.data().userImage,
                                    postId: doc.data().postId,
                                    postName: doc.data().postName,
                                    postImage: doc.data().postImage,
                                    regularPrice: doc.data().regularPrice,
                                    salePrice: doc.data().salePrice
                                })
                                
                                context.commit('addWishList', wishlists)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeWishList', doc.data())
                            }
                            if (change.type === "modified") {
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    actToggleWishList(context, data){
        
        let check = context.state.wishlists.findIndex(x => x.postId == data.postId && x.userId == data.userId)
        
        if(check == -1){
            let formatId = Math.random().toString(36).substr(2, 9)

            firebase.firestore().collection('wishlists').doc(formatId).set({
                id: formatId,
                createAt: Date.now(),
                userId: data.userId,
                userName: data.userName,
                userImage: data.userImage,
                postId: data.postId,
                postName: data.postName,
                postImage: data.postImage,
                regularPrice: data.regularPrice,
                salePrice: data.salePrice
            })
        }else{
            firebase.firestore().collection('wishlists').doc(context.state.wishlists[check].id).delete()
        }
        
    },
    actRemoveWishList(context, data){  
        firebase.firestore().collection('wishlists').doc(data).delete()
    }
}