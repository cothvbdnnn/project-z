import firebase from "firebase";

export default {
    async actGetReviews(context){
        try {
            const getReviews = firebase.firestore().collection('reviews').orderBy('createAt', 'desc').get()
            const awaitReview = await getReviews
            let reviews = []
            awaitReview.forEach(doc => {
                reviews.push({
                    id: doc.id,
                    createAt: doc.data().createAt,
                    content: doc.data().content,
                    userId: doc.data().userId,
                    userName: doc.data().userName,
                    userImage: doc.data().userImage,
                    postId: doc.data().postId,
                    postName: doc.data().postName,
                    postImage: doc.data().postImage,
                    rating: doc.data().rating,
                    read: doc.data().read,
                })
            })
            context.commit('getReviews', reviews)
        } catch (error) {
            console.log(error)
        }
    },
    async actRealTimeReview(context){
        try {
            let initState = true
            firebase.firestore().collection('reviews').orderBy('createAt', 'asc').onSnapshot(snap => {
                if (initState) {
                    initState = false;
                } else {
                    if (!snap.docChanges().empty) {
                        snap.docChanges().forEach( change => {
                            let reviews = []
                            let doc = change.doc;
                            
                            if(change.type == 'added'){
                                reviews.push({
                                    id: doc.id,
                                    createAt: doc.data().createAt,
                                    content: doc.data().content,
                                    userId: doc.data().userId,
                                    userName: doc.data().userName,
                                    userImage: doc.data().userImage,
                                    postId: doc.data().postId,
                                    postName: doc.data().postName,
                                    postImage: doc.data().postImage,
                                    rating: doc.data().rating,
                                    read: doc.data().read,
                                })
                                
                                context.commit('addReview', reviews)
                                
                            }
                            if (change.type === "removed") {
                                context.commit('removeReview', doc.data())
                            }
                            if (change.type === "modified") {
                                context.commit('editReview', doc.data())
                            }
                        })   
                    }
                }
			})
        } catch (error) {
            console.log(error)
        }
    },
    actAddReview(context, data){
        let formatId = Math.random().toString(36).substr(2, 9)

        firebase.firestore().collection('reviews').doc(formatId).set({
            id: formatId,
            createAt: Date.now(),
            content: data.content,
            userId: data.userId,
            userName: data.userName,
            userImage: data.userImage,
            postId: data.postId,
            postName: data.postName,
            postImage: data.postImage,
            rating: data.rating,
            read: false,
        })
    },
    async actRemoveReview(context, data){

        firebase.firestore().collection('reviews').doc(data.id).delete()

    },
    actReadReview(context, data){

        firebase.firestore().collection('reviews').doc(data.id).update({
            read: true
        })
    },
    actReadAllReviews(context, data){

        for(let i in data){
            firebase.firestore().collection('reviews').doc(data[i]).update({
                read: true
            })
        }
        
    },
}